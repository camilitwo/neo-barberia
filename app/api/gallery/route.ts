import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Mantengo la configuración (debe estar en .env.local)
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (CLOUD_NAME && API_KEY && API_SECRET) {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
  });
} else {
  console.warn('Cloudinary no configurado: revisar .env.local (CLOUDINARY_*)');
}

const DEFAULT_FOLDER = process.env.CLOUDINARY_FOLDER || 'inicio/neobarberia';
const DEFAULT_MAX = 50;

// Helper: normaliza un valor de folder que puede ser una URL o una ruta completa
function normalizeFolderValue(input: string | null | undefined): string {
  if (!input) return '';
  let s = String(input).trim();

  // Si el primer segmento es el cloud name, lo quitamos
  try {
    const firstSeg = s.split('/')[0];
    if (firstSeg === CLOUD_NAME) {
      // eliminar el primer segmento
      s = s.split('/').slice(1).join('/');
    }
  } catch (e) {}

  // Si es una URL completa de Cloudinary (con res.cloudinary.com), cortamos hasta /image/upload/
  try {
    if (s.startsWith('http')) {
      const u = new URL(s);
      const parts = u.pathname.split('/').filter(Boolean);
      const imgIdx = parts.findIndex(p => p === 'image');
      if (imgIdx >= 0) {
        const afterUpload = parts.slice(imgIdx + 2);
        s = afterUpload.join('/');
      } else {
        s = parts.join('/');
      }
    }
  } catch (e) {
    // no es una URL, seguir
  }

  // Si contiene '/image/upload/', eliminar todo hasta y incluyendo esa parte
  const idx = s.indexOf('/image/upload/');
  if (idx >= 0) {
    s = s.substring(idx + '/image/upload/'.length);
  }

  // Quitar segmentos de versión en cualquier parte: v123456
  s = s.split('/').filter(seg => !/^v\d+$/.test(seg)).join('/');

  // Si s apunta a un fichero (termina en extension), tomar dirname
  if (/[.](jpg|jpeg|png|webp|gif|svg)$/i.test(s)) {
    const segs = s.split('/');
    segs.pop();
    s = segs.join('/');
  }

  // Quitar slashes al inicio/fin
  s = s.replace(/^\/+|\/+$/g, '');

  return s;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;
    const debug = params.get('debug') === '1' || params.get('debug') === 'true';
    const folderParamRaw = params.get('folder') || DEFAULT_FOLDER;
    // option to enforce strict folder filtering on returned resources
    const strictParam = params.get('strict');
    // si se pasó explicitamente folder en query, por defecto aplicamos filtrado estricto
    const strictFolder = strictParam === '1' || strictParam === 'true' || (strictParam === null && params.has('folder'));
    const maxParam = Math.min(parseInt(params.get('limit') || String(DEFAULT_MAX), 10) || DEFAULT_MAX, 100);

    // normalizo el folder: sin slashes al inicio/fin y eliminando URL/versión
    const folderParam = normalizeFolderValue(folderParamRaw);

    const meta: any = { strategies: [] };

    // If user passed folder but normalization produced empty, mark invalid
    if (params.has('folder') && !folderParam) {
      meta.invalidFolder = true;
      // If strict was explicitly passed true, keep strict; otherwise, treat as strict by default
      if (strictParam === null) {
        // user provided folder but it normalized to empty -> keep strict true (don't fallback to all)
        // This avoids accidentally returning everything when user intended a folder
        // strictFolder was already set based on presence of folder; so nothing else to change
      }
      console.warn('Cloudinary: carpeta proporcionada se normalizó a vacío; revisa el valor de folder');
    }

    // Si no hay credenciales, devolver demo fallback
    if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
      meta.missingEnv = true;
      console.warn('Cloudinary env variables missing — returning demo images');
      const demo = [
        { id: 'demo-1', src: 'https://res.cloudinary.com/demo/image/upload/w_1200,h_800,c_fill,q_auto,f_auto/sample.jpg', width: 1200, height: 800, alt: 'Demo 1' },
        { id: 'demo-2', src: 'https://res.cloudinary.com/demo/image/upload/w_1200,h_800,c_fill,q_auto,f_auto/balloons.jpg', width: 1200, height: 800, alt: 'Demo 2' },
      ];

      return NextResponse.json(debug ? { photos: demo, meta } : demo, { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } });
    }

    let resources: any[] = [];

    // 1) Intento Search API con folder si se especificó
    if (folderParam) {
      try {
        const folderExpr = `folder='${folderParam.replace(/'/g, "\\'")}'`;
        const expression = ['resource_type:image', folderExpr].join(' AND ');
        meta.strategies.push({ strategy: 'search', expression });
        console.log('Cloudinary: search expression ->', expression);
        const searchResult: any = await cloudinary.search
          .expression(expression)
          .sort_by('created_at', 'desc')
          .max_results(maxParam)
          .execute();

        resources = searchResult.resources || [];
        meta.searchCount = resources.length;
        console.log('Cloudinary: search results count', resources.length);
      } catch (searchErr) {
        meta.searchError = String(searchErr);
        console.warn('Cloudinary search failed:', String(searchErr));
      }
    }

    // 2) Si no hay resultados, intento api.resources con prefix (folder)
    if (!resources.length && folderParam) {
      try {
        meta.strategies.push({ strategy: 'api.resources.prefix', prefix: folderParam });
        console.log('Cloudinary: trying api.resources with prefix ->', folderParam);
        // usar prefix sin slash final; cloudinary compara inicio del public_id
        const listResult: any = await cloudinary.api.resources({
          resource_type: 'image',
          type: 'upload',
          prefix: folderParam,
          max_results: maxParam,
        });
        resources = listResult.resources || [];
        meta.prefixCount = resources.length;
        console.log('Cloudinary: api.resources (prefix) count', resources.length);

        // Si no hay resultados con el prefix tal cual, intentar con una variante que incluya la barra final
        if (!resources.length) {
          const prefixSlash = folderParam.endsWith('/') ? folderParam : `${folderParam}/`;
          meta.triedPrefixes = [folderParam, prefixSlash];
          try {
            console.log('Cloudinary: trying api.resources with prefix (slash) ->', prefixSlash);
            const listResult2: any = await cloudinary.api.resources({
              resource_type: 'image',
              type: 'upload',
              prefix: prefixSlash,
              max_results: maxParam,
            });
            resources = listResult2.resources || [];
            meta.prefixCountAfterSlash = resources.length;
            console.log('Cloudinary: api.resources (prefix with slash) count', resources.length);
          } catch (listErr2) {
            meta.prefixSlashError = String(listErr2);
            console.warn('Cloudinary api.resources with prefix (slash) failed:', String(listErr2));
          }
        }
      } catch (listErr) {
        meta.prefixError = String(listErr);
        console.warn('Cloudinary api.resources with prefix failed:', String(listErr));
      }
    }

    // 3) Si sigue vacío, intento listar sin prefix (últimas imágenes de la cuenta)
    // Solo hacemos listado global si NO estamos en modo strictFolder
    if (!resources.length && !strictFolder) {
      try {
        meta.strategies.push({ strategy: 'api.resources.all' });
        console.log('Cloudinary: trying api.resources without prefix to list recent uploads');
        const listResult: any = await cloudinary.api.resources({
          resource_type: 'image',
          type: 'upload',
          max_results: maxParam,
        });
        resources = listResult.resources || [];
        meta.allCount = resources.length;
        console.log('Cloudinary: api.resources (no prefix) count', resources.length);
      } catch (listAllErr) {
        meta.allError = String(listAllErr);
        console.warn('Cloudinary api.resources (no prefix) failed:', String(listAllErr));
      }
    }

    // Si el usuario pidió filtrado estricto por folder, aplicar filtro localmente sobre resources
    if (strictFolder && folderParam) {
      const normalized = folderParam;
      const before = resources.length;
      resources = resources.filter((r: any) => {
        // Cloudinary puede incluir la propiedad `folder` (si se subió en carpeta)
        const folderField = typeof r.folder === 'string' ? r.folder.replace(/^\/+|\/+$/g, '') : (r.folder || r['folder']);
        const publicId: string = r.public_id || '';
        const matchesFolder = Boolean(
          (typeof folderField === 'string' && folderField === normalized) ||
          (typeof publicId === 'string' && (publicId === normalized || publicId.startsWith(normalized + '/')))
        );
        return matchesFolder;
      });
      meta.filteredByFolder = { folder: normalized, before, after: resources.length };
      console.log('Cloudinary: strict folder filter applied', meta.filteredByFolder);
    }

    // Mapear recursos a la forma esperada por la galería
    const photos = (resources || []).map((r: any) => {
      const src = r.secure_url || (r.public_id ? cloudinary.url(r.public_id, { secure: true, transformation: [{ width: 1200, height: 800, crop: 'fill', quality: 'auto' }] }) : null);
      const base: any = {
        id: r.asset_id || r.public_id || r.public_id_with_version || src,
        src,
        width: r.width || 1200,
        height: r.height || 800,
        alt: (r.context && r.context.custom && r.context.custom.alt) || r.public_id || '',
      };

      if (debug) {
        // Agregar datos raw solo en modo debug
        base.public_id = r.public_id;
        base.folder = r.folder;
      }

      return base;
    }).filter((p: any) => p.src);

    meta.found = photos.length;

    // Si no encontramos nada:
    if (!photos.length) {
      // En modo estricto (cuando client solicita un folder explícito), devolvemos array vacío
      if (strictFolder) {
        meta.fallback = false;
        meta.strictEmpty = true;
        console.warn('Cloudinary: strict folder requested and no images found');
        return NextResponse.json(debug ? { photos: [], meta } : [], { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } });
      }

      // Si no es modo estricto, devolvemos demo (como antes)
      console.warn('Cloudinary: no images found — returning demo fallback');
      meta.fallback = true;
      const demo = [
        { id: 'demo-1', src: 'https://res.cloudinary.com/demo/image/upload/w_1200,h_800,c_fill,q_auto,f_auto/sample.jpg', width: 1200, height: 800, alt: 'Demo 1' },
        { id: 'demo-2', src: 'https://res.cloudinary.com/demo/image/upload/w_1200,h_800,c_fill,q_auto,f_auto/balloons.jpg', width: 1200, height: 800, alt: 'Demo 2' },
      ];
      return NextResponse.json(debug ? { photos: demo, meta } : demo, { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } });
    }

    return NextResponse.json(debug ? { photos, meta } : photos, { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } });
  } catch (e: any) {
    console.error('Cloudinary final error', e);
    const demo = [
      { id: 'demo-1', src: 'https://res.cloudinary.com/demo/image/upload/w_1200,h_800,c_fill,q_auto,f_auto/sample.jpg', width: 1200, height: 800, alt: 'Demo 1' },
      { id: 'demo-2', src: 'https://res.cloudinary.com/demo/image/upload/w_1200,h_800,c_fill,q_auto,f_auto/balloons.jpg', width: 1200, height: 800, alt: 'Demo 2' },
    ];
    return NextResponse.json(debug ? { photos: demo, meta: { error: String(e) } } : demo, { status: 200 });
  }
}

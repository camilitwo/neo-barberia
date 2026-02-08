export type ImageKitCrop = 'maintain_ratio' | 'force' | 'at_max' | 'at_least';

export type ImageKitTransform = {
  w?: number;
  h?: number;
  q?: number;
  f?: 'auto' | 'jpg' | 'png' | 'webp' | 'avif';
  c?: ImageKitCrop;
};

function getImageKitUrlEndpoint(): string | undefined {
  const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  if (!endpoint) return undefined;
  return endpoint.replace(/\/$/, '');
}

function buildTransformString(transform?: ImageKitTransform): string {
  if (!transform) return '';

  const parts: string[] = [];
  if (typeof transform.w === 'number') parts.push(`w-${transform.w}`);
  if (typeof transform.h === 'number') parts.push(`h-${transform.h}`);
  if (typeof transform.c === 'string') parts.push(`c-${transform.c}`);
  if (typeof transform.q === 'number') parts.push(`q-${transform.q}`);
  if (typeof transform.f === 'string') parts.push(`f-${transform.f}`);

  return parts.length ? `tr:${parts.join(',')}` : '';
}

export function imagekitUrl(srcOrPath: string, transform?: ImageKitTransform): string {
  const endpoint = getImageKitUrlEndpoint();
  if (!endpoint) return srcOrPath;

  const tr = buildTransformString(transform);

  const isRemote = /^https?:\/\//i.test(srcOrPath);
  const normalized = isRemote
    ? srcOrPath
    : srcOrPath.startsWith('/')
      ? srcOrPath
      : `/${srcOrPath}`;

  if (!tr) {
    return `${endpoint}${normalized.startsWith('/') ? '' : '/'}${normalized}`;
  }

  if (isRemote) {
    return `${endpoint}/${tr}/${srcOrPath}`;
  }

  return `${endpoint}/${tr}${normalized}`;
}

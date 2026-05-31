# Design Skills Audit - Neo Barberia

Fecha: 2026-05-31  
Skills aplicadas: Emil Design Engineering, Taste Skill, Impeccable

## Lectura de diseño

Reading this as: sitio publico y futuros portales para una barberia premium local, con lenguaje oscuro, fotografico, brutalista/minimal y operativo; preservar identidad Neo antes que imponer una estetica externa.

Configuracion recomendada:

- Public site: `DESIGN_VARIANCE 7`, `MOTION_INTENSITY 5`, `VISUAL_DENSITY 3`.
- Portal cliente: `DESIGN_VARIANCE 5`, `MOTION_INTENSITY 3`, `VISUAL_DENSITY 5`.
- Portal admin: `DESIGN_VARIANCE 3`, `MOTION_INTENSITY 2`, `VISUAL_DENSITY 8`.

## Lo que ya funciona

- Identidad visual clara: negro, dorado, foto en blanco y negro, grano y titulares grandes.
- El sitio no cae en el patron SaaS generico de cards claras, gradientes morados o hero con iconos decorativos.
- La marca se reconoce rapido: Neo, barberia, equipo, estilos y contacto.
- Buen uso de `focus-visible` en varias piezas.
- El sistema de variables CSS ya permite reutilizar paleta en los portales.

## Riesgos de diseno actuales

| Antes | Despues | Por que |
| --- | --- | --- |
| `h-screen` en hero principal | `min-h-[100dvh]` | Evita saltos de layout en mobile por la barra del navegador. |
| Transiciones con `transition-all` en botones/links | Transicionar propiedades concretas como `color`, `background-color`, `transform`, `border-color` | Mejora rendimiento y evita animaciones accidentales. |
| Botones sin estado `active` consistente | `active:scale-[0.98]` o `active:translate-y-px` | Los controles deben sentirse presionables y responsivos. |
| Navbar mobile con panel `rounded-2xl` mientras el sitio usa radio bajo/brutalista | Reducir a `rounded-sm` o definir una regla clara de radios | Evita mezclar lenguaje premium brutalista con UI SaaS blanda. |
| CTA de detalle estilo con `rounded-xl` | Boton rectangular/borde fino alineado al sistema Neo | Mantiene consistencia con el resto de la marca. |
| Flechas como caracteres `→`, `↗`, `↑` en muchos controles | Mantener si son parte de la estetica, pero normalizar tamanos/alineacion | El caracter funciona con Neo, pero requiere consistencia optica. |
| Labels mezclados en ingles tecnico: `OUTPUT_ARCHIVE`, `TECHNICAL_INTERESTS` | Usar ingles solo como recurso estetico; en flujos de usuario usar espanol claro | En portales cliente/admin la claridad pesa mas que la estetica. |
| Menu mobile con texto "Menu" sin tilde | `Menú` o eliminar label y usar solo estructura visual | Pulido de copy visible. |
| Secciones futuras tipo portal con cards repetidas | Layout por estados, listas, timeline y paneles operativos | Evita que Club Neo parezca dashboard generico. |

## Reglas de aplicacion para el sitio publico

- Mantener foto real o de barberia como primer impacto visual.
- Mantener fondo oscuro off-black, no `#000`.
- Usar dorado Neo como acento principal, no sumar nuevos acentos.
- No usar gradient text en nuevos bloques.
- Mantener titulares grandes solo donde hay jerarquia real.
- Usar grano/textura con baja opacidad para no ensuciar legibilidad.
- Evitar cards dentro de cards.
- Si se agregan nuevas secciones, preferir bandas full-width, grillas asimetricas o listas editoriales.
- En interacciones frecuentes, movimiento corto: 120-220 ms.
- En animaciones de entrada, usar `opacity` + `transform`, nunca `top/left/height`.

## Reglas para Portal Cliente

- Debe sentirse como Club Neo, no como una app bancaria.
- Pantalla principal debe responder en 3 segundos:
  - Que plan tengo.
  - Si estoy activo o pendiente.
  - Cuando debo pagar.
  - Cuantos cortes tengo.
  - Cual es mi proxima cita.
- CTA unico dominante por estado:
  - Activo: `Agendar corte`.
  - Pendiente: `Pagar en barberia`.
  - Suspendido: `Regularizar membresia`.
- Usar badges de estado con alto contraste:
  - `ACTIVE`: dorado/negro.
  - `PENDING_PAYMENT`: amber oscuro.
  - `PAST_DUE`: naranja.
  - `SUSPENDED`: rojo oscuro.
- Evitar exceso de animacion en agendamiento; el flujo debe sentirse rapido.
- Empty states deben enseñar accion: "Aun no tienes cortes agendados" + CTA.

## Reglas para Portal Admin

- Admin es herramienta operacional: menos editorial, mas claridad.
- Densidad alta pero controlada: tablas, filtros, estados y acciones rapidas.
- No usar hero sections, imagenes grandes ni decoracion pesada.
- Navegacion superior o sidebar sobrio, no marketing.
- Cada accion sensible debe tener:
  - confirmacion,
  - motivo si cambia pagos/fechas,
  - resultado visible,
  - auditoria.
- Estados y fechas deben ser mas prominentes que imagenes o nombres grandes.
- Animaciones casi nulas: hover, active y transiciones de paneles solamente.

## Prioridades de mejora

1. Normalizar sistema de radios, botones y estados presionados.
2. Cambiar `h-screen` a `min-h-[100dvh]` donde aplique.
3. Reemplazar `transition-all` por propiedades especificas.
4. Crear tokens compartidos para portales desde `globals.css`.
5. Crear componentes base:
   - `NeoButton`
   - `NeoInput`
   - `NeoStatusBadge`
   - `NeoPanel`
   - `NeoPageShell`
6. Definir copy de estados de suscripcion antes de construir UI.
7. Disenar empty/loading/error states desde el MVP, no despues.

## Criterio de aceptacion visual

Antes de cerrar cualquier pantalla nueva:

- No parece template SaaS.
- Usa solo la paleta Neo.
- Tiene foco visible.
- Tiene hover y active donde corresponde.
- Los textos caben en mobile.
- Los estados vacios/error/loading estan resueltos.
- No hay cards anidadas.
- No hay gradientes morados/azules ni decoracion generica.
- El admin prioriza velocidad; el cliente prioriza claridad y pertenencia.


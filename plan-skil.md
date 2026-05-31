# Plan de ejecucion de skills sobre Neo Barberia

Fecha: 2026-05-31  
Proyecto: `neo-barberia`  
Objetivo: aplicar las skills instaladas al sitio actual y dejar una guia repetible para mejorar la web publica y disenar los portales Club Neo/Admin sin perder identidad.

## 1. Skills instaladas y estado

### Emil Kowalski

Instalada como:

- `.agents/skills/emil-design-eng/SKILL.md`

Uso principal:

- Pulir interacciones, animaciones, botones, transiciones, microdetalles y sensacion de respuesta.

### Taste Skill

Instalada como bundle en `.agents/skills/`.

Skills relevantes:

- `design-taste-frontend`
- `gpt-taste`
- `redesign-existing-projects`
- `high-end-visual-design`
- `industrial-brutalist-ui`
- `minimalist-ui`
- `brandkit`

Uso principal:

- Evitar UI generica de IA.
- Mantener una direccion visual intencional.
- Auditar y redisenar sin romper el stack actual.

### Impeccable

Instalada como:

- `.agents/skills/impeccable/SKILL.md`
- `.claude/skills/impeccable/SKILL.md`

Uso principal:

- Critica, auditoria, polish, layout, copy, accesibilidad, responsive, estados, tokens y sistemas visuales.

## 2. Setup realizado

Impeccable exigia contexto de producto antes de ejecutar comandos. Se agrego:

- `PRODUCT.md`: contexto estrategico de producto, usuarios, proposito, personalidad, anti-referencias, principios y accesibilidad.
- `.impeccable.md`: contexto especifico de marca Neo para evitar esteticas genericas.
- `.impeccable/live/config.json`: configuracion para live mode en Next.js App Router.
- `design-skills-audit.md`: primera auditoria aplicada.

Registro detectado:

- `brand` como registro por defecto, porque el repo actual es principalmente el sitio publico.
- Para los portales Club Neo y Admin, usar registro `product` en prompts concretos, ya que ahi el diseno sirve al flujo y a la operacion.

Resultado de CSP:

- `node .agents/skills/impeccable/scripts/detect-csp.mjs` devolvio `shape: null`.
- No fue necesario parchear `next.config.mjs`.

## 3. Lectura de diseno aplicada

Reading this as: sitio publico y futuros portales para una barberia premium local, con lenguaje oscuro, fotografico, brutalista/minimal y operativo; preservar identidad Neo antes que imponer una estetica externa.

Configuracion recomendada:

- Sitio publico: `DESIGN_VARIANCE 7`, `MOTION_INTENSITY 5`, `VISUAL_DENSITY 3`.
- Portal cliente Club Neo: `DESIGN_VARIANCE 5`, `MOTION_INTENSITY 3`, `VISUAL_DENSITY 5`.
- Portal admin: `DESIGN_VARIANCE 3`, `MOTION_INTENSITY 2`, `VISUAL_DENSITY 8`.

## 4. Flujo recomendado para ejecutar las skills

### Paso 1: auditoria sin tocar codigo

Prompt recomendado:

```text
Usa impeccable, emil-design-eng y redesign-existing-projects para auditar la web actual. No modifiques archivos. Dame prioridades por impacto/riesgo.
```

Resultado esperado:

- Lista priorizada de problemas de UX/UI.
- Tabla Before/After para microinteracciones.
- Riesgos de responsive, accesibilidad y consistencia visual.

### Paso 2: mejoras pequenas al sitio actual

Prompt recomendado:

```text
Aplica las recomendaciones de emil-design-eng al sitio actual: active states, transiciones especificas, h-screen a 100dvh donde corresponda y consistencia de botones. Mantén estilos Neo.
```

Cambios esperados:

- Sustituir `h-screen` por `min-h-[100dvh]` en hero principal.
- Reemplazar `transition-all` por transiciones especificas.
- Agregar feedback `active` en botones y elementos presionables.
- Normalizar radios y CTAs que no calzan con el lenguaje Neo.
- Mantener foco visible y `prefers-reduced-motion`.

### Paso 3: diseno del portal cliente

Prompt recomendado:

```text
Usa impeccable en registro product, design-taste-frontend y emil-design-eng para crear el diseno base del portal cliente Club Neo segun plan.md, PRODUCT.md y .impeccable.md. Primero propón estructura de pantallas.
```

Pantallas a producir:

- Login/magic link.
- Seleccion de plan.
- Dashboard Club Neo.
- Agendar corte.
- Mi membresia.
- Ofertas.
- Perfil.

Regla principal:

- El cliente siempre debe entender: estado de membresia, cortes disponibles, proximo pago y proxima accion.

### Paso 4: diseno del admin

Prompt recomendado:

```text
Usa impeccable en registro product y redesign-existing-projects para disenar el backoffice admin. Debe ser oscuro, operativo, denso y claro. Nada de hero marketing ni cards decorativas.
```

Pantallas a producir:

- Login admin.
- Dashboard operativo.
- Suscripciones pendientes.
- Detalle de cliente.
- Registro de pago fisico.
- Ajuste de fechas con motivo.
- Agenda.
- Planes.
- Ofertas.
- Auditoria.

Regla principal:

- El admin debe priorizar lectura rapida, estados claros, fechas visibles y trazabilidad.

## 5. Hallazgos aplicados al sitio actual

| Antes | Despues recomendado | Motivo |
| --- | --- | --- |
| `components/Hero.tsx` usa `h-screen` | Cambiar a `min-h-[100dvh]` | Evita salto de viewport en mobile por barras del navegador. |
| Hay varios `transition-all` | Cambiar a propiedades concretas: `transition-colors`, `transition-transform`, `transition-opacity` | Evita animaciones accidentales y mejora performance. |
| Algunos botones no tienen `active` fisico | Agregar `active:scale-[0.98]` o `active:translate-y-px` | Los controles se sienten mas responsivos. |
| `rounded-xl` y `rounded-2xl` aparecen en piezas aisladas | Definir escala de radio Neo: brutalista bajo para paneles, full round solo para icon buttons/circulos reales | Evita mezcla de SaaS blando con identidad Neo. |
| `text-gradient` existe como utility | Evitarlo en nuevas secciones | Impeccable lo considera decorativo; Neo funciona mejor con dorado solido, outline y foto. |
| Titulares con `tracking-tighter` muy agresivo | Revisar caso a caso, especialmente mobile/tablet | Evita letras comprimidas o overflow. |
| Labels esteticos en ingles tecnico | Mantener solo en piezas editoriales, no en portal cliente/admin | En flujos de pago, membresia y agenda manda la claridad. |
| Botones con flechas caracter (`→`, `↗`) | Mantener si se normaliza tamano, alineacion y hit area | Es parte del lenguaje Neo, pero debe verse deliberado. |

## 6. Instrucciones operativas para futuras ejecuciones

### Ver skills instaladas

```bash
npx skills list
```

### Ejecutar Impeccable como auditoria

```text
Usa impeccable audit sobre la home actual. Revisa accesibilidad, responsive, performance visual, jerarquia y estados.
```

### Ejecutar Impeccable como critica UX

```text
Usa impeccable critique sobre el flujo de agendamiento planificado en plan.md. Dame score, problemas P0/P1/P2 y recomendaciones.
```

### Ejecutar Emil sobre microinteracciones

```text
Usa emil-design-eng para revisar botones, transiciones, modales, menu mobile y CTA flotante. Entrega tabla Before/After.
```

### Ejecutar Taste sobre rediseño

```text
Usa redesign-existing-projects y design-taste-frontend para mejorar la home sin cambiar la identidad Neo. Implementa cambios pequeños y verificables.
```

### Ejecutar Industrial Brutalist UI

```text
Usa industrial-brutalist-ui para definir componentes base de los portales Neo: botones, inputs, badges de estado, paneles y tablas.
```

### Ejecutar Live mode de Impeccable

Config ya creada:

```json
{
  "files": ["app/layout.tsx"],
  "insertBefore": "</body>",
  "commentSyntax": "jsx",
  "cspChecked": true
}
```

Comando conceptual:

```text
Usa impeccable live para iterar visualmente sobre la home en el navegador.
```

## 7. Plan de implementacion recomendado

### Sprint 1: polish de sitio publico

Cambios de bajo riesgo:

- Hero `h-screen` a `min-h-[100dvh]`.
- Reemplazar `transition-all`.
- Agregar `active` states.
- Normalizar radios en navbar mobile, popup y CTAs.
- Revisar `text-gradient` y evitar su uso nuevo.
- Agregar `text-wrap: balance` para h1-h3 donde corresponda.

### Sprint 2: design system Neo

Crear componentes base compartibles:

- `NeoButton`
- `NeoIconButton`
- `NeoInput`
- `NeoSelect`
- `NeoStatusBadge`
- `NeoPanel`
- `NeoTable`
- `NeoPageShell`

Tokens:

- Color.
- Radius.
- Motion.
- Z-index.
- Typographic scale.
- Status colors.

### Sprint 3: Portal Cliente

Aplicar skills para diseñar:

- Dashboard de membresia.
- Flujo de seleccion de plan.
- Flujo de agendamiento.
- Estados pendiente/activo/vencido/suspendido.
- Empty/loading/error states.

### Sprint 4: Portal Admin

Aplicar skills para diseñar:

- Dashboard operativo.
- Tabla de suscripciones.
- Registro de pago fisico.
- Ajuste de fechas con motivo.
- Agenda por barbero.
- Auditoria.

## 8. Resumen del resultado de esta ejecucion

Se aplico el flujo recomendado en modo preparacion + auditoria, sin modificar componentes visuales todavia.

Archivos agregados:

- `PRODUCT.md`: contexto requerido por Impeccable.
- `.impeccable/live/config.json`: configuracion live para Next App Router.
- `plan-skil.md`: este documento.

Archivos ya existentes de la instalacion/aplicacion previa:

- `.agents/skills/*`: skills instaladas para Codex.
- `.claude/skills/impeccable/SKILL.md`: copia Claude-compatible de Impeccable.
- `.impeccable.md`: contexto de marca Neo.
- `design-skills-audit.md`: auditoria inicial aplicada.
- `skills-lock.json`: lockfile de skills instaladas.

Diagnostico general:

- La identidad Neo ya es fuerte y debe preservarse.
- Los mayores ajustes inmediatos son de polish tecnico: viewport mobile, transiciones, estados activos, radios y consistencia de CTA.
- Para los portales, la prioridad no es mas decoracion: es claridad de estados, jerarquia operativa y confianza.
- Las skills quedan listas para ejecutarse por prompt en futuras tareas con contexto suficiente para no producir UI generica.

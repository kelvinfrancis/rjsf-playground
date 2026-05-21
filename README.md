# RJSF Playground

**React JSON Schema Form Playground** es una herramienta web interactiva que permite generar, visualizar y exportar formularios React de forma automática a partir de esquemas JSON Schema Draft 2020-12, sin necesidad de codificar manualmente cada campo.

🔗 **Demo en producción:** [rjsf-playground.vercel.app](https://rjsf-playground.vercel.app)

---

## Índice

- [Motivación](#motivación)
- [Características](#características)
- [Stack tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación y uso local](#instalación-y-uso-local)
- [Guía de uso](#guía-de-uso)
- [Esquemas de ejemplo](#esquemas-de-ejemplo)
- [Decisiones de diseño](#decisiones-de-diseño)
- [Despliegue](#despliegue)
- [Contexto académico](#contexto-académico)

---

## Motivación

La creación manual de formularios web es una de las tareas más repetitivas y propensas a errores en el desarrollo de interfaces de usuario. En entornos empresariales donde coexisten múltiples sistemas de información, la ausencia de un estándar común para la definición y validación de datos genera inconsistencias que incrementan los costes de mantenimiento y reducen la calidad del producto final.

Este proyecto surge de una necesidad real identificada en el entorno laboral del autor: la creación repetitiva y manual de formularios dentro de los flujos de trabajo del equipo de implementación representaba una inversión significativa de tiempo y recursos. La herramienta propuesta automatiza este proceso tomando como fuente de verdad un esquema JSON, del cual se deriva tanto la estructura visual del formulario como las reglas de validación, eliminando la duplicación de lógica entre capas.

---

## Características

### Panel de edición
- Editor de código **Monaco Editor** (el mismo motor que VS Code) con resaltado sintáctico JSON, plegado de nodos y detección de errores en tiempo real.
- Edición simultánea del **JSON Schema** (estructura y validación de datos) y del **UI Schema** (configuración de apariencia y widgets).
- Técnica de **debounce** para evitar renderizados innecesarios durante la escritura.

### Panel de vista previa
- Generación automática del formulario React a partir del esquema activo en el editor, actualizada en **tiempo real** ante cualquier cambio.
- Validación integrada mediante **AJV** conforme a la especificación JSON Schema Draft 2020-12.
- Mensajes de error contextuales bajo cada campo que los origina.
- Manejo robusto de errores sintácticos: el formulario se mantiene en el último estado válido mientras el usuario corrige el esquema.

### Panel de datos
- Visualización en tiempo real del **objeto JSON** resultante de los datos introducidos por el usuario en el formulario, actualizado con cada pulsación de tecla.

### Esquemas de ejemplo
- Selector de esquemas predefinidos para carga instantánea: Registro de usuario, Encuesta de satisfacción, Ficha de producto y Solicitud de soporte.
- Cada ejemplo incluye tanto el JSON Schema como su UI Schema correspondiente.

### Exportación
- Modal de exportación que genera un objeto JSON consolidado con el `schema` y el `uiSchema` activos, listo para ser integrado en proyectos de producción.
- Botón de copia al portapapeles con confirmación visual.

---

## Stack tecnológico

| Tecnología | Versión | Rol en el proyecto |
|---|---|---|
| React | 19 | Biblioteca principal de UI |
| TypeScript | 5.x | Tipado estático |
| Vite | 6.x | Bundler y servidor de desarrollo |
| @rjsf/core | 5.x | Motor de generación de formularios |
| @rjsf/validator-ajv8 | 5.x | Validación JSON Schema via AJV |
| @rjsf/utils | 5.x | Utilidades y tipos de RJSF |
| @monaco-editor/react | 4.x | Editor de código integrado |
| AJV | 8.x | Validador JSON Schema Draft 2020-12 |
| CSS Modules | — | Aislamiento de estilos por componente |
| Git / GitHub | — | Control de versiones |
| Vercel | — | Despliegue continuo |

---

## Arquitectura

La aplicación está organizada como una **SPA (Single Page Application)** basada en React, con tres bloques funcionales principales que operan de forma coordinada sobre un estado global centralizado.

```
┌─────────────────────────────────────────────────────────┐
│                      PlaygroundContext                    │
│   schemaText · schemaObject · uiSchemaText ·             │
│   uiSchemaObject · formData · error                      │
└────────────┬──────────────────────┬──────────────────────┘
             │                      │
    ┌────────▼────────┐    ┌────────▼────────────────────┐
    │  SchemaEditor   │    │        FormPreview           │
    │                 │    │                              │
    │  Monaco Editor  │    │  RJSF Form (schema → UI)     │
    │  (JSON Schema)  │    │  AJV Validator               │
    │                 │    │                              │
    │  Monaco Editor  │    │  DataPreview                 │
    │  (UI Schema)    │    │  (formData en tiempo real)   │
    └─────────────────┘    └──────────────────────────────┘
```

### Gestión del estado

El estado global se implementa mediante la **API de contexto de React** combinada con `useReducer`, centralizando la fuente de verdad en un único `PlaygroundContext` accesible desde cualquier componente. Esta decisión se tomó en favor de la simplicidad sobre soluciones externas como Redux o Zustand, dado que la complejidad del estado no lo justifica.

El reducer gestiona tres acciones principales:

- `SCHEMA_CHANGED` — actualiza el esquema JSON; en caso de error sintáctico mantiene el formulario en el último estado válido.
- `UI_SCHEMA_CHANGED` — actualiza las opciones de presentación del formulario.
- `FORM_DATA_CHANGED` — sincroniza los datos introducidos por el usuario en el panel de datos.

---

## Estructura del proyecto

```
rjsf-playground/
├── public/
├── src/
│   ├── components/
│   │   ├── SchemaEditor.tsx       # Editor Monaco para JSON Schema y UI Schema
│   │   ├── SchemaEditor.module.css
│   │   ├── FormPreview.tsx        # Vista previa del formulario RJSF
│   │   ├── FormPreview.module.css
│   │   ├── DataPreview.tsx        # Panel de datos en tiempo real
│   │   ├── DataPreview.module.css
│   │   ├── ExampleSelector.tsx    # Selector de esquemas predefinidos
│   │   ├── ExampleSelector.module.css
│   │   ├── ExportModal.tsx        # Modal de exportación JSON
│   │   └── ExportModal.module.css
│   ├── context/
│   │   ├── PlaygroundContext.ts   # Definición del contexto React
│   │   ├── PlaygroundProvider.tsx # Provider con reducer y estado inicial
│   │   ├── usePlayground.ts       # Hook de acceso al contexto
│   │   └── types.ts               # Tipos e interfaces del estado global
│   ├── utils/
│   │   └── exampleSchemas.ts      # Esquemas de ejemplo predefinidos
│   ├── App.tsx
│   ├── App.module.css
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Instalación y uso local

### Requisitos previos

- Node.js 18 o superior
- npm 9 o superior

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/rjsf-playground.git
cd rjsf-playground

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Comandos disponibles

```bash
npm run dev      # Servidor de desarrollo con hot reload
npm run build    # Compilación para producción en /dist
npm run preview  # Vista previa del build de producción
npm run lint     # Análisis estático del código
```

---

## Guía de uso

### 1. Escribir o modificar el esquema JSON

El panel izquierdo contiene el editor de **JSON Schema**. Escribe o modifica el esquema directamente en el editor. El formulario de la derecha se actualiza automáticamente con cada cambio válido.

Ejemplo mínimo:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Mi formulario",
  "type": "object",
  "properties": {
    "nombre": {
      "type": "string",
      "title": "Nombre"
    }
  },
  "required": ["nombre"]
}
```

### 2. Personalizar la apariencia con el UI Schema

El panel inferior izquierdo permite configurar el **UI Schema**, que controla la apariencia de los campos sin modificar el contrato de datos.

Ejemplo para convertir un campo en área de texto:

```json
{
  "descripcion": {
    "ui:widget": "textarea",
    "ui:options": {
      "rows": 4
    }
  }
}
```

### 3. Interactuar con el formulario

El formulario generado en el panel derecho es completamente funcional. Al introducir datos, el panel inferior muestra el objeto JSON resultante en tiempo real.

### 4. Cargar un esquema de ejemplo

Usa el selector **"Cargar ejemplo..."** en la barra superior para cargar uno de los cuatro esquemas predefinidos instantáneamente.

### 5. Exportar el esquema

Haz clic en **"Exportar JSON"** para abrir el modal de exportación, que muestra el esquema consolidado (JSON Schema + UI Schema) listo para copiar e integrar en cualquier proyecto.

---

## Esquemas de ejemplo

El playground incluye cuatro esquemas de ejemplo predefinidos que ilustran diferentes capacidades de JSON Schema y RJSF:

| Ejemplo | Conceptos demostrados |
|---|---|
| **Registro de usuario** | Formato `email`, formato `date`, widget `password`, validación `minLength` |
| **Encuesta de satisfacción** | Enumeraciones `enum`, tipo `boolean`, widget `textarea` |
| **Ficha de producto** | Tipo `number` con `minimum`, campo `select` desde `enum`, combinación de tipos |
| **Solicitud de soporte** | Múltiples campos obligatorios (`required`), textarea con `rows` personalizado |

---

## Decisiones de diseño

### Tema oscuro como predeterminado

El entorno de desarrollo profesional de referencia (VS Code, terminales, DevTools) utiliza temas oscuros de forma predominante. Adoptar un tema oscuro como predeterminado reduce la fatiga visual en sesiones de trabajo prolongadas y proporciona coherencia con el ecosistema de herramientas del desarrollador.

### Monaco Editor sobre alternativas

La elección de Monaco Editor frente a alternativas como CodeMirror responde a tres factores: la familiaridad del desarrollador con su interfaz (idéntica a VS Code), la calidad de la integración con el servicio de lenguaje JSON para validación y autocompletado, y la disponibilidad de un envoltorio React de primera clase mediante `@monaco-editor/react`.

### CSS Modules sobre soluciones CSS-in-JS

CSS Modules proporciona aislamiento de estilos a nivel de componente sin añadir dependencias de tiempo de ejecución. Frente a soluciones como styled-components o Emotion, esta aproximación mantiene los estilos en ficheros CSS estándar, reduce el tamaño del bundle y es compatible con las herramientas de optimización de Vite.

### Contexto + useReducer sobre Redux

Dado que el estado global del playground se reduce a cinco campos relacionados y las transiciones son predecibles, la API nativa de React (`createContext` + `useReducer`) resulta suficiente y elimina la necesidad de dependencias externas adicionales.

---

## Despliegue

La aplicación se despliega automáticamente en **Vercel** mediante integración continua con el repositorio de GitHub. Cada fusión en la rama `main` desencadena una nueva compilación con `vite build` y la distribución del artefacto resultante a través de la CDN global de Vercel.

La configuración incluye una regla de reescritura de rutas que redirige todas las solicitudes a `index.html`, garantizando el correcto funcionamiento del enrutamiento de la SPA.

---

## Contexto académico

Este proyecto constituye el **Trabajo de Fin de Máster (TFM)** del Máster Universitario en Diseño y Desarrollo de Interfaz de Usuario Web (*Front-End Design and Development*) de la **Universidad Internacional de La Rioja (UNIR)**.

La herramienta se enmarca en la tipología de **Tipo 1: Diseño y desarrollo de interfaz de una aplicación web SPA**, conforme a los criterios establecidos por la Escuela Superior de Ingeniería y Tecnología de la UNIR.

**Autor:** Kelvin Francisco Moquete Peña  
**Institución:** Universidad Internacional de La Rioja (UNIR)  
**Programa:** Máster Universitario en Diseño y Desarrollo de Interfaz de Usuario Web

---

## Licencia

MIT © Kelvin Francisco Moquete Peña

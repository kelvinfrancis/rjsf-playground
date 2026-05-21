export interface ExampleSchema {
  label: string
  schema: object
  uiSchema: object
}

export const EXAMPLE_SCHEMAS: ExampleSchema[] = [
  {
    label: 'Registro de usuario',
    schema: {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      title: 'Registro de usuario',
      type: 'object',
      properties: {
        nombre: { type: 'string', title: 'Nombre completo', minLength: 2 },
        email: { type: 'string', title: 'Correo electrónico', format: 'email' },
        password: { type: 'string', title: 'Contraseña', minLength: 8 },
        fechaNacimiento: { type: 'string', title: 'Fecha de nacimiento', format: 'date' },
      },
      required: ['nombre', 'email', 'password'],
    },
    uiSchema: {
      password: { 'ui:widget': 'password' },
      fechaNacimiento: { 'ui:widget': 'date' },
    },
  },
  {
    label: 'Encuesta de satisfacción',
    schema: {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      title: 'Encuesta de satisfacción',
      type: 'object',
      properties: {
        puntuacion: {
          type: 'integer',
          title: 'Puntuación general',
          minimum: 1,
          maximum: 5,
          enum: [1, 2, 3, 4, 5],
        },
        recomendaria: {
          type: 'boolean',
          title: '¿Recomendaría el servicio?',
        },
        comentarios: {
          type: 'string',
          title: 'Comentarios adicionales',
        },
      },
      required: ['puntuacion'],
    },
    uiSchema: {
      comentarios: { 'ui:widget': 'textarea', 'ui:options': { rows: 4 } },
    },
  },
  {
    label: 'Ficha de producto',
    schema: {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      title: 'Ficha de producto',
      type: 'object',
      properties: {
        nombre: { type: 'string', title: 'Nombre del producto' },
        categoria: {
          type: 'string',
          title: 'Categoría',
          enum: ['Electrónica', 'Ropa', 'Alimentación', 'Hogar'],
        },
        precio: { type: 'number', title: 'Precio (€)', minimum: 0 },
        disponible: { type: 'boolean', title: 'Disponible en stock' },
        descripcion: { type: 'string', title: 'Descripción' },
      },
      required: ['nombre', 'categoria', 'precio'],
    },
    uiSchema: {
      descripcion: { 'ui:widget': 'textarea', 'ui:options': { rows: 3 } },
    },
  },
  {
    label: 'Solicitud de soporte',
    schema: {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      title: 'Solicitud de soporte',
      type: 'object',
      properties: {
        asunto: { type: 'string', title: 'Asunto', minLength: 5 },
        prioridad: {
          type: 'string',
          title: 'Prioridad',
          enum: ['Baja', 'Media', 'Alta', 'Crítica'],
        },
        descripcion: { type: 'string', title: 'Descripción del problema' },
        email: { type: 'string', title: 'Correo de contacto', format: 'email' },
      },
      required: ['asunto', 'prioridad', 'descripcion', 'email'],
    },
    uiSchema: {
      descripcion: { 'ui:widget': 'textarea', 'ui:options': { rows: 5 } },
    },
  },
]
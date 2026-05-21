import Form from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'
import type { UiSchema } from '@rjsf/utils'
import { usePlayground } from '../context/usePlayground'

export function FormPreview() {
  const { state } = usePlayground()

  if (state.error || !state.schemaObject) {
    return (
      <div style={{ padding: '1rem', color: 'red' }}>
        <p>El esquema contiene errores. Corrígelos para ver la vista previa.</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h3>Vista previa del formulario</h3>
      <Form
        schema={state.schemaObject}
        uiSchema={state.uiSchemaObject as UiSchema}
        validator={validator}
        onSubmit={({ formData }) => console.log('Datos enviados:', formData)}
      />
    </div>
  )
}
import Form from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'
import type { UiSchema } from '@rjsf/utils'
import { usePlayground } from '../context/usePlayground'
import styles from './FormPreview.module.css'

export function FormPreview() {
  const { state } = usePlayground()

  if (state.error || !state.schemaObject) {
    return (
      <p className={styles.error}>
        El esquema contiene errores. Corrígelos para ver la vista previa.
      </p>
    )
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>Vista previa</p>
      <div className="rjsf">
        <Form
          schema={state.schemaObject}
          uiSchema={state.uiSchemaObject as UiSchema}
          validator={validator}
          onSubmit={({ formData }) => console.log('Datos enviados:', formData)}
        />
      </div>
    </div>
  )
}
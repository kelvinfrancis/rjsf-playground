import { usePlayground } from '../context/usePlayground'
import { EXAMPLE_SCHEMAS } from '../utils/exampleSchemas'
import styles from './ExampleSelector.module.css'

export function ExampleSelector() {
  const { dispatch } = usePlayground()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const index = parseInt(e.target.value)
    if (isNaN(index)) return

    const example = EXAMPLE_SCHEMAS[index]
    dispatch({
      type: 'SCHEMA_CHANGED',
      payload: JSON.stringify(example.schema, null, 2),
    })
    dispatch({
      type: 'UI_SCHEMA_CHANGED',
      payload: JSON.stringify(example.uiSchema, null, 2),
    })

    e.target.value = ''
  }

  return (
    <select className={styles.select} onChange={handleChange} defaultValue="">
      <option value="" disabled>Cargar ejemplo...</option>
      {EXAMPLE_SCHEMAS.map((example, index) => (
        <option key={index} value={index}>
          {example.label}
        </option>
      ))}
    </select>
  )
}
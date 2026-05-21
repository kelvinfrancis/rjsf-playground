import Editor from '@monaco-editor/react'
import { usePlayground } from '../context/usePlayground'
import styles from './SchemaEditor.module.css'

export function SchemaEditor() {
  const { state, dispatch } = usePlayground()

  function handleSchemaChange(value: string | undefined) {
    dispatch({ type: 'SCHEMA_CHANGED', payload: value ?? '' })
  }

  function handleUiSchemaChange(value: string | undefined) {
    dispatch({ type: 'UI_SCHEMA_CHANGED', payload: value ?? '' })
  }

  return (
    <div className={styles.container}>
      <div className={styles.editorBlock}>
        <span className={styles.label}>JSON Schema</span>
        <Editor
          height="60vh"
          defaultLanguage="json"
          value={state.schemaText}
          onChange={handleSchemaChange}
          theme="vs-dark"
          options={{ minimap: { enabled: false }, fontSize: 13, tabSize: 2 }}
        />
      </div>
      <div className={styles.editorBlock}>
        <span className={styles.label}>UI Schema</span>
        <Editor
          height="25vh"
          defaultLanguage="json"
          value={state.uiSchemaText}
          onChange={handleUiSchemaChange}
          theme="vs-dark"
          options={{ minimap: { enabled: false }, fontSize: 13, tabSize: 2 }}
        />
      </div>
      {state.error && <p className={styles.error}>{state.error}</p>}
    </div>
  )
}
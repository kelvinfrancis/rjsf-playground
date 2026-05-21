import Editor from '@monaco-editor/react'
import { usePlayground } from '../context/usePlayground'

export function SchemaEditor() {
  const { state, dispatch } = usePlayground()

  function handleSchemaChange(value: string | undefined) {
    dispatch({ type: 'SCHEMA_CHANGED', payload: value ?? '' })
  }

  function handleUiSchemaChange(value: string | undefined) {
    dispatch({ type: 'UI_SCHEMA_CHANGED', payload: value ?? '' })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h3>JSON Schema</h3>
        <Editor
          height="40vh"
          defaultLanguage="json"
          value={state.schemaText}
          onChange={handleSchemaChange}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            tabSize: 2,
          }}
        />
      </div>
      <div>
        <h3>UI Schema</h3>
        <Editor
          height="20vh"
          defaultLanguage="json"
          value={state.uiSchemaText}
          onChange={handleUiSchemaChange}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            tabSize: 2,
          }}
        />
      </div>
      {state.error && (
        <p style={{ color: 'red', fontSize: '0.85rem' }}>{state.error}</p>
      )}
    </div>
  )
}
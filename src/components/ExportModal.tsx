import Editor from '@monaco-editor/react'
import { useState } from 'react'
import { usePlayground } from '../context/usePlayground'

export function ExportModal() {
  const { state } = usePlayground()
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const json = state.schemaObject
    ? JSON.stringify(
        {
          schema: state.schemaObject,
          uiSchema: state.uiSchemaObject,
        },
        null,
        2
      )
    : ''

  async function handleCopy() {
    await navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>Exportar JSON</button>

      {open && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: 'white', borderRadius: '8px',
            padding: '1.5rem', width: '60vw', maxHeight: '80vh',
            display: 'flex', flexDirection: 'column', gap: '1rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>JSON Schema exportado</h3>
              <button onClick={() => setOpen(false)}>✕ Cerrar</button>
            </div>
            <Editor
              height="50vh"
              defaultLanguage="json"
              value={json}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 13,
              }}
            />
            <button onClick={handleCopy}>
              {copied ? '✓ Copiado' : 'Copiar al portapapeles'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
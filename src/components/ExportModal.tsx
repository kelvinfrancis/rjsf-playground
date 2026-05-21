import Editor from '@monaco-editor/react'
import { useState } from 'react'
import { usePlayground } from '../context/usePlayground'
import styles from './ExportModal.module.css'

export function ExportModal() {
  const { state } = usePlayground()
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const json = state.schemaObject
    ? JSON.stringify({ schema: state.schemaObject, uiSchema: state.uiSchemaObject }, null, 2)
    : ''

  async function handleCopy() {
    await navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <button className={styles.triggerBtn} onClick={() => setOpen(true)}>
        Exportar JSON
      </button>

      {open && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>JSON exportado</h3>
              <button className={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
            </div>
            <Editor
              height="50vh"
              defaultLanguage="json"
              value={json}
              theme="vs-dark"
              options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13 }}
            />
            <button className={styles.copyBtn} onClick={handleCopy}>
              {copied ? '✓ Copiado' : 'Copiar al portapapeles'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
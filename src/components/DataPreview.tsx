import Editor from '@monaco-editor/react'
import { usePlayground } from '../context/usePlayground'
import styles from './DataPreview.module.css'

export function DataPreview() {
  const { state } = usePlayground()

  const json = JSON.stringify(state.formData, null, 2)

  return (
    <div className={styles.container}>
      <p className={styles.title}>Datos del formulario</p>
      <Editor
        height="100%"
        defaultLanguage="json"
        value={json}
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 13,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  )
}
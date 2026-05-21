import { SchemaEditor } from './components/SchemaEditor'
import { FormPreview } from './components/FormPreview'
import { ExportModal } from './components/ExportModal'

function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>RJSF Playground</h1>
        <ExportModal />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <SchemaEditor />
        <FormPreview />
      </div>
    </div>
  )
}

export default App
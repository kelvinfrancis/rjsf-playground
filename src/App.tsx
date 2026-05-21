import { SchemaEditor } from './components/SchemaEditor'
import { FormPreview } from './components/FormPreview'
import { ExportModal } from './components/ExportModal'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.logo}>RJSF</span>
          <span className={styles.logoSub}>Playground</span>
        </div>
        <ExportModal />
      </header>
      <main className={styles.main}>
        <section className={styles.panel}>
          <SchemaEditor />
        </section>
        <section className={styles.panel}>
          <FormPreview />
        </section>
      </main>
    </div>
  )
}

export default App
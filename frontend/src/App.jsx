import PageContainer from './components/layout/PageContainer'
import CatalogDashboard from './components/catalog/CatalogDashboard'
import ToastContainer from './components/common/ToastContainer'
import { ToastProvider } from './context/ToastContext'

function App() {
  return (
    <ToastProvider>
      <PageContainer>
        <CatalogDashboard />
      </PageContainer>
      <ToastContainer />
    </ToastProvider>
  )
}

export default App

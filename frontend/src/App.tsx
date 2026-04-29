import { Routes, Route, Navigate } from 'react-router-dom'
import { SearchPage } from './features/search/SearchPage'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Festa Julina Universitária</h1>
          <p className="text-sm text-muted-foreground">Sistema de Elegibilidade a Descontos</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/search" replace />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

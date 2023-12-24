import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import AdminHomepage from './pages/AdminHomepage'
import PrivateRoute from './components/PrivateRoute'
import AdminLogin from './pages/AdminLogin'
import Homepage from './pages/Homepage'

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider >
          <Routes>
            <Route path='/' element={
              <Homepage />
            } />
            <Route path="/admin" element={
              <PrivateRoute >
                <AdminHomepage />
              </PrivateRoute>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter >
    </>
  )
}

export default App

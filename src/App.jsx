import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider >
          <Routes>
            <Route path="/" element={
              <PrivateRoute >
                <Homepage />
              </PrivateRoute>
            } />
            <Route path="/login" element={
              <Login />
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter >
    </>
  )
}

export default App

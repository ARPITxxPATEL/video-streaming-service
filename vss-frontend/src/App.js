import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Sidebar from './components/layout/Sidebar';
import { Container, Box } from '@mui/material';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { SnackbarProvider } from './context/SnackbarContext';
import { FullscreenProvider } from './context/FullscreenContext';

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn)
  return isLoggedIn ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
    <Router>
      <SnackbarProvider>
      <AuthProvider>
      <FullscreenProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <Box display="flex" width="100%" height="100vh">
              <Sidebar />
              <Container 
              sx={{ 
                flexGrow: 1,
                padding: '0px',
                margin: '0px',
                height: '100%',
                background: '#2F3238',
              }} >
                <Routes>
                  <Route path="/home"  element={<Home />}  />
                  <Route path="/profile"  element={<Profile />}  />
                  <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
              </Container>
            </Box>
          }
        />
      </Routes>
      </FullscreenProvider>
      </AuthProvider>
      </SnackbarProvider>
    </Router>
    </Box>
  );
}

export default App;

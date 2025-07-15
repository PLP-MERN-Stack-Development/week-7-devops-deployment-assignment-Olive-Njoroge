import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

export default function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('❌ Failed to parse user from localStorage:', error);
        localStorage.removeItem('user'); // Clean up bad data
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Home user={user} />
            ) : (
              <Login
                setUser={(userData) => {
                  localStorage.setItem('user', JSON.stringify(userData));
                  setUser(userData);
                }}
              />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

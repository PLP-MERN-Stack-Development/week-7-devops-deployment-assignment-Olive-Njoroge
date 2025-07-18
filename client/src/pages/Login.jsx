import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await registerUser(username);
      setUser(res.data); // ✅ this now works
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className='h-screen flex items-center justify-center bg-gray-100'>
      <div className='p-6 bg-white rounded shadow-md w-96'>
        <h1 className='font-bold mb-4 text-xl'>Join Chat</h1>

        <label htmlFor="username" className="block mb-1 font-medium">Username</label>
        <input
          className='p-2 border rounded mb-4 w-full'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className='w-full bg-blue-500 text-white p-2 rounded'
        >
          Enter
        </button>
      </div>
    </div>
  );
}

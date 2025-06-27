'use client';
import { useState } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    if (res.ok) window.location.href = '/dashboard';
    else alert('Login failed');
  };
const handleGoogleLogin = () => {
  window.location.href = 'http://localhost:5000/api/auth/google';
};

  return (
<div className='container text-center '>
    <div className=" row ">
       <div className='col-md-4 mx-auto d-flex justify-content-center  flex-column border my-4'>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
    
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full mb-2 p-2 border" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="block w-full mb-4 p-2 border" />
      <button onClick={handleLogin} className=" btn btn-primary bg-blue-600 text-white px-4 py-2">Login</button>
      <button onClick={handleGoogleLogin} className="btn btn-danger text-white px-6 py-2 mt-2">Login with Google</button>
      <p className="mt-4 text-sm">Don't have an account? <Link href="/register" className="text-blue-600 underline">Register</Link></p>
      </div>
    </div>
    </div>
  );
}

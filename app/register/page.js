'use client';
import { useState } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleRegister = async () => {
const res = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ name, email, password })
});

    if (res.ok) window.location.href = '/dashboard';
    else alert('Registration failed');
  };
  return (
   <div className='container text-center '>
    <div className=" row ">
       <div className='col-md-4 mx-auto d-flex justify-content-center  flex-column border my-4'>
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="block w-full mb-2 p-2 border" />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full mb-2 p-2 border" />
    
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="block w-full mb-4 p-2 border" />
      <button onClick={handleRegister} className=" btn btn-primary bg-green-600 text-white px-4 py-2">Register</button>
      <p className="mt-4 text-sm">Already have an account? <Link href="/login" className="text-blue-600 underline">Login</Link></p>
      </div>
    </div>
    </div>
  );
}


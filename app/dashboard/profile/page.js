'use client';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProfileUpdatePage() {
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/user/profile', { credentials: 'include' })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setName(data.name || '');
        setAvatarUrl(data.avatar_url || '');
        setLoading(false);
      })
      .catch(() => {
        alert('Session expired');
        window.location.href = '/login';
      });
  }, []);

  const handleUpdate = async () => {
    const res = await fetch('http://localhost:5000/api/user/profile/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name, avatar_url: avatarUrl }),
    });

    if (res.ok) {
      alert('Profile updated');
      window.location.href = '/dashboard';
    } else {
      const data = await res.json();
      alert(data.error || 'Failed to update profile');
    }
  };

  

  if (loading) return <p className="p-6">Loading...</p>;

  return (
<div className='container text-center '>
    <div className=" row ">
       <div className='col-md-4 mx-auto d-flex justify-content-center  flex-column border my-4'>
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="block w-full mb-2 p-2 border"
      />
      <input
        type="text"
        placeholder="Avatar URL"
        value={avatarUrl}
        onChange={e => setAvatarUrl(e.target.value)}
        className="block w-full mb-4 p-2 border"
      />
      <button onClick={handleUpdate} className=" btn btn-primary bg-green-600 text-white px-4 py-2">Update</button>
    </div>
    </div>
    </div>
  );
}

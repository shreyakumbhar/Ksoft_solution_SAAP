'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function DashboardPage() {
    const router = useRouter(); 
  const [profile, setProfile] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/user/profile', { credentials: 'include' })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setProfile(data);
        if (data.role === 'admin') {
          fetch('http://localhost:5000/api/admin/users', { credentials: 'include' })
            .then(res => res.ok ? res.json() : [])
            .then(setAllUsers);
        }
      })
      .catch(() => {
       
      });
  }, []);




const handleLogout = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/user/logout', {
      method: 'POST',
      credentials: 'include',
    });
    if (res.ok) {
      router.push('/login'); // ✅ redirect to login page
    } else {
      alert('Logout failed.');
    }
  } catch (err) {
    console.error('Logout error:', err);
    alert('Error during logout.');
  }
};


  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!profile) return <p className="p-6">Loading...</p>;

  return (
    <div className="container text-center m-auto">
          {profile.role === 'user' && (
      <div className="card text-center mx-auto my-4" style={{ width: "17rem" }}>
        <img src={profile.avatar_url} alt='avatar' height={200} width={270} />
        <div className="card-body">
          <h4 className="text-2xl font-bold mb-2">Welcome, {profile.name}</h4>
          <h5 className="card-title">Email: {profile.email}</h5>
          <p className="card-text">Auth Type: {profile.auth_type}</p>
        </div>
        <Link href="/dashboard/profile">
          <button className="btn btn-success bg-blue-600 text-white px-4 py-2 mt-4 rounded">
            Edit Profile
          </button>
        </Link>

        <button
  onClick={handleLogout}
  className="btn btn-danger bg-red-600 text-white px-4 py-2 mt-4 rounded"
>
  Logout
</button>
      </div>
        )}

      {profile.role === 'admin' && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Admin Dashboard</h3>

         
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search by name, email or role"
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 👥 User Table */}
          <table className="w-full text-left border table">
            <thead>
              <tr>
                <th className="border px-2">Name</th>
                <th className="border px-2">Email</th>
                <th className="border px-2">Role</th>
                <th className="border px-2">Auth_type</th>
                <th className="border px-2">Created_at</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td className="border px-2 py-1">{user.name}</td>
                  <td className="border px-2 py-1">{user.email}</td>
                  <td className="border px-2 py-1">{user.role}</td>
                  <td className="border px-2 py-1">{user.auth_type}</td>
                  <td className="border px-2 py-1">{user.created_at}</td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-3">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

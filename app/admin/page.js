'use client'
import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/admin/users').then(res => res.json()).then(setUsers)
  }, [])

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Auth Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.role}</td>
              <td className="border px-4 py-2">{u.auth_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
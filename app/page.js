import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to SaaS App</h1>
      <div className="space-x-4">
        <Link href="/login" style={{textDecoration:"none",color:"blue",fontSize:"20px"}} className="text-blue-600 underline">Login</Link>
        <br/>
        <Link href="/register"  style={{textDecoration:"none",color:"blue",fontSize:"20px"}} className="text-blue-600 underline">Register</Link>
      </div>
    </main>
  );
}
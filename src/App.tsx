import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import { User } from './types';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-gray-900 text-white p-2 rounded-xl group-hover:scale-110 transition-transform">
                  <Users className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold tracking-tight">UserDir</span>
              </Link>
              
              <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-500">
                <Link to="/" className="hover:text-gray-900 transition-colors">Directory</Link>
                <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">API Docs</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {error ? (
            <div className="bg-red-50 border border-red-100 text-red-700 p-6 rounded-2xl text-center">
              <p className="font-medium">Error loading data</p>
              <p className="text-sm opacity-80 mt-1">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<UserList users={users} loading={loading} />} />
              <Route path="/user/:id" element={<UserDetail users={users} />} />
            </Routes>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-12 bg-white mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-gray-400">
              Built with React, Tailwind CSS, and JSONPlaceholder.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

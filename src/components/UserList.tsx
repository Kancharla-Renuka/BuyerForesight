import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronUp, ChevronDown, User as UserIcon, Building2, Mail, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  loading: boolean;
}

type SortField = 'name' | 'company';
type SortOrder = 'asc' | 'desc';

export default function UserList({ users, loading }: UserListProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        let valA = sortField === 'name' ? a.name : a.company.name;
        let valB = sortField === 'name' ? b.name : b.company.name;

        if (sortOrder === 'asc') {
          return valA.localeCompare(valB);
        } else {
          return valB.localeCompare(valA);
        }
      });
  }, [users, searchTerm, sortField, sortOrder]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Sort by:</span>
          <button
            onClick={() => toggleSort('name')}
            className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1 ${
              sortField === 'name' ? 'bg-gray-900 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Name
            {sortField === 'name' && (sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
          </button>
          <button
            onClick={() => toggleSort('company')}
            className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1 ${
              sortField === 'company' ? 'bg-gray-900 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Company
            {sortField === 'company' && (sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedUsers.map((user) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={user.id}
            onClick={() => navigate(`/user/${user.id}`)}
            className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-blue-50 text-blue-600 p-2 rounded-full">
                <UserIcon className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{user.company.name}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredAndSortedUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No users found matching your search.</p>
        </div>
      )}
    </div>
  );
}

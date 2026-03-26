import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Globe, MapPin, Building2, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import { User } from '../types';

interface UserDetailProps {
  users: User[];
}

export default function UserDetail({ users }: UserDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const user = users.find(u => u.id === Number(id));

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">User not found.</p>
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:underline flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Directory
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <button
        onClick={() => navigate('/')}
        className="group flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Directory
      </button>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gray-900 p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">{user.name}</h1>
              <p className="text-gray-400 text-lg">@{user.username}</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={`mailto:${user.email}`}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href={`tel:${user.phone}`}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact & Address */}
          <div className="space-y-8">
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Location
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg">
                  {user.address.suite}, {user.address.street}
                </p>
                <p className="text-lg">
                  {user.address.city}, {user.address.zipcode}
                </p>
                <div className="pt-4">
                  <a
                    href={`https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View on Google Maps <ArrowLeft className="h-4 w-4 rotate-180" />
                  </a>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <Mail className="h-4 w-4" /> Contact Details
              </h2>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">Email</span>
                  <span className="text-lg text-gray-900">{user.email}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">Phone</span>
                  <span className="text-lg text-gray-900">{user.phone}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">Website</span>
                  <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-lg text-blue-600 hover:underline">
                    {user.website}
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* Company Info */}
          <div className="space-y-8">
            <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <Building2 className="h-4 w-4" /> Company
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{user.company.name}</h3>
                  <p className="text-gray-500 italic mt-1">"{user.company.catchPhrase}"</p>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <span className="text-sm text-gray-400 block">Business Strategy</span>
                    <span className="text-gray-700">{user.company.bs}</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MapPin, Search, MessageSquare, ShoppingCart, FileText, TestTube, BookOpen, Building2 } from 'lucide-react';

export default function Home() {
  const [location, setLocation] = useState('Bangalore');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (specialty: string = searchTerm) => {
    if (specialty.trim()) {
      router.push(`/doctors?specialty=${encodeURIComponent(specialty)}&location=${encodeURIComponent(location)}`);
    }
  };

  const popularSearches = [
    'Dermatologist',
    'Pediatrician', 
    'Gynecologist/Obstetrician',
    'Other'
  ];

  const services = [
    { icon: MessageSquare, title: 'Consult with a doctor', description: 'Book video consultation' },
    { icon: ShoppingCart, title: 'Order Medicines', description: 'Get medicines delivered' },
    { icon: FileText, title: 'View medical records', description: 'Access your health records' },
    { icon: TestTube, title: 'Book test', description: 'Schedule lab tests', badge: 'New' },
    { icon: BookOpen, title: 'Read articles', description: 'Health tips and articles' },
    { icon: Building2, title: 'For healthcare providers', description: 'Join our platform' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">•practo•</div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium border-b-2 border-blue-600">Find Doctors</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Video Consult</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Surgeries</a>
            </nav>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-800 text-white px-2 py-1 rounded text-xs font-medium">NEW</span>
                <span className="text-gray-700 hover:text-blue-600 cursor-pointer">For Corporates</span>
              </div>
              <span className="text-gray-700 hover:text-blue-600 cursor-pointer">For Providers</span>
              <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Security & help</span>
              <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Login / Signup</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        {/* Background Illustrations - More detailed */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Left side medical icons */}
          <div className="absolute top-32 left-16 w-20 h-20 opacity-20">
            <div className="w-full h-full bg-blue-300 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="absolute top-48 left-8 w-16 h-16 opacity-15">
            <div className="w-full h-full bg-yellow-300 rounded-lg rotate-12"></div>
          </div>
          
          {/* Right side illustrations */}
          <div className="absolute top-20 right-20 w-24 h-24 opacity-25">
            <div className="w-full h-full bg-blue-400 rounded-full"></div>
          </div>
          <div className="absolute top-40 right-32 w-12 h-12 opacity-20">
            <div className="w-full h-full bg-yellow-400 rounded-full"></div>
          </div>
          
          {/* Bottom decorative elements */}
          <div className="absolute bottom-20 left-1/4 w-20 h-20 opacity-15">
            <div className="w-full h-full bg-blue-300 rounded-full"></div>
          </div>
          <div className="absolute bottom-32 right-1/4 w-16 h-16 opacity-20">
            <div className="w-full h-full bg-yellow-300 rounded-lg rotate-45"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12 leading-tight">
              Your home for health
            </h1>
            
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl text-white mb-8 font-medium">
                Find and Book
              </h2>
              
              {/* Search Form - Exact match to screenshot */}
              <div className="bg-white rounded-lg shadow-xl p-2 flex flex-col md:flex-row gap-2 max-w-4xl mx-auto">
                <div className="flex items-center flex-1 px-4 py-3 border-r border-gray-200">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1 outline-none text-gray-700 placeholder-gray-500"
                    placeholder="Bangalore"
                  />
                </div>
                <div className="flex items-center flex-1 px-4 py-3">
                  <Search className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1 outline-none text-gray-700 placeholder-gray-500"
                    placeholder="Search doctors, clinics, hospitals, etc."
                  />
                </div>
                <Button 
                  onClick={() => handleSearch()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mb-16">
              <p className="text-white text-lg mb-6 font-medium">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-4">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-full transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Services Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="text-center p-6 hover:bg-gray-50 rounded-xl transition-all duration-200 cursor-pointer group hover:shadow-lg"
              >
                <div className="relative inline-block mb-4">
                  <service.icon className="w-10 h-10 text-blue-600 group-hover:text-blue-700 transition-colors duration-200 mx-auto" />
                  {service.badge && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      {service.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-gray-800 font-semibold mb-2 text-sm leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
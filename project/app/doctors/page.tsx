'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Search, ChevronDown, Calendar, Phone, CheckCircle } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  location: string;
  consultationFee: number;
  rating: number;
  patientStories: number;
  image: string;
  clinic: string;
  availableToday: boolean;
  type: 'doctor' | 'clinic';
  additionalClinics?: number;
}

function DoctorsContent() {
  const searchParams = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    gender: '',
    patientStories: '',
    experience: '',
    sortBy: 'relevance'
  });
  
  const specialty = searchParams.get('specialty') || '';
  const location = searchParams.get('location') || '';

  useEffect(() => {
    fetchDoctors();
  }, [specialty, location, filters]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        specialty,
        location,
        ...filters
      });
      
      const response = await fetch(`/api/doctors?${queryParams}`);
      const data = await response.json();
      setDoctors(data.doctors || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">•practo•</div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-blue-600 hover:text-blue-700 px-3 py-2 text-sm font-medium border-b-2 border-blue-600">Find Doctors</a>
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

      {/* Search Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-4 max-w-4xl">
            <div className="flex items-center flex-1 border border-gray-300 rounded-lg px-4 py-3 bg-gray-50">
              <MapPin className="w-4 h-4 text-gray-500 mr-3" />
              <span className="text-gray-700 font-medium">{location}</span>
            </div>
            <div className="flex items-center flex-1 border border-gray-300 rounded-lg px-4 py-3 bg-gray-50">
              <Search className="w-4 h-4 text-gray-500 mr-3" />
              <span className="text-gray-700 font-medium">{specialty}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar - Exact match to screenshot */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-6 items-center">
              <Select onValueChange={(value) => updateFilter('gender', value)}>
                <SelectTrigger className="w-32 bg-transparent border-white/30 text-white hover:bg-white/10">
                  <SelectValue placeholder="Gender" />
                  <ChevronDown className="w-4 h-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="any">Any</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => updateFilter('patientStories', value)}>
                <SelectTrigger className="w-40 bg-transparent border-white/30 text-white hover:bg-white/10">
                  <SelectValue placeholder="Patient Stories" />
                  <ChevronDown className="w-4 h-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High (1000+)</SelectItem>
                  <SelectItem value="medium">Medium (500+)</SelectItem>
                  <SelectItem value="low">Low (100+)</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => updateFilter('experience', value)}>
                <SelectTrigger className="w-32 bg-transparent border-white/30 text-white hover:bg-white/10">
                  <SelectValue placeholder="Experience" />
                  <ChevronDown className="w-4 h-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="senior">20+ years</SelectItem>
                  <SelectItem value="experienced">10+ years</SelectItem>
                  <SelectItem value="junior">5+ years</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => updateFilter('sortBy', value)}>
                <SelectTrigger className="w-32 bg-transparent border-white/30 text-white hover:bg-white/10">
                  <SelectValue placeholder="All Filters" />
                  <ChevronDown className="w-4 h-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="fees">Fees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">Sort By</span>
              <Select onValueChange={(value) => updateFilter('sortBy', value)} defaultValue="relevance">
                <SelectTrigger className="w-32 bg-transparent border-white/30 text-white hover:bg-white/10">
                  <SelectValue />
                  <ChevronDown className="w-4 h-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="fees">Fees</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            {doctors.length} {specialty}s available in {location.split(',')[0]}
          </h1>
          <div className="flex items-center text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <span className="text-sm">Book appointments with minimum wait-time & verified doctor details</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading doctors...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Doctor Image */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-24 h-24 rounded-lg object-cover border border-gray-200"
                      />
                      {doctor.type === 'clinic' && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
                          AD
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer mb-2">
                          {doctor.name}
                        </h3>
                        <p className="text-gray-700 mb-2 font-medium">{doctor.specialty}</p>
                        <p className="text-gray-600 mb-3">{doctor.experience} years experience overall</p>
                        
                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="font-medium">{doctor.location}</span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-blue-600 hover:underline cursor-pointer">{doctor.clinic}</span>
                          {doctor.additionalClinics && (
                            <>
                              <span className="mx-2 text-gray-400">•</span>
                              <span className="text-gray-600">+ {doctor.additionalClinics} more</span>
                            </>
                          )}
                        </div>
                        
                        <p className="text-gray-900 font-semibold mb-4 text-lg">
                          ₹{doctor.consultationFee} {doctor.type === 'doctor' ? 'Consultation fee at clinic' : 'Consultation Fees'}
                        </p>
                        
                        <div className="flex items-center space-x-4">
                          <div className="bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold flex items-center">
                            👍 {doctor.rating}%
                          </div>
                          <span className="text-gray-600 underline cursor-pointer hover:text-blue-600">
                            {doctor.patientStories} Patient Stories
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col space-y-3 lg:ml-8 mt-6 lg:mt-0 lg:w-48">
                        {doctor.availableToday && (
                          <div className="flex items-center text-green-600 text-sm font-semibold mb-2">
                            <Calendar className="w-4 h-4 mr-2" />
                            Available Today
                          </div>
                        )}
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-sm w-full">
                          Book Clinic Visit
                          {doctor.type === 'doctor' && (
                            <div className="text-xs font-normal mt-1">No Booking Fee</div>
                          )}
                        </Button>
                        <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold text-sm w-full">
                          <Phone className="w-4 h-4 mr-2" />
                          Contact Clinic
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DoctorsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <DoctorsContent />
    </Suspense>
  );
}
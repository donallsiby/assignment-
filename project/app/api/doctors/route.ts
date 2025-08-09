import { NextRequest, NextResponse } from 'next/server';

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
  gender: 'male' | 'female';
  additionalClinics?: number;
}

// Enhanced mock data matching the screenshots exactly
const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Aesthetic Heart Dermatology & Cardiology Clinic',
    specialty: 'Dermatologist',
    experience: 12,
    location: 'Jayanagar',
    consultationFee: 800,
    rating: 97,
    patientStories: 159,
    image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
    clinic: '1 Dermatologist',
    availableToday: false,
    type: 'clinic',
    gender: 'male'
  },
  {
    id: 2,
    name: 'Dr. Sheelavathi Natraj',
    specialty: 'Dermatologist',
    experience: 21,
    location: 'JP Nagar, Bangalore',
    consultationFee: 800,
    rating: 94,
    patientStories: 1506,
    image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    clinic: 'Sapphire Skin And Aesthetics Clinic',
    availableToday: true,
    type: 'doctor',
    gender: 'female',
    additionalClinics: 1
  },
  {
    id: 3,
    name: 'Dr. Rajesh Kumar',
    specialty: 'Dermatologist',
    experience: 15,
    location: 'Koramangala, Bangalore',
    consultationFee: 1000,
    rating: 92,
    patientStories: 892,
    image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
    clinic: 'Skin Care Center',
    availableToday: true,
    type: 'doctor',
    gender: 'male',
    additionalClinics: 2
  },
  {
    id: 4,
    name: 'Dr. Priya Sharma',
    specialty: 'Dermatologist',
    experience: 18,
    location: 'Indiranagar, Bangalore',
    consultationFee: 1200,
    rating: 96,
    patientStories: 2103,
    image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400',
    clinic: 'Advanced Dermatology Clinic',
    availableToday: false,
    type: 'doctor',
    gender: 'female',
    additionalClinics: 1
  },
  {
    id: 5,
    name: 'Dr. Arun Patel',
    specialty: 'Dermatologist',
    experience: 8,
    location: 'Whitefield, Bangalore',
    consultationFee: 600,
    rating: 89,
    patientStories: 456,
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
    clinic: 'City Skin Clinic',
    availableToday: true,
    type: 'doctor',
    gender: 'male'
  },
  {
    id: 6,
    name: 'Dr. Meera Singh',
    specialty: 'Pediatrician',
    experience: 12,
    location: 'Hebbal, Bangalore',
    consultationFee: 800,
    rating: 95,
    patientStories: 1234,
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    clinic: 'Children Care Hospital',
    availableToday: true,
    type: 'doctor',
    gender: 'female',
    additionalClinics: 1
  },
  {
    id: 7,
    name: 'Dr. Suresh Reddy',
    specialty: 'Gynecologist/Obstetrician',
    experience: 25,
    location: 'Banashankari, Bangalore',
    consultationFee: 1500,
    rating: 98,
    patientStories: 3456,
    image: 'https://images.pexels.com/photos/6749825/pexels-photo-6749825.jpeg?auto=compress&cs=tinysrgb&w=400',
    clinic: 'Women Care Center',
    availableToday: false,
    type: 'doctor',
    gender: 'male',
    additionalClinics: 3
  },
  {
    id: 8,
    name: 'Dr. Kavitha Reddy',
    specialty: 'Gynecologist/Obstetrician',
    experience: 16,
    location: 'Electronic City, Bangalore',
    consultationFee: 1200,
    rating: 93,
    patientStories: 1876,
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
    clinic: 'Motherhood Hospital',
    availableToday: true,
    type: 'doctor',
    gender: 'female',
    additionalClinics: 2
  },
  {
    id: 9,
    name: 'Dr. Ramesh Gupta',
    specialty: 'Pediatrician',
    experience: 20,
    location: 'Marathahalli, Bangalore',
    consultationFee: 900,
    rating: 91,
    patientStories: 2234,
    image: 'https://images.pexels.com/photos/6749562/pexels-photo-6749562.jpeg?auto=compress&cs=tinysrgb&w=400',
    clinic: 'Rainbow Children Hospital',
    availableToday: true,
    type: 'doctor',
    gender: 'male',
    additionalClinics: 1
  },
  {
    id: 10,
    name: 'Dr. Sunita Joshi',
    specialty: 'Dermatologist',
    experience: 14,
    location: 'HSR Layout, Bangalore',
    consultationFee: 1100,
    rating: 95,
    patientStories: 1567,
    image: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=400',
    clinic: 'Glow Skin Clinic',
    availableToday: false,
    type: 'doctor',
    gender: 'female',
    additionalClinics: 1
  }
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const specialty = searchParams.get('specialty') || '';
  const location = searchParams.get('location') || '';
  const gender = searchParams.get('gender') || '';
  const experience = searchParams.get('experience') || '';
  const patientStories = searchParams.get('patientStories') || '';
  const sortBy = searchParams.get('sortBy') || 'relevance';

  let filteredDoctors = [...mockDoctors];

  // Filter by specialty
  if (specialty && specialty.toLowerCase() !== 'other') {
    filteredDoctors = filteredDoctors.filter(doctor => 
      doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
    );
  }

  // Filter by location (loose matching for Bangalore area)
  if (location) {
    filteredDoctors = filteredDoctors.filter(doctor => 
      doctor.location.toLowerCase().includes(location.toLowerCase()) ||
      location.toLowerCase().includes('bangalore') ||
      doctor.location.toLowerCase().includes('bangalore')
    );
  }

  // Filter by gender
  if (gender && gender !== 'any') {
    filteredDoctors = filteredDoctors.filter(doctor => doctor.gender === gender);
  }

  // Filter by experience
  if (experience) {
    switch (experience) {
      case 'senior':
        filteredDoctors = filteredDoctors.filter(doctor => doctor.experience >= 20);
        break;
      case 'experienced':
        filteredDoctors = filteredDoctors.filter(doctor => doctor.experience >= 10);
        break;
      case 'junior':
        filteredDoctors = filteredDoctors.filter(doctor => doctor.experience >= 5);
        break;
    }
  }

  // Filter by patient stories
  if (patientStories) {
    switch (patientStories) {
      case 'high':
        filteredDoctors = filteredDoctors.filter(doctor => doctor.patientStories >= 1000);
        break;
      case 'medium':
        filteredDoctors = filteredDoctors.filter(doctor => doctor.patientStories >= 500);
        break;
      case 'low':
        filteredDoctors = filteredDoctors.filter(doctor => doctor.patientStories >= 100);
        break;
    }
  }

  // Sort doctors
  switch (sortBy) {
    case 'rating':
      filteredDoctors.sort((a, b) => b.rating - a.rating);
      break;
    case 'experience':
      filteredDoctors.sort((a, b) => b.experience - a.experience);
      break;
    case 'fees':
      filteredDoctors.sort((a, b) => a.consultationFee - b.consultationFee);
      break;
    default:
      // Keep default order for relevance (clinics first, then by rating)
      filteredDoctors.sort((a, b) => {
        if (a.type === 'clinic' && b.type === 'doctor') return -1;
        if (a.type === 'doctor' && b.type === 'clinic') return 1;
        return b.rating - a.rating;
      });
      break;
  }

  // Simulate API delay for realistic experience
  await new Promise(resolve => setTimeout(resolve, 300));

  return NextResponse.json({
    doctors: filteredDoctors,
    total: filteredDoctors.length,
    filters: {
      specialty,
      location,
      gender,
      experience,
      patientStories,
      sortBy
    }
  });
}
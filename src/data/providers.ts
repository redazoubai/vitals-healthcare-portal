export interface Provider {
  id: string;
  name: string;
  specialty: string;
  category: "gp" | "specialist";
  rating: number;
  experience: string;
  availability: string;
  avatar: string;
}

export const providers: Provider[] = [
  { id: "1", name: "Dr. Sarah Mitchell", specialty: "General Practitioner", category: "gp", rating: 4.9, experience: "15 years", availability: "Available today", avatar: "SM" },
  { id: "2", name: "Dr. James Chen", specialty: "Cardiologist", category: "specialist", rating: 4.8, experience: "20 years", availability: "Next available: Tomorrow", avatar: "JC" },
  { id: "3", name: "Dr. Emily Rodriguez", specialty: "Dermatologist", category: "specialist", rating: 4.7, experience: "12 years", availability: "Available today", avatar: "ER" },
  { id: "4", name: "Dr. Michael Thompson", specialty: "General Practitioner", category: "gp", rating: 4.9, experience: "18 years", availability: "Available today", avatar: "MT" },
  { id: "5", name: "Dr. Aisha Patel", specialty: "Neurologist", category: "specialist", rating: 4.8, experience: "14 years", availability: "Next available: Wed", avatar: "AP" },
  { id: "6", name: "Dr. Robert Kim", specialty: "Orthopedic Surgeon", category: "specialist", rating: 4.9, experience: "22 years", availability: "Next available: Thu", avatar: "RK" },
  { id: "7", name: "Dr. Lisa Wang", specialty: "Pediatrician", category: "specialist", rating: 4.7, experience: "10 years", availability: "Available today", avatar: "LW" },
  { id: "8", name: "Dr. David Brown", specialty: "General Practitioner", category: "gp", rating: 4.6, experience: "8 years", availability: "Available today", avatar: "DB" },
  { id: "9", name: "Dr. Maria Garcia", specialty: "Endocrinologist", category: "specialist", rating: 4.8, experience: "16 years", availability: "Next available: Fri", avatar: "MG" },
  { id: "10", name: "Dr. Andrew Wilson", specialty: "Ophthalmologist", category: "specialist", rating: 4.9, experience: "19 years", availability: "Next available: Mon", avatar: "AW" },
];

export const specialties = [...new Set(providers.map((p) => p.specialty))];

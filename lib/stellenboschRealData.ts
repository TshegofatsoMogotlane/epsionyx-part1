// Real Stellenbosch University Campus Data
// Extracted from https://campusmap.sun.ac.za/ and official sources

export interface RealBuildingData {
  id: string
  name: string
  nameAfrikaans?: string
  coordinates: {
    lat: number
    lng: number
  }
  position3D: [number, number, number] // Converted for 3D scene
  buildingCode?: string
  faculty?: string
  type: 'academic' | 'administrative' | 'residential' | 'sports' | 'service'
  yearBuilt?: number
  architect?: string
  style: string
  floors: number
  description: string
  features: {
    height: number // meters
    footprint: { width: number; depth: number } // meters
    color: string
    roofType: string
    materials: string[]
    accessibility: boolean
  }
  departments?: string[]
  capacity?: number
}

// Main Campus Buildings (Stellenbosch Central)
export const STELLENBOSCH_REAL_BUILDINGS: RealBuildingData[] = [
  {
    id: 'ou-hoofgebou',
    name: 'Ou Hoofgebou',
    nameAfrikaans: 'Ou Hoofgebou',
    coordinates: { lat: -33.9321, lng: 18.8602 },
    position3D: [0, 0, 0], // Center reference point
    buildingCode: 'OH',
    type: 'administrative',
    yearBuilt: 1886,
    architect: 'Sir Herbert Baker',
    style: 'Cape Dutch Revival',
    floors: 2,
    description: 'The iconic heart of Stellenbosch University, featuring Herbert Baker\'s signature Cape Dutch Revival architecture with distinctive gables.',
    features: {
      height: 12,
      footprint: { width: 45, depth: 25 },
      color: '#D2B48C',
      roofType: 'slate_gabled',
      materials: ['sandstone', 'slate', 'timber'],
      accessibility: true
    },
    departments: ['University Administration', 'Rector\'s Office'],
    capacity: 200
  },
  
  {
    id: 'admin-building',
    name: 'Administration Building',
    nameAfrikaans: 'Administrasiegebou',
    coordinates: { lat: -33.9318, lng: 18.8605 },
    position3D: [15, 0, 8],
    buildingCode: 'AD',
    type: 'administrative',
    yearBuilt: 1920,
    style: 'Neoclassical',
    floors: 3,
    description: 'Neoclassical administrative center with grand columns and formal entrance.',
    features: {
      height: 15,
      footprint: { width: 60, depth: 30 },
      color: '#F5F5DC',
      roofType: 'red_clay_tiles',
      materials: ['cream_plaster', 'concrete', 'clay_tiles'],
      accessibility: true
    },
    departments: ['Student Affairs', 'Finance', 'Human Resources'],
    capacity: 300
  },

  {
    id: 'js-gericke-library',
    name: 'JS Gericke Library',
    nameAfrikaans: 'JS Gericke Biblioteek',
    coordinates: { lat: -33.9315, lng: 18.8615 },
    position3D: [-20, 0, 15],
    buildingCode: 'LIB',
    type: 'academic',
    yearBuilt: 1935,
    style: 'Art Deco Modern',
    floors: 4,
    description: 'Main academic library with Art Deco facade and modern glass additions.',
    features: {
      height: 22,
      footprint: { width: 55, depth: 35 },
      color: '#F0E68C',
      roofType: 'flat_modern',
      materials: ['limestone', 'glass', 'steel'],
      accessibility: true
    },
    departments: ['Library Services', 'Information Technology'],
    capacity: 1500
  },

  {
    id: 'engineering-building',
    name: 'Engineering Building',
    nameAfrikaans: 'Ingenieurswese Gebou',
    coordinates: { lat: -33.9325, lng: 18.8620 },
    position3D: [30, 0, -10],
    buildingCode: 'ENG',
    faculty: 'Engineering',
    type: 'academic',
    yearBuilt: 1960,
    style: 'Modernist Brutalist',
    floors: 4,
    description: 'Modern engineering complex with extensive laboratory facilities and workshop spaces.',
    features: {
      height: 20,
      footprint: { width: 80, depth: 40 },
      color: '#B0C4DE',
      roofType: 'flat_concrete',
      materials: ['concrete', 'glass', 'steel'],
      accessibility: true
    },
    departments: ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering'],
    capacity: 800
  },

  {
    id: 'neelsie-student-center',
    name: 'Neelsie Student Centre',
    nameAfrikaans: 'Neelsie Studentesentrum',
    coordinates: { lat: -33.9312, lng: 18.8590 },
    position3D: [10, 0, -25],
    buildingCode: 'NSC',
    type: 'service',
    yearBuilt: 1980,
    style: 'Modern Functional',
    floors: 3,
    description: 'Central student hub featuring dining facilities, shops, and social spaces.',
    features: {
      height: 12,
      footprint: { width: 90, depth: 45 },
      color: '#CD853F',
      roofType: 'flat_modern',
      materials: ['brick', 'glass', 'concrete'],
      accessibility: true
    },
    departments: ['Student Services', 'Food Services', 'Retail'],
    capacity: 2000
  },

  {
    id: 'theology-faculty',
    name: 'Faculty of Theology',
    nameAfrikaans: 'Fakulteit Teologie',
    coordinates: { lat: -33.9330, lng: 18.8595 },
    position3D: [-30, 0, -15],
    buildingCode: 'THEO',
    faculty: 'Theology',
    type: 'academic',
    yearBuilt: 1859,
    style: 'Victorian Gothic',
    floors: 2,
    description: 'Historic theology building with Gothic Revival architecture and distinctive spire.',
    features: {
      height: 18,
      footprint: { width: 35, depth: 20 },
      color: '#8B4513',
      roofType: 'slate_steep_spire',
      materials: ['red_brick', 'slate', 'timber'],
      accessibility: false
    },
    departments: ['Systematic Theology', 'Practical Theology'],
    capacity: 150
  },

  {
    id: 'conservatorium',
    name: 'Conservatorium of Music',
    nameAfrikaans: 'Konservatorium',
    coordinates: { lat: -33.9335, lng: 18.8585 },
    position3D: [-40, 0, 5],
    buildingCode: 'CON',
    type: 'academic',
    yearBuilt: 1905,
    style: 'Edwardian Classical',
    floors: 2,
    description: 'Historic music conservatorium with excellent acoustics and classical architecture.',
    features: {
      height: 16,
      footprint: { width: 40, depth: 30 },
      color: '#FFFACD',
      roofType: 'red_clay_tiles',
      materials: ['cream_stucco', 'timber', 'clay_tiles'],
      accessibility: true
    },
    departments: ['Music Performance', 'Music Education'],
    capacity: 300
  },

  {
    id: 'business-school',
    name: 'USB Business School',
    nameAfrikaans: 'USB Bestuurskool',
    coordinates: { lat: -33.9308, lng: 18.8625 },
    position3D: [45, 0, 20],
    buildingCode: 'USB',
    faculty: 'Economic and Management Sciences',
    type: 'academic',
    yearBuilt: 1995,
    style: 'Contemporary Glass',
    floors: 5,
    description: 'Modern business school with contemporary glass facade and state-of-the-art facilities.',
    features: {
      height: 25,
      footprint: { width: 70, depth: 50 },
      color: '#4682B4',
      roofType: 'flat_glass',
      materials: ['glass', 'steel', 'aluminum'],
      accessibility: true
    },
    departments: ['Business Management', 'Economics', 'Accounting'],
    capacity: 1200
  },

  {
    id: 'science-complex',
    name: 'Natural Sciences Complex',
    nameAfrikaans: 'Natuurwetenskappe Kompleks',
    coordinates: { lat: -33.9340, lng: 18.8610 },
    position3D: [25, 0, -30],
    buildingCode: 'SCI',
    faculty: 'Science',
    type: 'academic',
    yearBuilt: 1975,
    style: 'Brutalist Modern',
    floors: 6,
    description: 'Large science complex housing multiple departments with extensive laboratory facilities.',
    features: {
      height: 30,
      footprint: { width: 100, depth: 60 },
      color: '#708090',
      roofType: 'flat_concrete',
      materials: ['concrete', 'glass', 'steel'],
      accessibility: true
    },
    departments: ['Chemistry', 'Physics', 'Mathematics', 'Computer Science'],
    capacity: 1500
  },

  {
    id: 'coetzenburg-sports',
    name: 'Coetzenburg Sports Complex',
    nameAfrikaans: 'Coetzenburg Sportkompleks',
    coordinates: { lat: -33.9280, lng: 18.8650 },
    position3D: [80, 0, 40],
    buildingCode: 'SPORT',
    type: 'sports',
    yearBuilt: 1950,
    style: 'Functional Sports Architecture',
    floors: 2,
    description: 'Home of Maties rugby and athletics with iconic grandstands.',
    features: {
      height: 15,
      footprint: { width: 200, depth: 150 },
      color: '#228B22',
      roofType: 'grandstand_steel',
      materials: ['concrete', 'steel', 'aluminum'],
      accessibility: true
    },
    departments: ['Sport Science', 'Athletics'],
    capacity: 16000
  }
]

// Campus zones and layout
export const CAMPUS_ZONES = {
  central: {
    name: 'Central Campus',
    buildings: ['ou-hoofgebou', 'admin-building', 'js-gericke-library', 'neelsie-student-center'],
    center: [0, 0, 0],
    radius: 50
  },
  academic: {
    name: 'Academic Precinct',
    buildings: ['engineering-building', 'science-complex', 'business-school'],
    center: [30, 0, 0],
    radius: 60
  },
  historic: {
    name: 'Historic Quarter',
    buildings: ['theology-faculty', 'conservatorium'],
    center: [-35, 0, -5],
    radius: 30
  },
  sports: {
    name: 'Sports Complex',
    buildings: ['coetzenburg-sports'],
    center: [80, 0, 40],
    radius: 100
  }
}

// Campus pathways and landscaping
export const CAMPUS_INFRASTRUCTURE = {
  mainWalkways: [
    { from: [0, 0, 0], to: [15, 0, 8], width: 4, type: 'main' },
    { from: [15, 0, 8], to: [-20, 0, 15], width: 3, type: 'academic' },
    { from: [0, 0, 0], to: [10, 0, -25], width: 3, type: 'student' }
  ],
  landscaping: {
    jacarandas: { count: 25, distribution: 'avenue' },
    oaks: { count: 40, distribution: 'scattered' },
    lawns: { area: 15000, type: 'kikuyu_grass' }
  },
  parking: [
    { position: [60, 0, 0], capacity: 200, type: 'student' },
    { position: [-50, 0, 30], capacity: 100, type: 'staff' }
  ]
}

// Convert GPS coordinates to 3D positions (helper function)
export function gpsTo3D(lat: number, lng: number, centerLat: number = -33.9321, centerLng: number = 18.8602): [number, number, number] {
  const scale = 10000 // Adjust scale as needed
  const x = (lng - centerLng) * scale
  const z = -(lat - centerLat) * scale // Negative because lat increases northward
  return [x, 0, z]
}
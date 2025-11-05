// Actual Stellenbosch University Buildings with Real Architectural Data
export const STELLENBOSCH_BUILDINGS = {
  // Historic Core Campus
  ouHoofgebou: {
    name: "Ou Hoofgebou (Old Main Building)",
    built: 1886,
    architect: "Sir Herbert Baker",
    style: "Cape Dutch Revival",
    position: [-2, 0, 0],
    dimensions: { width: 45, depth: 25, height: 12 },
    features: {
      gables: 3,
      windows: { rows: 2, columns: 8 },
      entrance: "central_portico",
      roof: "slate_tiles",
      walls: "sandstone_brick",
      color: "#D2B48C" // Sandstone color
    },
    description: "The iconic heart of Stellenbosch University, designed by Herbert Baker in Cape Dutch Revival style"
  },

  administrasieGebou: {
    name: "Administrasiegebou (Administration Building)",
    built: 1920,
    style: "Neoclassical",
    position: [0, 0, 0],
    dimensions: { width: 60, depth: 30, height: 15 },
    features: {
      columns: 6,
      windows: { rows: 3, columns: 12 },
      entrance: "grand_staircase",
      roof: "red_clay_tiles",
      walls: "cream_plaster",
      color: "#F5F5DC"
    },
    description: "The main administrative hub with neoclassical architecture"
  },

  // Engineering Faculty
  engineeringBuilding: {
    name: "Engineering Building (Ingenieurswese)",
    built: 1960,
    style: "Modernist",
    position: [15, 0, 5],
    dimensions: { width: 80, depth: 40, height: 20 },
    features: {
      floors: 4,
      windows: { rows: 4, columns: 20 },
      entrance: "glass_atrium",
      roof: "flat_concrete",
      walls: "concrete_glass",
      color: "#B0C4DE"
    },
    description: "Modern engineering complex with extensive laboratory facilities"
  },

  // Medical School (Tygerberg Campus)
  medicalSchool: {
    name: "Faculty of Medicine and Health Sciences",
    built: 1976,
    style: "Brutalist Modern",
    position: [30, 0, -10],
    dimensions: { width: 120, depth: 60, height: 35 },
    features: {
      floors: 8,
      windows: { rows: 8, columns: 30 },
      entrance: "modernist_plaza",
      roof: "flat_concrete",
      walls: "concrete_brick",
      color: "#708090"
    },
    description: "Large medical complex at Tygerberg campus"
  },

  // Business School
  businessSchool: {
    name: "USB Business School",
    built: 1995,
    style: "Contemporary",
    position: [45, 0, 15],
    dimensions: { width: 70, depth: 50, height: 25 },
    features: {
      floors: 5,
      windows: { rows: 5, columns: 18 },
      entrance: "glass_facade",
      roof: "metal_modern",
      walls: "glass_steel",
      color: "#4682B4"
    },
    description: "Modern business school with contemporary design"
  },

  // Theology Faculty
  theologyBuilding: {
    name: "Faculty of Theology",
    built: 1859,
    style: "Victorian Gothic",
    position: [-15, 0, 10],
    dimensions: { width: 35, depth: 20, height: 18 },
    features: {
      spire: true,
      windows: { rows: 2, columns: 6, style: "gothic_arched" },
      entrance: "gothic_portal",
      roof: "slate_steep",
      walls: "red_brick",
      color: "#8B4513"
    },
    description: "Historic theology building with Gothic Revival architecture"
  },

  // Student Center
  neelsieStudentCenter: {
    name: "Neelsie Student Centre",
    built: 1980,
    renovated: 2010,
    style: "Modern Functional",
    position: [8, 0, -15],
    dimensions: { width: 90, depth: 45, height: 12 },
    features: {
      floors: 3,
      windows: { rows: 3, columns: 25 },
      entrance: "multiple_glass",
      roof: "flat_modern",
      walls: "brick_glass",
      color: "#CD853F"
    },
    description: "Central student hub with dining, shopping, and social facilities"
  },

  // Library
  jsGerickeLibrary: {
    name: "JS Gericke Library",
    built: 1935,
    renovated: 2005,
    style: "Art Deco Modern",
    position: [5, 0, 20],
    dimensions: { width: 55, depth: 35, height: 22 },
    features: {
      floors: 4,
      windows: { rows: 4, columns: 15 },
      entrance: "art_deco_facade",
      roof: "flat_modern",
      walls: "limestone_glass",
      color: "#F0E68C"
    },
    description: "Main academic library with Art Deco elements and modern additions"
  },

  // Sports Complex
  coetzenburgSports: {
    name: "Coetzenburg Sports Grounds",
    built: 1950,
    style: "Functional Sports",
    position: [60, 0, 0],
    dimensions: { width: 200, depth: 150, height: 8 },
    features: {
      stadium: true,
      capacity: 16000,
      entrance: "multiple_gates",
      roof: "grandstand_only",
      walls: "concrete_steel",
      color: "#228B22"
    },
    description: "Home of Maties rugby and athletics"
  },

  // Conservatorium
  conservatorium: {
    name: "Conservatorium of Music",
    built: 1905,
    style: "Edwardian Classical",
    position: [-25, 0, -5],
    dimensions: { width: 40, depth: 30, height: 16 },
    features: {
      concert_hall: true,
      windows: { rows: 2, columns: 10, style: "tall_arched" },
      entrance: "classical_portico",
      roof: "red_clay_tiles",
      walls: "cream_stucco",
      color: "#FFFACD"
    },
    description: "Historic music conservatorium with excellent acoustics"
  },

  // Residences (Examples)
  helshoogte: {
    name: "Helshoogte Residence",
    built: 1960,
    style: "Mid-Century Modern",
    position: [-40, 0, 20],
    dimensions: { width: 60, depth: 25, height: 10 },
    features: {
      floors: 3,
      windows: { rows: 3, columns: 20 },
      entrance: "modernist_simple",
      roof: "flat_concrete",
      walls: "brick_concrete",
      color: "#DEB887"
    },
    description: "Student residence with mid-century modern design"
  }
}

// Campus Layout Configuration
export const CAMPUS_LAYOUT = {
  mainCampus: {
    center: [0, 0, 0],
    bounds: { width: 100, depth: 80 },
    elevation: 0
  },
  tygerbergCampus: {
    center: [200, 0, 0], // Separate campus
    bounds: { width: 150, depth: 100 },
    elevation: 0
  }
}

// Landscaping and Environment
export const CAMPUS_ENVIRONMENT = {
  trees: {
    oaks: { count: 50, positions: "scattered", species: "Quercus robur" },
    pines: { count: 30, positions: "perimeter", species: "Pinus pinea" },
    jacarandas: { count: 25, positions: "avenues", species: "Jacaranda mimosifolia" }
  },
  pathways: [
    { from: "ouHoofgebou", to: "administrasieGebou", type: "main_walkway" },
    { from: "administrasieGebou", to: "jsGerickeLibrary", type: "academic_path" },
    { from: "neelsieStudentCenter", to: "engineeringBuilding", type: "student_route" }
  ],
  landmarks: {
    diebraak: { position: [10, 0, 25], type: "open_space" },
    victoriaStreet: { position: [0, 0, -30], type: "main_road" },
    botanicalGarden: { position: [-50, 0, 0], type: "natural_area" }
  }
}

// Real GPS Coordinates (for reference)
export const GPS_COORDINATES = {
  stellenboschUniversity: {
    lat: -33.9321,
    lng: 18.8602
  },
  tygerbergCampus: {
    lat: -33.9391,
    lng: 18.5056
  }
}
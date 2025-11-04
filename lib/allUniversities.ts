// Complete list of all 29 South African Universities with comprehensive data
export const ALL_SA_UNIVERSITIES = [
  // TRADITIONAL UNIVERSITIES (11)
  "University of Cape Town (UCT) - Western Cape, Cape Town - Medicine, Engineering, Business, Law",
  "University of Fort Hare (UFH) - Eastern Cape, Alice - Law, Education, Agriculture, Social Sciences", 
  "University of the Free State (UFS) - Free State, Bloemfontein - Agriculture, Medicine, Law, Education",
  "University of KwaZulu-Natal (UKZN) - KwaZulu-Natal, Durban - Medicine, Engineering, Agriculture, Law",
  "University of Limpopo (UL) - Limpopo, Polokwane - Health Sciences, Agriculture, Education, Law",
  "North-West University (NWU) - North West, Potchefstroom - Engineering, Education, Theology, Business",
  "University of Pretoria (UP) - Gauteng, Pretoria - Veterinary Science, Engineering, Medicine, Law",
  "Rhodes University (RU) - Eastern Cape, Makhanda - Journalism, Pharmacy, Law, Commerce",
  "Stellenbosch University (SU) - Western Cape, Stellenbosch - Wine Science, Agriculture, Engineering, Business",
  "University of the Western Cape (UWC) - Western Cape, Cape Town - Law, Dentistry, Social Work, Education",
  "University of the Witwatersrand (Wits) - Gauteng, Johannesburg - Mining Engineering, Medicine, Commerce, Engineering",

  // COMPREHENSIVE UNIVERSITIES (6)
  "University of Johannesburg (UJ) - Gauteng, Johannesburg - Engineering, Business, Arts, Education",
  "Nelson Mandela University (NMU) - Eastern Cape, Port Elizabeth - Business, Engineering, Health Sciences, Education",
  "University of South Africa (Unisa) - Gauteng, Pretoria - Business, Law, Education, Humanities (Distance Learning)",
  "University of Venda (Univen) - Limpopo, Thohoyandou - Agriculture, Health Sciences, Education, Management",
  "Walter Sisulu University (WSU) - Eastern Cape, Mthatha - Health Sciences, Education, Agriculture, Management",
  "University of Zululand (UniZulu) - KwaZulu-Natal, Richards Bay - Education, Arts, Commerce, Law",

  // UNIVERSITIES OF TECHNOLOGY (12)
  "Cape Peninsula University of Technology (CPUT) - Western Cape, Cape Town - Engineering, IT, Business, Applied Sciences",
  "Central University of Technology (CUT) - Free State, Bloemfontein - Engineering, IT, Management, Health Sciences",
  "Durban University of Technology (DUT) - KwaZulu-Natal, Durban - Engineering, IT, Management, Applied Sciences",
  "Mangosuthu University of Technology (MUT) - KwaZulu-Natal, Umlazi - Engineering, IT, Management, Natural Sciences",
  "University of Mpumalanga (UMP) - Mpumalanga, Nelspruit - Agriculture, Health Sciences, Education, Management",
  "Sol Plaatje University (SPU) - Northern Cape, Kimberley - Education, Humanities, Natural Sciences, Management",
  "Sefako Makgatho Health Sciences University (SMU) - Gauteng, Pretoria - Medicine, Dentistry, Pharmacy, Health Sciences",
  "Tshwane University of Technology (TUT) - Gauteng, Pretoria - Engineering, IT, Management, Arts",
  "Vaal University of Technology (VUT) - Gauteng, Vanderbijlpark - Engineering, IT, Management, Applied Sciences"
];

// Google Maps integration constants
export const GOOGLE_MAPS_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
  libraries: ['places', 'geometry', 'drawing'] as const,
  region: 'ZA',
  language: 'en'
};

// Weather API configuration
export const WEATHER_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
  baseUrl: 'https://api.openweathermap.org/data/2.5',
  units: 'metric'
};
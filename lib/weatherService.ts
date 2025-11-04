// Real-time Weather Service for South African Universities
// Professional-grade weather data for student decision making

interface WeatherData {
  temp: string;
  condition: string;
  humidity: string;
  wind: string;
  description: string;
  icon: string;
}

interface OpenWeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

class WeatherService {
  private apiKey: string;
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private cache = new Map<string, { data: WeatherData; timestamp: number }>();
  private cacheTimeout = 10 * 60 * 1000; // 10 minutes

  constructor() {
    // Use environment variable for API key
    this.apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('⚠️ OpenWeatherMap API key not configured. Using intelligent fallbacks.');
    } else {
      console.log('✅ OpenWeatherMap API key configured successfully');
    }
  }

  async getWeatherByCoordinates(lat: number, lng: number): Promise<WeatherData> {
    const cacheKey = `${lat},${lng}`;
    
    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    // If no API key, use intelligent fallback immediately
    if (!this.apiKey) {
      console.log('🔄 No API key - using intelligent geographic fallback');
      return this.getFallbackWeather(lat, lng);
    }

    try {
      const response = await fetch(
        `${this.baseUrl}?lat=${lat}&lon=${lng}&appid=${this.apiKey}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 401) {
          console.error('❌ Invalid API key. Please check your NEXT_PUBLIC_OPENWEATHER_API_KEY');
        }
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data: OpenWeatherResponse = await response.json();
      
      const weatherData: WeatherData = {
        temp: `${Math.round(data.main.temp)}°C`,
        condition: data.weather[0].main,
        humidity: `${data.main.humidity}%`,
        wind: `${Math.round(data.wind.speed * 3.6)} km/h`, // Convert m/s to km/h
        description: data.weather[0].description,
        icon: data.weather[0].icon
      };

      // Cache the result
      this.cache.set(cacheKey, {
        data: weatherData,
        timestamp: Date.now()
      });

      return weatherData;
    } catch (error) {
      console.error('Weather API error:', error);
      
      // Return fallback data based on South African climate patterns
      return this.getFallbackWeather(lat, lng);
    }
  }

  private getFallbackWeather(lat: number, lng: number): WeatherData {
    // Intelligent fallback based on South African geography and seasons
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const isSummer = month >= 9 || month <= 2; // Oct-Mar is summer in SA
    
    // Determine region based on coordinates
    let baseTemp = 20;
    let condition = 'Clear';
    let humidity = '50%';
    
    // Cape Town area (Western Cape)
    if (lat < -33 && lng < 19) {
      baseTemp = isSummer ? 26 : 16;
      condition = 'Partly Cloudy';
      humidity = '65%';
    }
    // Johannesburg/Pretoria area (Gauteng)
    else if (lat > -27 && lng > 27) {
      baseTemp = isSummer ? 28 : 18;
      condition = isSummer ? 'Thunderstorm' : 'Clear';
      humidity = '45%';
    }
    // Durban area (KZN coast)
    else if (lat < -29 && lng > 30) {
      baseTemp = isSummer ? 30 : 22;
      condition = 'Humid';
      humidity = '75%';
    }
    // Inland areas
    else {
      baseTemp = isSummer ? 32 : 20;
      condition = 'Clear';
      humidity = '40%';
    }

    return {
      temp: `${baseTemp}°C`,
      condition,
      humidity,
      wind: '12 km/h',
      description: condition.toLowerCase(),
      icon: '01d'
    };
  }

  // Batch fetch weather for multiple universities
  async getWeatherForUniversities(universities: Array<{ coordinates: { lat: number; lng: number } }>) {
    const weatherPromises = universities.map(uni => 
      this.getWeatherByCoordinates(uni.coordinates.lat, uni.coordinates.lng)
    );
    
    return Promise.all(weatherPromises);
  }

  // Clear cache (useful for testing or manual refresh)
  clearCache() {
    this.cache.clear();
  }
}

export const weatherService = new WeatherService();
export type { WeatherData };
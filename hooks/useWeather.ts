// Real-time Weather Hook for University Explorer
// Provides live weather data for informed student decisions

import { useState, useEffect } from 'react';
import { weatherService, WeatherData } from '@/lib/weatherService';

interface UseWeatherResult {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useWeather(lat: number, lng: number): UseWeatherResult {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const weatherData = await weatherService.getWeatherByCoordinates(lat, lng);
      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [lat, lng]);

  return {
    weather,
    loading,
    error,
    refresh: fetchWeather
  };
}

// Hook for multiple universities weather data
export function useUniversitiesWeather(universities: Array<{ coordinates: { lat: number; lng: number } }>) {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const allWeather = await weatherService.getWeatherForUniversities(universities);
      setWeatherData(allWeather);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (universities.length > 0) {
      fetchAllWeather();
    }
  }, [universities]);

  return {
    weatherData,
    loading,
    error,
    refresh: fetchAllWeather
  };
}
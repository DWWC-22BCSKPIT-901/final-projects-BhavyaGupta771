import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Wind, Droplets, ThermometerSun } from 'lucide-react';
import WeatherForecast from './WeatherForecast';
import PredictionAccuracy from './PredictionAccuracy';
import type { Prediction, ForecastData } from '../types';

export default function WeatherDashboard() {
  const [currentLocation, setCurrentLocation] = useState('New York, NY');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [forecast, setForecast] = useState<ForecastData[]>([]);

  useEffect(() => {
    // Simulate fetching historical predictions
    const mockPredictions: Prediction[] = Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      actual: {
        temperature: 20 + Math.random() * 10,
        humidity: 50 + Math.random() * 30,
        windSpeed: 5 + Math.random() * 15,
        precipitation: Math.random() * 100,
        condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)]
      },
      predicted: {
        temperature: 20 + Math.random() * 10,
        humidity: 50 + Math.random() * 30,
        windSpeed: 5 + Math.random() * 15,
        precipitation: Math.random() * 100,
        condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)]
      },
      accuracy: 70 + Math.random() * 25
    }));
    setPredictions(mockPredictions);

    // Simulate fetching forecast data
    const mockForecast: ForecastData[] = Array.from({ length: 5 }, (_, i) => ({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      prediction: {
        temperature: 20 + Math.random() * 10,
        humidity: 50 + Math.random() * 30,
        windSpeed: 5 + Math.random() * 15,
        precipitation: Math.random() * 100,
        condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)]
      },
      confidence: 70 + Math.random() * 25
    }));
    setForecast(mockForecast);
  }, [currentLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="w-8 h-8 text-yellow-500" />
              <h1 className="text-2xl font-bold text-gray-900">AI Weather Prediction</h1>
            </div>
            <div className="relative">
              <input
                type="text"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter location..."
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <WeatherForecast forecast={forecast} />
          </div>
          <div>
            <PredictionAccuracy predictions={predictions} />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} AI Weather Prediction. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
import React from 'react';
import { Sun, Cloud, CloudRain, Wind, Droplets, ThermometerSun } from 'lucide-react';
import type { ForecastData } from '../types';

interface Props {
  forecast: ForecastData[];
}

export default function WeatherForecast({ forecast }: Props) {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">5-Day AI Forecast</h2>
      <div className="space-y-6">
        {forecast.map((day) => (
          <div key={day.date} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getWeatherIcon(day.prediction.condition)}
                <div>
                  <h3 className="font-medium">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</h3>
                  <p className="text-sm text-gray-500">{day.date}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">{Math.round(day.prediction.temperature)}°C</div>
                <div className="text-sm text-gray-500">{day.prediction.condition}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{Math.round(day.prediction.windSpeed)} km/h</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{Math.round(day.prediction.humidity)}%</span>
              </div>
              <div className="flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{Math.round(day.prediction.precipitation)}%</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-500">AI Confidence:</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${day.confidence}%` }}
                  />
                </div>
                <span className="font-medium">{Math.round(day.confidence)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
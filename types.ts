export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  condition: string;
}

export interface Prediction {
  date: string;
  actual: WeatherData;
  predicted: WeatherData;
  accuracy: number;
}

export interface ForecastData {
  date: string;
  prediction: WeatherData;
  confidence: number;
}
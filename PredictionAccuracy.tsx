import React from 'react';
import { LineChart, CheckCircle, XCircle } from 'lucide-react';
import type { Prediction } from '../types';

interface Props {
  predictions: Prediction[];
}

export default function PredictionAccuracy({ predictions }: Props) {
  const averageAccuracy = predictions.reduce((acc, curr) => acc + curr.accuracy, 0) / predictions.length;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <LineChart className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Prediction Accuracy</h2>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Overall Accuracy</span>
          <span className="font-semibold">{Math.round(averageAccuracy)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${averageAccuracy}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {predictions.map((prediction) => (
          <div key={prediction.date} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-medium">
                  {new Date(prediction.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  })}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {prediction.accuracy >= 80 ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span className="font-medium">{Math.round(prediction.accuracy)}%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm text-gray-500 mb-1">Predicted</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">Temperature</span>
                    <span className="text-sm font-medium">
                      {Math.round(prediction.predicted.temperature)}°C
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Condition</span>
                    <span className="text-sm font-medium">
                      {prediction.predicted.condition}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 mb-1">Actual</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">Temperature</span>
                    <span className="text-sm font-medium">
                      {Math.round(prediction.actual.temperature)}°C
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Condition</span>
                    <span className="text-sm font-medium">
                      {prediction.actual.condition}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
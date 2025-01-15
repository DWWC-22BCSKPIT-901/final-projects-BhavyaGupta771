import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import type { CalculatorResult } from '../types';

export default function LoanCalculator() {
  const [amount, setAmount] = useState<number>(10000);
  const [term, setTerm] = useState<number>(12);
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateLoan = () => {
    const interestRate = 0.089; // 8.9% APR
    const monthlyRate = interestRate / 12;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
      (Math.pow(1 + monthlyRate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - amount;

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      interestRate
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Loan Calculator</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Amount ($)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Term (months)
          </label>
          <input
            type="number"
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={calculateLoan}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 space-y-3 bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Payment:</span>
              <span className="font-semibold">${result.monthlyPayment.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Payment:</span>
              <span className="font-semibold">${result.totalPayment.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Interest:</span>
              <span className="font-semibold">${result.totalInterest.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Interest Rate:</span>
              <span className="font-semibold">{(result.interestRate * 100).toFixed(1)}% APR</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
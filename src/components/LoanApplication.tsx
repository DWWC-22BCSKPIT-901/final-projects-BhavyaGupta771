import React, { useState } from 'react';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';
import type { LoanApplication } from '../types';

export default function LoanApplicationForm() {
  const [formData, setFormData] = useState<LoanApplication>({
    fullName: '',
    email: '',
    phone: '',
    amount: 10000,
    purpose: '',
    employmentStatus: '',
    monthlyIncome: 0,
    creditScore: 700,
    term: 12
  });

  const [submitted, setSubmitted] = useState(false);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const checkEligibility = () => {
    // Simple eligibility check based on income and credit score
    const debtToIncomeRatio = (formData.amount / formData.term) / formData.monthlyIncome;
    const eligible = formData.creditScore >= 650 && debtToIncomeRatio <= 0.43;
    setIsEligible(eligible);
    return eligible;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eligible = checkEligibility();
    setSubmitted(true);
    
    if (eligible) {
      // In a real application, you would send this data to your backend
      console.log('Loan application submitted:', formData);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Loan Application</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Amount ($)
            </label>
            <input
              type="number"
              name="amount"
              required
              min="1000"
              max="100000"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Purpose
            </label>
            <select
              name="purpose"
              required
              value={formData.purpose}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select purpose</option>
              <option value="personal">Personal</option>
              <option value="business">Business</option>
              <option value="education">Education</option>
              <option value="debt-consolidation">Debt Consolidation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employment Status
            </label>
            <select
              name="employmentStatus"
              required
              value={formData.employmentStatus}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select status</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self-Employed</option>
              <option value="business-owner">Business Owner</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Income ($)
            </label>
            <input
              type="number"
              name="monthlyIncome"
              required
              min="0"
              value={formData.monthlyIncome}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Credit Score
            </label>
            <input
              type="number"
              name="creditScore"
              required
              min="300"
              max="850"
              value={formData.creditScore}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Term (months)
            </label>
            <select
              name="term"
              required
              value={formData.term}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="12">12 months</option>
              <option value="24">24 months</option>
              <option value="36">36 months</option>
              <option value="48">48 months</option>
              <option value="60">60 months</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit Application
        </button>
      </form>

      {submitted && (
        <div className={`mt-6 p-4 rounded-md ${isEligible ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex items-center gap-2">
            {isEligible ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800">
                  Congratulations! Your application has been submitted successfully.
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-800">
                  We're sorry, but you don't meet the eligibility criteria at this time.
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { useState } from 'react';

type MealOption = {
  id: string;
  name: string;
  votes: number;
  category: 'main' | 'side' | 'dessert';
};

type Constraint = {
  id: string;
  text: string;
  type: 'budget' | 'cooking' | 'ordering' | 'dietary';
};

export default function DinnerPlanner() {
  const [mealOptions, setMealOptions] = useState<MealOption[]>([
    { id: '1', name: 'Biryani', votes: 0, category: 'main' },
    { id: '2', name: 'Pizza', votes: 0, category: 'main' },
    { id: '3', name: 'Pasta', votes: 0, category: 'main' },
    { id: '4', name: 'Christmas Special Roast', votes: 0, category: 'main' },
  ]);

  const [constraints] = useState<Constraint[]>([
    { id: '1', text: 'Home food only', type: 'cooking' },
    { id: '2', text: 'No cooking', type: 'cooking' },
    { id: '3', text: 'Order online', type: 'ordering' },
    { id: '4', text: 'Budget concerns', type: 'budget' },
  ]);

  const [selectedConstraints, setSelectedConstraints] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>('');
  const [guestCount, setGuestCount] = useState<string>('');

  const handleVote = (id: string) => {
    setMealOptions(prev =>
      prev.map(option =>
        option.id === id ? { ...option, votes: option.votes + 1 } : option
      )
    );
  };

  const toggleConstraint = (id: string) => {
    setSelectedConstraints(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const topChoice = [...mealOptions].sort((a, b) => b.votes - a.votes)[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-green-50 to-red-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-red-800 mb-2">
            🎄 Christmas Dinner Planner
          </h1>
          <p className="text-gray-600">Organize your family dinner ideas</p>
        </div>

        {/* Guest Count & Budget */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Planning Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Guests
              </label>
              <input
                type="number"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                placeholder="e.g., 8"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget (optional)
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g., $200"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Constraints */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Constraints & Preferences</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {constraints.map(constraint => (
              <button
                key={constraint.id}
                onClick={() => toggleConstraint(constraint.id)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedConstraints.includes(constraint.id)
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">{constraint.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Meal Options Voting */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Vote for Main Dish</h2>
          <div className="space-y-3">
            {mealOptions.map(option => (
              <div
                key={option.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium text-gray-800">{option.name}</span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                    {option.votes} votes
                  </span>
                </div>
                <button
                  onClick={() => handleVote(option.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  👍 Vote
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        {topChoice && topChoice.votes > 0 && (
          <div className="bg-gradient-to-r from-red-600 to-green-600 rounded-lg shadow-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-3">🎉 Current Winner</h2>
            <p className="text-3xl font-bold mb-2">{topChoice.name}</p>
            <p className="text-lg opacity-90">
              Leading with {topChoice.votes} vote{topChoice.votes !== 1 ? 's' : ''}
            </p>
            {selectedConstraints.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/30">
                <p className="font-semibold mb-2">Active Constraints:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedConstraints.map(id => {
                    const constraint = constraints.find(c => c.id === id);
                    return (
                      <span key={id} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                        {constraint?.text}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}



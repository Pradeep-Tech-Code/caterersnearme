'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCaterers } from '../../utils/api';

export default function CaterersPage() {
  const [caterers, setCaterers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');

  useEffect(() => {
    async function fetchCaterers() {
      try {
        const data = await getCaterers();
        setCaterers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCaterers();
  }, []);

  const filtered = caterers.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (priceFilter === 'under500') return c.pricePerPlate < 500;
    if (priceFilter === '500to1000') return c.pricePerPlate >= 500 && c.pricePerPlate <= 1000;
    if (priceFilter === 'above1000') return c.pricePerPlate > 1000;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Caterers</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Back home
        </Link>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border rounded-md px-3 py-2 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded-md px-3 py-2 sm:w-48"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="under500">Under ₹500</option>
          <option value="500to1000">₹500 - ₹1000</option>
          <option value="above1000">Above ₹1000</option>
        </select>
      </div>

      {loading && <p className="text-gray-500">Loading caterers...</p>}
      
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md">
          <p>Failed to load caterers: {error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="text-gray-500">No caterers found.</p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((caterer) => (
            <div key={caterer.id} className="border rounded-lg p-5 bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-2">{caterer.name}</h3>
              <p className="text-gray-600 mb-2">{caterer.location}</p>
              
              <div className="mb-3">
                <span className="text-sm font-medium">Cuisines:</span>
                <p className="text-sm text-gray-600">{caterer.cuisines.join(', ')}</p>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <div>
                  <span className="text-sm font-medium">Rating: </span>
                  <span>{caterer.rating}/5</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold block">₹{caterer.pricePerPlate}</span>
                  <span className="text-xs text-gray-500">per plate</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

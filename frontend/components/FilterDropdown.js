'use client';
import { useState } from 'react';

export default function FilterDropdown({ departments = [], onFilter }) {
  const [selectedDept, setSelectedDept] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedDept(value);
    onFilter(value);
  };

  return (
    <div className="mb-4">
      <label className="mr-2 font-medium">Filter by Department:</label>
      <select
        value={selectedDept}
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-1 text-sm"
      >
        < option value="">All</option>
        {departments.map((dept) =>(
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
}

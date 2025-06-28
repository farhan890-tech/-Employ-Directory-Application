'use client';

import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';

const GET_EMPLOYEES = gql`
  query GetEmployees($department: String) {
    employees(department: $department) {
      _id
      name
      position
      department
    }
  }
`;

export default function EmployeeList() {
  const [selectedDept, setSelectedDept] = useState('All');

  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES, {
    variables: { department: selectedDept === 'All' ? null : selectedDept },
  });

  const handleFilterChange = (e) => {
    setSelectedDept(e.target.value);
    refetch({ department: e.target.value === 'All' ? null : e.target.value });
  };

  if (loading) return <p className="text-center mt-4">Loading employees...</p>;
  if (error) return <p className="text-center text-red-500">Error loading employees!</p>;

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="department" className="font-medium">Filter by Department:</label>
          <select
            id="department"
            value={selectedDept}
            onChange={handleFilterChange}
            className="border px-2 py-1 rounded"
          >
            <option value="All">All</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
          </select>
        </div>

        <Link href="/add">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Add New Employee
          </button>
        </Link>
      </div>

      {data.employees.length === 0 ? (
        <p className="text-center text-gray-500">No employees found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded shadow-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Position</th>
                <th className="py-2 px-4 border-b">Department</th>
              </tr>
            </thead>
            <tbody>
              {data.employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    <Link href={`/employee/${emp._id}`} className="text-blue-600 hover:underline">
                      {emp.name}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b">{emp.position}</td>
                  <td className="py-2 px-4 border-b">{emp.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

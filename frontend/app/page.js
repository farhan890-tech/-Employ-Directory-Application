'use client';
import { gql, useQuery } from '@apollo/client';
import EmployeeTable from '@/components/EmployeeTable';
import FilterDropdown from '@/components/FilterDropdown';
import Link from 'next/link';
import { useState } from 'react';




const GET_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      id
      name
      position
      department
    }
  }
`;


export default function HomePage() {
  const { data, loading, error } = useQuery(GET_EMPLOYEES);
  const [filter, setFilter] = useState('');

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading employees.</p>;

  const departments = [...new Set(data.getAllEmployees.map((e) => e.department))];

  const filteredEmployees = filter
    ? data.getAllEmployees.filter((e) => e.department === filter)
    : data.getAllEmployees;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        < FilterDropdown departments={departments} onFilter={setFilter} />
        <Link
          href="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Add New Employee
        </Link>
      </div>

      <EmployeeTable employees={filteredEmployees} />
    </main>
  );
}

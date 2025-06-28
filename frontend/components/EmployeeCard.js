'use client';
import Link from 'next/link';

export default function EmployeeCard({ employee }) {
  if (!employee || !employee.id) {
    return <div className="text-red-500">Invalid employee data</div>;
  }

  return (
    <Link href={`/employee/${employee.id}`}>
      <div className="border p-4 rounded-lg shadow hover:shadow-md hover:bg-gray-50 cursor-pointer transition-all">
        <h2 className="text-lg font-semibold text-blue-700">{employee.name}</h2>
        <p className="text-sm text-gray-600">{employee.position}</p>
        <p className="text-sm text-gray-500">{employee.department}</p>
      </div>
    </Link>
  );
}

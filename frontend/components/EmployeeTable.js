'use client';
import Link from 'next/link';

export default function EmployeeTable({ employees }) {
  if (!employees || employees.length === 0) {
    return (
      <p className="text-center text-gray-500">No employees found.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Position</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
          {employees.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">
                <Link
                  href={`/employee/${emp.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {emp.name}
                </Link>
              </td>
              <td className="px-6 py-4">{emp.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

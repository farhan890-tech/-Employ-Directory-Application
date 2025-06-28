'use client';
import { gql, useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';

const GET_EMPLOYEE_DETAILS = gql`
  query GetEmployeeDetails($id: ID!) {
    getEmployeeDetails(id: $id) {
      id
      name
      position
      department
      salary
    }
  }
`;

export default function EmployeeDetail() {
  const router = useRouter();
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { id },
  });

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const emp = data?.getEmployeeDetails;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>

      <p><strong>Name:</strong> {emp.name}</p>
      <p><strong>Position:</strong> {emp.position}</p>
      <p><strong>Department:</strong> {emp.department}</p>
      <p><strong>Salary:</strong> ₹{emp.salary}</p>

      <button
        onClick={() => router.push('/')}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ← Back to Home
      </button>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_EMPLOYEE = gql`
  mutation AddEmployee($input: EmployeeInput!) {
    addEmployee(input: $input) {
      id
      name
      position
      department
      salary
    }
  }
`;

export default function AddEmployeeForm({ refetchEmployees }) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    salary: '',
  });

  const [addEmployee, { loading, error }] = useMutation(ADD_EMPLOYEE, {
    onCompleted: () => {
      if (refetchEmployees) refetchEmployees();
      setFormData({ name: '', position: '', department: '', salary: '' });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addEmployee({
      variables: {
        input: {
          name: formData.name,
          position: formData.position,
          department: formData.department,
          salary: parseFloat(formData.salary),
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="position"
        value={formData.position}
        onChange={handleChange}
        placeholder="Position"
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="Department"
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
        placeholder="Salary"
        required
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? 'Adding...' : 'Add Employee'}
      </button>
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </form>
  );
}

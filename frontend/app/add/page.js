// app/add/page.js
'use client'; // or make sure you're importing only client components

import AddEmployeeForm from '@/components/AddEmployeeForm';
import EmployeeList from '@/components/EmployeeList';
import EmployeeCard from '@/components/EmployeeCard';
import FilterDropdown from '@/components/FilterDropdown';
import React from 'react';

export default function AddPage() {
  return (
    <div className="p-4">
      <AddEmployeeForm />
        <EmployeeList />
              <EmployeeCard />
                    <FilterDropdown />
    </div>
  );
}

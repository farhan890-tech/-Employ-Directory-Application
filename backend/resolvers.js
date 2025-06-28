const { ObjectId } = require('mongodb');
const { getDB } = require('./db');

const resolvers = {
  Query: {
    // Return all employees with `id` mapped from `_id`
    getAllEmployees: async () => {
      const employees = await getDB()
        .collection('employees')
        .find({})
        .project({ name: 1, position: 1, department: 1 })
        .toArray();

      return employees.map(emp => ({
        id: emp._id.toString(),
        name: emp.name,
        position: emp.position,
        department: emp.department
      }));
    },

    // Return full employee details by id
    getEmployeeDetails: async (_, { id }) => {
      try {
        const emp = await getDB()
          .collection('employees')
          .findOne({ _id: new ObjectId(id) });

        if (!emp) throw new Error('Employee not found');

        return {
          id: emp._id.toString(),
          name: emp.name,
          position: emp.position,
          department: emp.department,
          salary: emp.salary
        };
      } catch (err) {
        throw new Error('Invalid ID');
      }
    },

    // Get employees by department
    getEmployeesByDepartment: async (_, { department }) => {
      const employees = await getDB()
        .collection('employees')
        .find({ department })
        .toArray();

      return employees.map(emp => ({
        id: emp._id.toString(),
        name: emp.name,
        position: emp.position,
        department: emp.department
      }));
    }
  },

  Mutation: {
    // Add new employee
    

    addEmployee: async (_, { name, position, department, salary }) => {
      const newEmployee = { name, position, department, salary };
      const result = await getDB().collection('employees').insertOne(newEmployee);

      return {
        id: result.insertedId.toString(),
        ...newEmployee
      };
    }
  }
};

module.exports = resolvers;

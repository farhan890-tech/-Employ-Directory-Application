import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    position: String!
    department: String!
    salary: Float!
  }

  type Department {
    id: ID!
    name: String!
    floor: String!
  }

  type Query {
    getAllEmployees: [Employee!]!
    getEmployeeDetails(id: ID!): Employee
    getEmployeesByDepartment(department: String!): [Employee!]!
    getDepartments: [Department!]!
  }

  type Mutation {
    addEmployee(name: String!, position: String!, department: String!, salary: Float!): Employee!
  }
`;

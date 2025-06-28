import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();

// Initialize express app
const app = express();

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DATABASE_NAME = process.env.DATABASE_NAME || 'employeeDB';

const client = new MongoClient(MONGO_URI);
await client.connect();
const db = client.db(DATABASE_NAME);
const employees = db.collection('employees');

// GraphQL Type Definitions
const typeDefs = `
  type Employee {
    id: ID!
    name: String!
    position: String!
    department: String!
    salary: Int!
  }

  input EmployeeInput {
    name: String!
    position: String!
    department: String!
    salary: Int!
  }

  type Query {
    getAllEmployees: [Employee!]!
    getEmployeeDetails(id: ID!): Employee
    getEmployeesByDepartment(department: String!): [Employee!]!
  }

  type Mutation {
    addEmployee(input: EmployeeInput!): Employee
  }
`;

// GraphQL Resolvers
const resolvers = {
  Query: {
    getAllEmployees: async () =>
      (await employees.find({}).toArray()).map(emp => ({
        ...emp,
        id: emp._id.toString(),
      })),
    getEmployeeDetails: async (_, { id }) => {
      const emp = await employees.findOne({ _id: new ObjectId(id) });
      return emp ? { ...emp, id: emp._id.toString() } : null;
    },
    getEmployeesByDepartment: async (_, { department }) =>
      (await employees.find({ department }).toArray()).map(emp => ({
        ...emp,
        id: emp._id.toString(),
      })),
  },
  Mutation: {
    addEmployee: async (_, { input }) => {
      const { name, position, department, salary } = input;
      const result = await employees.insertOne({ name, position, department, salary });
      return {
        id: result.insertedId.toString(),
        name,
        position,
        department,
        salary,
      };
    },
  },
};

// Start Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

// Apply middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/graphql', expressMiddleware(server));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});

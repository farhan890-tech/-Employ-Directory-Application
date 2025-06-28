require('dotenv').config();
const { MongoClient } = require('mongodb');

async function veed() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const db = client.db();

  const employees = [
    { name: 'Alice', position: 'Developer', department: 'Engineering', salary: 60000 },
    { name: 'Bob', position: 'Designer', department: 'Design', salary: 55000 },
    { name: 'Charlie', position: 'Manager', department: 'HR', salary: 70000 },
    { name: 'Diana', position: 'QA Engineer', department: 'Engineering', salary: 50000 },
    { name: 'Eve', position: 'Support', department: 'Customer Service', salary: 40000 },
  ];

  await db.collection('employees').deleteMany({});
  await db.collection('employees').insertMany(employees);
  console.log("Seeded successfully");
  client.close();
}

veed();
// This code connects to a MongoDB database using the MongoDB Node.js driver.
// It seeds the database with a predefined set of employee records. 
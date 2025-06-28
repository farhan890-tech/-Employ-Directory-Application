require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsAllowInvalidCertificates: true,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log(" Connected to MongoDB");

    const db = client.db("farhaaa");
    const collection = db.collection("mycollection");

    const result = await collection.insertOne({ name: "Test User" });
    console.log(" Inserted ID:", result.insertedId);

    await client.close();
    console.log(" Disconnected.");
  } catch (err) {
    console.error(" Connection failed:", err.message);
  }
}

connectToDatabase();

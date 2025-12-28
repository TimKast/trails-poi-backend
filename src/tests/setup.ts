import "dotenv/config";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: MongoMemoryServer;

export async function setup() {
  mongo = await MongoMemoryServer.create();
  process.env.test_db = mongo.getUri();
}

export async function teardown() {
  await mongo.stop();
}

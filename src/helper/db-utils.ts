import mongoose from "mongoose";

export async function connectMongo(connectionUri?: string) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(connectionUri ?? process.env.db!);
  const db = mongoose.connection;

  db.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("database disconnected");
  });

  db.once("open", function () {
    console.log(`database connected to ${db.name} on ${db.host}`);
  });
}

export async function disconnectMongo() {
  await mongoose.disconnect();
}

export async function clearMongoDb() {
  await mongoose.connection.db?.dropDatabase();
}

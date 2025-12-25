import "dotenv/config";
import Mongoose from "mongoose";

export async function connectMongo() {
  Mongoose.set("strictQuery", true);
  await Mongoose.connect(process.env.db!);
  const db = Mongoose.connection;

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
  await Mongoose.disconnect();
}

import "dotenv/config";
import { clearMongoDb, connectMongo, disconnectMongo } from "../helper/db-utils";
import { PoiSchema } from "../models/mongo/schemas/poi";
import { TrailSchema } from "../models/mongo/schemas/trail";
import { UserSchema } from "../models/mongo/schemas/user";
import { poiSeeds, trailSeeds, userSeeds } from "../models/mongo/seed-data";

async function seed() {
  try {
    await connectMongo();
    console.log("DB verbunden");

    await clearMongoDb();
    console.log("Datenbank geleert");

    for (const user of userSeeds) {
      await UserSchema.create({
        ...user,
      });
    }
    console.log("Users geseeded");

    for (const poi of poiSeeds) {
      await PoiSchema.create({
        ...poi,
        location: {
          type: "Point" as const,
          coordinates: poi.location.coordinates,
        },
      });
    }
    console.log("POIs geseeded");

    for (const trail of trailSeeds) {
      await TrailSchema.create({
        ...trail,
      });
    }
    console.log("Trails geseeded");

    console.log("Seed erfolgreich abgeschlossen");
  } catch (err) {
    console.error("Seed fehlgeschlagen:", err);
  } finally {
    await disconnectMongo();
  }
}

await seed();

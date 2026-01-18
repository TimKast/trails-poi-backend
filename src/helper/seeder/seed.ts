import "dotenv/config";
import { PoiSchema } from "../../models/mongo/schemas/poi";
import { TrailSchema } from "../../models/mongo/schemas/trail";
import { userMongoStore } from "../../models/mongo/stores/user-mongo-store";
import { clearMongoDb, connectMongo, disconnectMongo } from "../db-utils";
import { hutSeeds } from "./seed-data/huts";
import { lakeSeeds } from "./seed-data/lakes";
import { peakSeeds } from "./seed-data/peaks";
import { trailSeeds } from "./seed-data/trails";
import { userSeeds } from "./seed-data/users";

async function seed() {
  try {
    await connectMongo();
    console.log("DB verbunden");

    await clearMongoDb();
    console.log("Datenbank geleert");

    for (const user of userSeeds) {
      await userMongoStore.create(user);
    }
    console.log("Users geseeded");

    for (const poi of [...hutSeeds, ...peakSeeds, ...lakeSeeds]) {
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
        geometry: {
          type: "LineString" as const,
          coordinates: trail.geometry.coordinates,
        },
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

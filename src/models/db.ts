import { PoiStore, TrailStore, UserStore } from "../types/store-types";
import { connectMongo } from "./mongo/connect";
import { trailMongoStore } from "./mongo/trail-mongo-store";
import { userMongoStore } from "./mongo/user-mongo-store";

type Db = {
  userStore: UserStore | null;
  trailStore: TrailStore | null;
  poiStore: PoiStore | null;
};

export const db: Db = {
  userStore: null,
  trailStore: null,
  poiStore: null,
};

export async function initDb() {
  await connectMongo();
  db.userStore = userMongoStore;
  db.trailStore = trailMongoStore;
}

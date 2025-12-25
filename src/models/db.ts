import { TrailStore, UserStore } from "../types/store-types";
import { trailJsonStore } from "./json/trail-json-store";
import { userJsonStore } from "./json/user-json-store";
import { connectMongo } from "./mongo/connect";
import { trailMongoStore } from "./mongo/trail-mongo-store";
import { userMongoStore } from "./mongo/user-mongo-store";

type Db = {
  userStore: UserStore | null;
  trailStore: TrailStore | null;
};

export const db: Db = {
  userStore: null,
  trailStore: null,
};

export async function initDb(mode: string) {
  if (mode == "mongo") {
    await connectMongo();
    db.userStore = userMongoStore;
    db.trailStore = trailMongoStore;
  } else {
    db.userStore = userJsonStore;
    db.trailStore = trailJsonStore;
  }
}

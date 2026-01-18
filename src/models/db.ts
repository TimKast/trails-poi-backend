import { PoiStore, TrailStore, UserStore } from "../types/store-types";
import { poiMongoStore } from "./mongo/stores/poi-mongo-store";
import { trailMongoStore } from "./mongo/stores/trail-mongo-store";
import { userMongoStore } from "./mongo/stores/user-mongo-store";

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

export function initDb() {
  db.userStore = userMongoStore;
  db.trailStore = trailMongoStore;
  db.poiStore = poiMongoStore;
}

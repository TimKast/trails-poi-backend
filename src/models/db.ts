import { trailJsonStore } from "./json/trail-json-store";
import { userJsonStore } from "./json/user-json-store";

type Db = {
  userStore: typeof userJsonStore | null;
  trailStore: typeof trailJsonStore | null;
};

export const db: Db = {
  userStore: null,
  trailStore: null,
};

export function initDb() {
  db.userStore = userJsonStore;
  db.trailStore = trailJsonStore;
}

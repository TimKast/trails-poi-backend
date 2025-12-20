import { userJsonStore } from "./json/user-json-store";

type Db = {
  userStore: typeof userJsonStore | null;
  trailStore: any;
};

export const db: Db = {
  userStore: null,
  trailStore: null,
};

export function initDb() {
  db.userStore = userJsonStore;
}

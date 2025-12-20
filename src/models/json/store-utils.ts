// eslint-disable-next-line import/no-unresolved
import { JSONFilePreset } from "lowdb/node";
import type { Trail, User } from "../model-types";

type Database = {
  users: User[];
  trails: Trail[];
};

const db = await JSONFilePreset<Database>("src/models/json/db.json", {
  users: [],
  trails: [],
});

export default db;

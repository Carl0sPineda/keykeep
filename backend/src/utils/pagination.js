import Key from "../db/database.js";
import { decrypt } from "./crypto.js";

export const getPaginatedKeys = async ({ page = 1, pageSize = 10 }) => {
  const offset = (page - 1) * pageSize;

  const { count, rows: keys } = await Key.findAndCountAll({
    order: [["id", "DESC"]],
    limit: pageSize,
    offset: offset,
  });

  const totalPages = Math.ceil(count / pageSize);

  const keysWithOriginalPassword = keys.map((key) => ({
    id: key.id,
    username: key.username,
    website: key.website,
    password: decrypt(key.password),
  }));

  return { keys: keysWithOriginalPassword, totalPages };
};

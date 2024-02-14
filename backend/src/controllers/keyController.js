import db from "../db/database.js";
import { decrypt, encrypt } from "../utils/crypto.js";

export const getAllKeys = (req, res) => {
  db.all(
    "SELECT id, username, website, password FROM keys ORDER BY id DESC",
    (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const usersWithOriginalPassword = rows.map((row) => {
        const decryptedPassword = decrypt(row.password);
        return {
          id: row.id,
          username: row.username,
          website: row.website,
          password: decryptedPassword,
        };
      });

      res.json(usersWithOriginalPassword);
    }
  );
};

export const postKey = (req, res) => {
  const { username, website, password } = req.body;
  if (!username || !website || !password) {
    return res
      .status(400)
      .json({ error: "Username, website, and password are required" });
  }
  const encryptedPassword = encrypt(password);
  db.run(
    "INSERT INTO keys (username, website, password) VALUES (?, ?, ?)",
    [username, website, encryptedPassword],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
};

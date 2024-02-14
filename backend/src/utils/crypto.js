import crypto from "crypto";
import { IV, KEY, TYPE, ALGORITHM } from "./config.js";

const algorithm = ALGORITHM;
const key = Buffer.from(KEY, TYPE);
const iv = Buffer.from(IV, TYPE);

const decrypt = (encryptedPassword) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decryptedPassword = decipher.update(encryptedPassword, TYPE, "utf8");
  decryptedPassword += decipher.final("utf8");
  return decryptedPassword;
};

const encrypt = (password) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encryptedPassword = cipher.update(password, "utf8", TYPE);
  encryptedPassword += cipher.final(TYPE);
  return encryptedPassword;
};

export { decrypt, encrypt };

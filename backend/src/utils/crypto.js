import crypto from "crypto";

const algorithm = process.env.ALGORITHM;
const key = Buffer.from(process.env.key, process.env.TYPE);
const iv = Buffer.from(process.env.iv, process.env.TYPE);

const decrypt = (encryptedPassword) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decryptedPassword = decipher.update(
    encryptedPassword,
    process.env.TYPE,
    "utf8"
  );
  decryptedPassword += decipher.final("utf8");
  return decryptedPassword;
};

const encrypt = (password) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encryptedPassword = cipher.update(password, "utf8", process.env.TYPE);
  encryptedPassword += cipher.final(process.env.TYPE);
  return encryptedPassword;
};

export { decrypt, encrypt };

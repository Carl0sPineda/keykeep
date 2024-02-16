import Key from "../db/database.js";
import {
  errorHandler,
  notFoundHandler,
  successHandler,
} from "../middleware/errorHandlers.js";
import { decrypt, encrypt } from "../utils/crypto.js";
import generatePassword from "generate-password";

export const getAllKeys = async (req, res) => {
  try {
    const keys = await Key.findAll({ order: [["id", "DESC"]] });
    const keysWithOriginalPassword = keys.map((key) => ({
      id: key.id,
      username: key.username,
      website: key.website,
      password: decrypt(key.password),
    }));
    res.json(keysWithOriginalPassword);
  } catch (error) {
    errorHandler(res, error, "Internal Server Error");
  }
};

export const getKeyById = async (req, res) => {
  const { id } = req.params;
  try {
    const key = await Key.findByPk(id);
    if (!key) {
      return notFoundHandler(res, id);
    }
    res.json({
      id: key.id,
      username: key.username,
      website: key.website,
      password: decrypt(key.password),
    });
  } catch (error) {
    errorHandler(res, error, "Internal Server Error");
  }
};

export const postKey = async (req, res) => {
  const { username, website, password } = req.body;
  if (!username || !website || !password) {
    return res
      .status(400)
      .json({ error: "Username, website, and password are required" });
  }
  try {
    const encryptedPassword = encrypt(password);
    const newKey = await Key.create({
      username,
      website,
      password: encryptedPassword,
    });
    successHandler(res, newKey.id, "Created successfully");
  } catch (error) {
    errorHandler(res, error, "Internal Server Error");
  }
};

export const putKey = async (req, res) => {
  const { id } = req.params;
  const { username, website, password } = req.body;
  if (!username || !website || !password) {
    return res
      .status(400)
      .json({ error: "Username, website, and password are required" });
  }
  try {
    const encryptedPassword = encrypt(password);
    const [numUpdated] = await Key.update(
      { username, website, password: encryptedPassword },
      { where: { id } }
    );
    if (numUpdated === 0) {
      return notFoundHandler(res, id);
    }
    successHandler(res, id, "Updated successfully");
  } catch (error) {
    errorHandler(res, error, "Internal Server Error");
  }
};

export const deleteKey = async (req, res) => {
  const { id } = req.params;
  try {
    const numDeleted = await Key.destroy({ where: { id } });
    if (numDeleted === 0) {
      return notFoundHandler(res, id);
    }
    successHandler(res, id, "Deleted successfully");
  } catch (error) {
    errorHandler(res, error, "Internal Server Error");
  }
};

export const generateKeys = async (req, res) => {
  try {
    const password = generatePassword.generate({
      length: 12,
      numbers: true,
      symbols: true,
      uppercase: true,
      strict: true,
    });
    res.status(200).json({ password });
  } catch (error) {
    errorHandler(res, error, "Internal Server Error");
  }
};

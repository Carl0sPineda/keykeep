import express from "express";
import {
  getAllKeys,
  postKey,
  deleteKey,
  putKey,
  getKeyById,
} from "../controllers/keyController.js";

const router = express.Router();

router.get("/keys", getAllKeys);
router.get("/keys/:id", getKeyById);
router.post("/keys", postKey);
router.delete("/keys/:id", deleteKey);
router.put("/keys/:id", putKey);

export default router;

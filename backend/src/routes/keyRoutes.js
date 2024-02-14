import express from "express";
import { getAllKeys, postKey } from "../controllers/keyController.js";

const router = express.Router();

router.get("/keys", getAllKeys);
router.post("/keys", postKey);

export default router;

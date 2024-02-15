import express from "express";
import cors from "cors";
import keyRoutes from "./routes/keyRoutes.js";
import { PORT } from "./utils/config.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(keyRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`\n Server listening at http://localhost:${PORT}🚀`);
});

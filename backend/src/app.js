import express from "express";
import keyRoutes from "./routes/keyRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(keyRoutes);

app.use(errorHandler);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log(`\n Server listening at http://localhost:${port} 🚀`);
});

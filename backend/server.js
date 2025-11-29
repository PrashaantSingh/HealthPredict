import "./config/env.js";
import express from "express";
import diabetesRoutes from "./routes/diabetes.routes.js";
import parkinsonRoutes from "./routes/parkinson.routes.js";
import heartRoutes from "./routes/heart.routes.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
app.use("/api/parkinson", parkinsonRoutes);
app.use("/api/diabetes", diabetesRoutes);
app.use("/api/heart", heartRoutes);

app.get("/", (req, res) =>
  res.json({ message: "this is the response from the server" })
);

app.listen(PORT, () => console.log("server is runnning at port: " + PORT));

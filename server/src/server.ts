import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth/authRoutes";
import path from "path";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/auth", authRoutes);
app.use("/sub", authRoutes);

app.get("/", (_: Request, res: Response) => {
  res.send("running");
});

const port = 4000;

app.listen(port, async () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);

  AppDataSource.initialize()
    .then(async () => {
      console.log("DB Connection");
    })
    .catch((error) => console.log(error));
});

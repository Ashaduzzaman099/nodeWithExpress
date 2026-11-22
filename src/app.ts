import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import fs from "fs";
import { authRouter } from "./modules/auth/auth.route";
import { profileRoute } from "./modules/profiles/profile.route";
import { userRoute } from "./modules/users/user.route";
const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const log = `\n Method: ${req.method} | URL ${req.url} | Time: ${Date.now()} \n`;
  fs.appendFile("logger.txt", log, (err) => {
    console.log(err);
  });
  next();
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/profiles", profileRoute);
app.use("/api/v1/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is Root Route",
    author: "Ashik",
  });
});

export default app;

import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import logger from "./middleware/logger";
import { authRouter } from "./modules/auth/auth.route";
import { profileRoute } from "./modules/profiles/profile.route";
import { userRoute } from "./modules/users/user.route";
const app: Application = express();
import cors from "cors";

var corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
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
app.use(globalErrorHandler);
export default app;

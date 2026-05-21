import CookieParser from "cookie-parser";
import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import logger from "./middleware/logger";
import { authRoute } from "./modules/auth/auth.route";
import { profileRoute } from "./modules/profile/profile.route";
import { userRoute } from "./modules/user/user.route";
import globalErrorHandler from "./middleware/globalErrorHandler";
const app: Application = express();

app.use(CookieParser());
app.use(express.json());
app.use(express.text());
// ### What it does (One line)
// It converts plain text request body into a string and stores it in `req.body`.
// ---
// ### Example
// Client sends:
// ```txt
// Hello Express
// ```
// Route:

// ```js
// app.use(express.text());
// app.post("/", (req, res) => {
//   console.log(req.body);
//   res.send("Received");
// });
// ```
// Output:
// ```js
// Hello Express
// ```
app.use(express.urlencoded({ extended: true }));
// It parses form data (application/x-www-form-urlencoded) and stores it in req.body.
extended: true;
// Allows parsing nested objects and arrays.
app.use(logger);

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.get("/", (req: Request, res: Response) => {
  //res.send("Hello World!");
  res.status(200).json({
    message: "Express Server",
    author: "Next Level",
  });
});

app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/auth", authRoute);

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;

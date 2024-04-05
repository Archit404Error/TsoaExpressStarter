import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import { RegisterRoutes } from "../build/routes";
import { dbConnect } from "./database";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();
app.use(bodyParser.json());

app.use("/docs", swaggerUI.serve, async (req: Request, res: Response) => {
  return res.send(
    swaggerUI.generateHTML(await import("../build/swagger.json"))
  );
});

RegisterRoutes(app);

app.use(errorMiddleware);

app.listen(process.env.PORT || 8000, async () => {
  console.log(
    `✅ Server is up and running at http://localhost:${
      process.env.PORT || 8000
    }`
  );
  await dbConnect();
});

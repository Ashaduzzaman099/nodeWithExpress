import express, { type Application, type Request, type Response } from "express";

const app: Application = express();
const port: number = 3000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is Root Route",
    author: "Ashik",
  });
});

app.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
  res.status(201).json({
    success: true,
    message: "Data received",
    data: req.body,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

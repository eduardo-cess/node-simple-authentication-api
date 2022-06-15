import bodyParser from "body-parser";
import express from "express";
import { router } from "./routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`Running on port ${port}`));
import express from "express";
import { envVars } from "./config/env-variables";
import { router } from "./routes";

const app = express();
const port = envVars.port || 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`Running on port ${port}`));
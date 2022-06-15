import { Router } from "express";
import { AuthenticateUserController } from "./useCases/authenticate-user/authenticate-user-controller";
import { CreateUserController } from "./useCases/create-user/create-user-controller";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

router.post("/user", (req, res) => createUserController.handle(req, res));
router.post("/login", (req, res) => authenticateUserController.handle(req, res));

router.get("/test", (req, res, next)=> {
  console.log("test");
  res.status(200).json("test");
})

export { router }
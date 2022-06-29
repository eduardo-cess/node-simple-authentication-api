import { Router } from "express";
import { authenticationMiddleware } from "./middlewares/authentication-middleware";
import { AuthenticateUserController } from "./useCases/authenticate-user/authenticate-user-controller";
import { CreateUserController } from "./useCases/create-user/create-user-controller";
import { RefreshTokenUserController } from "./useCases/refresh-token-user/refresh-token-user-controller";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.post("/user", (req, res) => createUserController.handle(req, res));
router.post("/login", (req, res) => authenticateUserController.handle(req, res));
router.post("/refresh-token", (req, res) => refreshTokenUserController.handle(req, res));

router.get("/test", authenticationMiddleware, (req, res, next)=> {
  console.log("test");
  res.status(200).json("test");
})

export { router }
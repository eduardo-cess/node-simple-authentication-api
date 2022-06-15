import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./authenticate-user-use-case";

export class AuthenticateUserController {
  constructor (
    private readonly authenticateUserUseCase = new AuthenticateUserUseCase()
  ) {}

  public async handle(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const token = await this.authenticateUserUseCase.execute({ username, password });
      return res.status(200).json(token);

    } catch (error) {
      console.error(error);
      return res.status(500).json({error: error.message});
    }
  }
}
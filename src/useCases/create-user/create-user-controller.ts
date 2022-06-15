import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user-use-case";

export class CreateUserController {
  constructor (
    private readonly createUserUseCase = new CreateUserUseCase()
  ) {}

  public async handle(req: Request, res: Response) {
    try {
      const { username, name, password } = req.body;
      const user = await this.createUserUseCase.execute({ username, name, password });
      return res.status(200).json(user);

    } catch (error) {
      console.error(error);
      return res.status(500).json({error: error.message});
    }
  }
}
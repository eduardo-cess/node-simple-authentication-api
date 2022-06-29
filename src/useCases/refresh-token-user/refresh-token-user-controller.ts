import { Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { envVars } from "../../config/env-variables";
import { RefreshTokenUserUseCase } from "./refresh-token-user-use-case";

export class RefreshTokenUserController {
  constructor (
    private readonly refreshTokenUserUseCase = new RefreshTokenUserUseCase()
  ) {}

  public async handle(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const payload = verify(refreshToken, envVars.privateKey) as JwtPayload;
      const result = await this.refreshTokenUserUseCase.execute(payload.sub);
      return res.status(200).json(result);

    } catch (error) {
      console.error(error);
      return res.status(500).json({error: error.message});
    }
  }
}
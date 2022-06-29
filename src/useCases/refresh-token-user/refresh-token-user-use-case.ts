import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { RefresTokenProvider } from "../../provider/db/refresh-token";
import { envVars } from "../../config/env-variables";
import { client } from "../../prisma/client";
import { GenerateTokenProvider } from "../../provider/generate-token";
import dayjs from "dayjs";

export class RefreshTokenUserUseCase {
  constructor(
    private readonly generateTokenProvider = new GenerateTokenProvider()
  ){}

  public async execute(refreshTokenId: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: { id: refreshTokenId, expiresIn: { gte: dayjs().unix() } }
    });
		if(!refreshToken) {
			throw new Error("Error generating token.");
		}

    const token = await this.generateTokenProvider.execute(refreshToken.userId);
    
    return { token };

  }
}
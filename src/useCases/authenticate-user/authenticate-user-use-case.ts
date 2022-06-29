import { compare } from "bcryptjs";
import { RefresTokenProvider } from "../../provider/db/refresh-token";
import { envVars } from "../../config/env-variables";
import { client } from "../../prisma/client";
import { GenerateTokenProvider } from "../../provider/generate-token";
import dayjs from "dayjs";

interface IRequest {
  username: string;
  password: string;
}

export class AuthenticateUserUseCase {
  constructor(
    private readonly refreshTokenProvider = new RefresTokenProvider(),
    private readonly generateTokenProvider = new GenerateTokenProvider()
  ){}

  public async execute({username, password}: IRequest) {
    const userAlreadyExists = await client.user.findFirst({
      where: { username }
    });
		if(!userAlreadyExists) {
			throw new Error("Error Authenticating user.");
		}
    const passwordMatch = await compare(password, userAlreadyExists.password);
    if(!passwordMatch) {
			throw new Error("Error Authenticating user.");
		}
    const token = await this.generateTokenProvider.execute(userAlreadyExists.id);
    
    const expiresIn = dayjs().add(envVars.refreshTokenExpiration, "second").unix();
    const refreshTokenDb = await this.refreshTokenProvider.upsert(userAlreadyExists.id, expiresIn);
    const { id: refresTokenId, ...payload } = refreshTokenDb;
    const refreshToken = await this.generateTokenProvider.execute(refresTokenId, payload, envVars.refreshTokenExpiration);
    
    return { token, refreshToken };

  }
}
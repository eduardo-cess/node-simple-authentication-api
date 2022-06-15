import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { client } from "../../prisma/client";

interface IRequest {
  username: string;
  password: string;
}

export class AuthenticateUserUseCase {
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

    const token = sign({}, "some_private_key", {
      subject: userAlreadyExists.id,
      expiresIn: "20s"
    })

    return token;

  }
}
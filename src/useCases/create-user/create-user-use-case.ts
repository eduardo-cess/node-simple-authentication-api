import { hash } from "bcryptjs";
import { client } from "../../prisma/client";

interface IUserRequest {
  name: string;
  password: string;
  username: string;
}

export class CreateUserUseCase {
  public async execute({ name, username, password }: IUserRequest) {
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      }
    });
		if(userAlreadyExists) {
			throw new Error("User Already exists.");
		}
		const user = await client.user.create({
			data: { 
				name, 
				username, 
				password: await hash(password, 8)
			}
		});

		return user;
  }
}

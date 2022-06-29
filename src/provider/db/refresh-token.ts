import dayjs from "dayjs";
import { client } from "../../prisma/client";

export class RefresTokenProvider {

  async upsert(userId: string, expiresIn: number) {
    const refreshToken = await client.refreshToken.upsert({
      where: { userId },
      update: { expiresIn },
      create: {
        userId,
        expiresIn
      }
    });
    return refreshToken;
  }

}
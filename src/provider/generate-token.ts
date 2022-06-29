import { sign } from "jsonwebtoken";
import { envVars } from "../config/env-variables";

export class GenerateTokenProvider {

  async execute(subject: string, payload = {}, expiresInSeconds = 20): Promise<string> {
    const token = await sign(payload, envVars.privateKey, {
      subject,
      expiresIn: `${expiresInSeconds}s`
    })
    return token;
  }

}
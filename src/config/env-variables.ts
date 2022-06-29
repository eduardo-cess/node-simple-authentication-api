
require("dotenv").config()
import getenv from "getenv";

export const envVars = {
  privateKey: getenv.string("PRIVATE_KEY"),
  publicKey: getenv.string("PUBLIC_KEY"),
  databaseUrl: getenv.string("DATABASE_URL"),
  acessTokenExpiration: getenv.int("ACESS_TOKEN_EXPIRATION"),
  refreshTokenExpiration: getenv.int("REFRESH_TOKEN_EXPIRATION"),
}
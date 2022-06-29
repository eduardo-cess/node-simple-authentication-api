import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { envVars } from "../config/env-variables";

export function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;
  if(!authToken) {
    return res.status(401).json({message: "Unauthorized"});
  }
  const [, token] = authToken.split(" ");
  try {
    verify(token, envVars.privateKey);
    return next();
  } catch (error) {
    return res.status(401).json({message: "Unauthorized"});
  }
}
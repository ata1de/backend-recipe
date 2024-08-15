import jwt from 'jsonwebtoken';
import { config } from '../env'; // Importe o config do arquivo env.ts

export const jwtService = {
  signToken: (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: expiration
    });
  },

  verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
    jwt.verify(token, config.JWT_SECRET, callbackfn);
  }
};

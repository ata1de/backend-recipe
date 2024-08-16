import jwt from 'jsonwebtoken';
import { config } from '../../env'; // Importe o config do arquivo env.ts

export const jwtService = {
  signToken: (payload: string | object | Buffer, expiration: string | number) => {
    try {
      console.log('ExpiresIn:', expiration); // Verifique o valor de expiration

      const token = jwt.sign(payload, config.JWT_SECRET)

      console.log(token);
      return token;
    } catch (error) {
      console.error('Error signing token:', error);
      throw error;  // Re-throw the error after logging it
    }
  },

  verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
    try {
      jwt.verify(token, config.JWT_SECRET, callbackfn);
    } catch (error) {
      console.error('Error verifying token:', error);
      throw error;  // Re-throw the error after logging it
    }
  }
};
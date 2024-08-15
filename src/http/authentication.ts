import { sign } from 'jsonwebtoken';

function singToken (token: string) {
    return sign(token, 'my-secret-key' ,{ expiresIn: '1h' });
}
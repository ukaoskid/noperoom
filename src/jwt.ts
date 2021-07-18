import * as jwt from 'jsonwebtoken';

export const decodeJwt = (token: string): any => {
    return jwt.decode(token);
}
export const getJwt = (payload: any) => {
    return jwt.sign(payload, 'test');
}

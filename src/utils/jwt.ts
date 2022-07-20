import jwt from "jsonwebtoken";
import config from "config";

export function signJwt(
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    "base64"
  ).toString("ascii");

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token:string, keyName: "accessTokenPublicKey" | "refreshTokenPublicKey", options?:jwt.VerifyOptions | undefined):string | jwt.JwtPayload | null {
    const publicKey = Buffer.from(config.get<string>(keyName), 'base64').toString("ascii");
    try {
        const decoded = jwt.verify(token, publicKey);
        return decoded;
    } catch (error:any) {
        return null;
        
    }
}

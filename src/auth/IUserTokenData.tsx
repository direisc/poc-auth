import { JwtPayload } from 'jsonwebtoken';

export interface IUserTokenData extends JwtPayload {
  // aud: string
  auth_time: number;
  'cognito:user_status': string;
  'cognito:username': string;
  'cognito:userId': string;
  email: string;
  email_verified: "true" | "false";
  event_id: string;
  exp: number
  // iat: number
  // iss: string
  // sub: string
  token_use: string;
}

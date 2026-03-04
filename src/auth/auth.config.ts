import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
  expiresIn: Number(process.env.JWT_TLL),
  secret: process.env.JWT_SECRET,
}));

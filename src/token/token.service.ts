import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const { ACCESS_SECRET: secret, EXPIRE_TIME: expiresIn } = process.env;

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  // ============================================ Generate JWT token
  async generateJwtToken(user) {
    const payload = { user };
    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
  }
}

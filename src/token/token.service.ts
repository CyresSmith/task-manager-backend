import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const { ACCESS_SECRET: secret, EXPIRE_TIME: expiresIn } = process.env;

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  // ============================================ Generate JWT token
  async generateJwtToken(user) {
    const payload = { user };
    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn,
    });
  }

  // ============================================ Verify JWT token
  async verifyJwtToken(token: string) {
    const response = await this.jwtService.verifyAsync(token, { secret });

    if (!response) {
      throw new UnauthorizedException('Token is invalid');
    }

    return response;
  }
}

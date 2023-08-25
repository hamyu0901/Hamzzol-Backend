import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginService } from '@/routes/login/login.service';
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Get('login')
  getUserInfo() {
    return this.loginService.getUserInfo();
  }
  @Get('login/security/type')
  getSecurityQATypeInfo() {
    return this.loginService.getSecurityQATypeInfo();
  }
  @Post('login')
  postUserInfo(@Body() body: any) {
    return this.loginService.postUserInfo(body);
  }
}

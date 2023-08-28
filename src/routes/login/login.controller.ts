import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoginService } from '@/routes/login/login.service';
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Get('login')
  getUserInfo() {
    return this.loginService.getUserInfo();
  }
  @Get('login/compare')
  getCompareUserInfo(@Query() params: { id: string; password: string }) {
    return this.loginService.getCompareUserInfo(params);
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

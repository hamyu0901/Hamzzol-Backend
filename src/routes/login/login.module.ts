import { Global, Module } from '@nestjs/common';
import { LoginService } from '@/routes/login/login.service';
import { LoginController } from '@/routes/login/login.controller';
import { LoginRepository } from '@/routes/login/login.repository';
@Global()
@Module({
  controllers: [LoginController],
  providers: [LoginService, LoginRepository],
  exports: [LoginService],
})
export class LoginModule {}

import { Injectable } from '@nestjs/common';
import { LoginRepository } from '@/routes/login/login.repository';

@Injectable()
export class LoginService {
  constructor(private readonly loginRepository: LoginRepository) {}
  async getUserInfo(): Promise<any> {
    return await this.loginRepository.getUserInfo();
  }
  async getSecurityQATypeInfo(): Promise<any> {
    return await this.loginRepository.getSecurityQATypeInfo();
  }
  async postUserInfo(body: any): Promise<any> {
    return await this.loginRepository.postUserInfo(body);
  }
}

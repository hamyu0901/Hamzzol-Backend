import { Injectable } from '@nestjs/common';
import { LoginRepository } from '@/routes/login/login.repository';
import { isEmpty } from 'lodash';

@Injectable()
export class LoginService {
  constructor(private readonly loginRepository: LoginRepository) {}
  async getUserInfo(): Promise<any> {
    return await this.loginRepository.getUserInfo();
  }
  async getCompareUserInfo(params: {
    id: string;
    password: string;
  }): Promise<any> {
    const userInfo = await this.loginRepository.getUserInfo();
    if (!isEmpty(userInfo)) {
      console.log(params)
    }
    console.log('usrInfoIII', userInfo);
  }
  async getSecurityQATypeInfo(): Promise<any> {
    return await this.loginRepository.getSecurityQATypeInfo();
  }
  async postUserInfo(body: any): Promise<any> {
    return await this.loginRepository.postUserInfo(body);
  }
}

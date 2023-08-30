import { Injectable } from '@nestjs/common';
import { LoginRepository } from '@/routes/login/login.repository';
import { isEmpty } from 'lodash';
import * as bcrypt from 'bcryptjs';
import { promisify } from 'util';
@Injectable()
export class LoginService {
  constructor(private readonly loginRepository: LoginRepository) {}
  async getUserInfo(id: string): Promise<any> {
    return await this.loginRepository.getUserInfo(id);
  }
  async getCompareUserInfo(params: {
    id: string;
    password: string;
  }): Promise<any> {
    const userInfo = await this.loginRepository.getUserInfo(params.id);
    if (!isEmpty(userInfo)) {
      try {
        const compare = promisify(bcrypt.compare);
        const result = await compare(
          params.password,
          userInfo[0].user_password,
        );
        return result ? userInfo[0] : 'Incorrect password';
      } catch (err) {
        return 'err';
      }
    }
    return 'Not User';
  }
  async getSecurityQATypeInfo(): Promise<any> {
    return await this.loginRepository.getSecurityQATypeInfo();
  }
  async postUserInfo(body: any): Promise<any> {
    return await this.loginRepository.postUserInfo(body);
  }
  async patchUserInfo(id: string, body: any): Promise<any> {
    return await this.loginRepository.patchUserInfo(id, body);
  }
}

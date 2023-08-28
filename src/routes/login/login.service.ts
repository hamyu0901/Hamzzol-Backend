import { Injectable } from '@nestjs/common';
import { LoginRepository } from '@/routes/login/login.repository';
import { isEmpty } from 'lodash';
import * as bcrypt from 'bcryptjs';
import { promisify } from 'util';
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
      const foundUser = userInfo.find((user) => user.user_id === params.id);
      if (foundUser) {
        try {
          const compare = promisify(bcrypt.compare);
          const result = await compare(
            params.password,
            foundUser.user_password,
          );
          return result ? foundUser : 'Incorrect password';
        } catch (err) {
          //에러 처리
          return 'err';
        }
      } else {
        // 일치하는 사용자가 없음
        return 'Not User';
      }
    }
    return '';
  }
  async getSecurityQATypeInfo(): Promise<any> {
    return await this.loginRepository.getSecurityQATypeInfo();
  }
  async postUserInfo(body: any): Promise<any> {
    return await this.loginRepository.postUserInfo(body);
  }
}

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { MainDBService } from '@/database/main/main.service';
@Injectable()
export class LoginRepository {
  constructor(private readonly mainDBService: MainDBService) {}
  async getUserInfo(): Promise<any> {
    const query = 'SELECT * FROM user_config';
    const result = await this.mainDBService.query(query);
    return result.rows;
  }
  async getSecurityQATypeInfo(): Promise<any> {
    const query = 'SELECT * FROM def_security_type';
    const result = await this.mainDBService.query(query);
    return result.rows;
  }
  async postUserInfo(body: any): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const query = {
      text: `INSERT INTO user_config (user_id, user_name, user_password, security_type_id, security_type_answer) VALUES ($1,$2,$3,$4,$5)`,
      values: [
        body.id,
        body.name,
        hashedPassword,
        body.typeId,
        body.typeAnswer,
      ],
    };
    await this.mainDBService.query(query);
  }
}

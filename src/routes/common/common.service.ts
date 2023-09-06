import { Injectable } from '@nestjs/common';
const weatherApiKey = '71878480cdd4f838da85f3940b699b86&units=metric';
@Injectable()
export class CommonService {
  async getWeatherAPI(): Promise<string> {
    return weatherApiKey;
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  private readonly;
  async getWeatherAPI(): Promise<string> {
    const weatherApiKey = '71878480cdd4f838da85f3940b699b86&units=metric';
    return weatherApiKey;
  }
}

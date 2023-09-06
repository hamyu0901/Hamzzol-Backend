import { Controller, Get } from '@nestjs/common';
import { CommonService } from '@/routes/common/common.service';
@Controller()
export class CommonController {
  constructor(private readonly commonService: CommonService) {}
  @Get('common/weather/api')
  getWeatherAPI() {
    return this.commonService.getWeatherAPI();
  }
}

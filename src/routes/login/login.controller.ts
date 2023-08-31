import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { LoginService } from '@/routes/login/login.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Get('login/id/:id')
  getUserInfo(@Param('id') id: string) {
    return this.loginService.getUserInfo(id);
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
  @Patch('login/id/:id')
  patchUserInfo(@Param() id: string, @Body() body: any) {
    return this.loginService.patchUserInfo(id, body);
  }
  @Post('login/file/id/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const userImgDir = `D://Hamzzol/STORAGE/user_img/${req.params.id}`;
          if (!fs.existsSync(userImgDir)) {
            fs.mkdirSync(userImgDir, { recursive: true });
          } else {
            // Remove existing files in the directory
            fs.readdirSync(userImgDir).forEach((file) => {
              fs.unlinkSync(`${userImgDir}/${file}`);
            });
          }
          cb(null, userImgDir);
        },
        filename: (req, file, cb) => {
          cb(null, 'user.png');
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // 파일 업로드 후 처리 로직
    return { filename: file.filename };
  }
  @Get('login/file/id/:id')
  async getUserImage(@Param('id') id: string, @Response() res: any) {
    const imagePath = `D://Hamzzol/STORAGE/user_img/${id}/user.png`; // Adjust the file path and extension accordingly
    fs.readFile(imagePath, 'base64', (err, data) => {
      if (err) {
        res.send('err');
      } else {
        res.send(data);
      }
    });
  }
}

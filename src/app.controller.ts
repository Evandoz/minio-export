import { Controller, Get, Query, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('export')
  async exportFile(@Response() res: any, @Query('url') objectUrl: string) {
    console.log(objectUrl);
    const [bucketName, ...objectNamePaths] = objectUrl.split('/');
    const exported = await this.appService.exportFile({
      bucketName,
      objectName: objectNamePaths.join('/'),
    });

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${objectNamePaths.join('/')}"`,
    );
    res.send(exported);
  }
}

import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          endPoint: config.get('MINIO_ENDPOINT'),
          port: parseInt(config.get('MINIO_PORT')),
          useSSL: config.get('MINIO_USE_SSL') === 'true',
          accessKey: config.get('MINIO_ACCESS_KEY'),
          secretKey: config.get('MINIO_SECRET_KEY'),
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

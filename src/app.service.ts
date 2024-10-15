import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class AppService {
  constructor(private readonly minioService: MinioService) {}

  getHello(): string {
    return 'Hello World!';
  }

  // 导出，获取二进制文件
  async exportFile(data: any): Promise<Buffer> {
    const lowerBucketName = data.bucketName.toLocaleLowerCase();

    return new Promise((resolve, reject) => {
      this.minioService.client.getObject(
        lowerBucketName,
        data.objectName,
        (error, stream) => {
          if (error) {
            reject(
              new ServiceUnavailableException(error?.message || '文件服务异常'),
            );
          }

          const chunks: Buffer[] = [];

          stream.on('data', (chunk) => {
            chunks.push(chunk);
          });

          stream.on('end', () => {
            resolve(Buffer.concat(chunks));
          });

          stream.on('error', (error) => {
            reject(error);
          });
        },
      );
    });
  }
}

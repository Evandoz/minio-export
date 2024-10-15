module.exports = {
  apps: [
    {
      name: 'minio-export',
      script: 'dist/main.js',
      instances: 'max', // 根据需求设置实例数量
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        MINIO_ENDPOINT: '',
        MINIO_PORT: 0,
        MINIO_USE_SSL: 'false',
        MINIO_ACCESS_KEY: '',
        MINIO_SECRET_KEY: '',
      },
    },
  ],
};

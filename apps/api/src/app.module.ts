import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { findEnv } from '../findEnv.js';

const envPath = findEnv();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ...(envPath ? { envFilePath: envPath } : {}),
    }),
    HealthModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

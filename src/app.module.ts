import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './common/postgres/postgres.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: [`.env`] }), PostgresModule.register()],
})
export class AppModule {}

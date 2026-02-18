import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './common/postgres/postgres.module';
import { UsersModule } from './users/users.module';
import { entities } from './common/entities';
import { migrations } from './common/migrations';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: [`.env`] }), PostgresModule.register(entities, migrations), UsersModule],
})
export class AppModule {}

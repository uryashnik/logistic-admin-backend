import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './common/postgres/postgres.module';
import { UsersModule } from './users/users.module';
import { entities } from './common/entities';
import { migrations } from './common/migrations';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: [`.env`] }), PostgresModule.register(entities, migrations), UsersModule, AuthModule],
  providers: [{ provide: 'APP_GUARD', useClass: JwtAuthGuard }],
})
export class AppModule {}

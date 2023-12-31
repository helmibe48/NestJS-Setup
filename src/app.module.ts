import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validate } from './config/env.validation';
import { Ingredient, Recipe } from './recipe/entity/recipe';
import { RecipeModule } from './recipe/recipe.module';
import { User } from './auth/entity/user';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Recipe, Ingredient, User],
        synchronize: false,
        logging: configService.get<boolean>('DB_LOGGING'),
      }),
    }),
    RecipeModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

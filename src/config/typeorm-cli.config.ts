import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Ingredient, Recipe } from 'src/recipe/entity/recipe';
import { User } from 'src/auth/entity/user';
import { initialSchema1688896394393 } from 'src/migrations/1688896394393-initial_schema';
import { addUser1688907886468 } from 'src/migrations/1688907886468-add-user';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  logging: configService.get<boolean>('DB_LOGGING'),
  entities: [Recipe, Ingredient, User],
  migrations: [initialSchema1688896394393, addUser1688907886468],
});

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import { AppController } from './app.controller'
import { ItemsModule } from './items/items.module'
import { RecipesModule } from './recipes/recipes.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { User } from './users/entities/user.entity'
import { Recipe } from './recipes/entities/recipe.entity'
import { Item } from './items/entities/item.entity'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Recipe, Item],
      synchronize: false,
    }),
    ItemsModule,
    RecipesModule,
    AuthModule,
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'dist'),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}

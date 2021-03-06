import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller'
import { ItemsModule } from './items/items.module'
import { RecipesModule } from './recipes/recipes.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ItemsModule,
    RecipesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

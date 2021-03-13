import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { RecipesModule } from 'src/recipes/recipes.module'

import { ItemsService } from './items.service'
import { ItemsController } from './items.controller'
import { Item, ItemSchema } from './schemas/item.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    forwardRef(() => RecipesModule),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [MongooseModule],
})
export class ItemsModule {}

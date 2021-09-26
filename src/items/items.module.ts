import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { RecipesModule } from 'src/recipes/recipes.module'

import { ItemsService } from './items.service'
import { ItemsController } from './items.controller'
import { Item, ItemSchema } from './schemas/item.schema'
import { ItemsGateway } from './items.gateway'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    forwardRef(() => RecipesModule),
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ItemsGateway],
  exports: [MongooseModule],
})
export class ItemsModule {}

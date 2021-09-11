import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RecipesModule } from 'src/recipes/recipes.module'

import { ItemsService } from './items.service'
import { ItemsController } from './items.controller'
import { Item } from './entities/item.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Item]), forwardRef(() => RecipesModule)],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [TypeOrmModule],
})
export class ItemsModule {}

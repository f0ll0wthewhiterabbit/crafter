import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ItemsModule } from 'src/items/items.module'

import { RecipesService } from './recipes.service'
import { RecipesController } from './recipes.controller'
import { Recipe } from './entities/recipe.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), forwardRef(() => ItemsModule)],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [TypeOrmModule],
})
export class RecipesModule {}

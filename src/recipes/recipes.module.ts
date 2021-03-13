import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ItemsModule } from 'src/items/items.module'

import { RecipesService } from './recipes.service'
import { RecipesController } from './recipes.controller'
import { Recipe, RecipeSchema } from './schemas/recipe.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    forwardRef(() => ItemsModule),
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [MongooseModule],
})
export class RecipesModule {}

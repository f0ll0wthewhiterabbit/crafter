import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ItemsModule } from 'src/items/items.module'

import { RecipesService } from './recipes.service'
import { RecipesController } from './recipes.controller'
import { Recipe, RecipeSchema } from './schemas/recipe.schema'
import { RecipesGateway } from './recipes.gateway'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    forwardRef(() => ItemsModule),
  ],
  controllers: [RecipesController],
  providers: [RecipesService, RecipesGateway],
  exports: [MongooseModule],
})
export class RecipesModule {}

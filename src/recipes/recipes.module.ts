import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ItemsModule } from 'src/items/items.module'
import { RecipesService } from './recipes.service'
import { RecipesController } from './recipes.controller'
import { Recipe, RecipeSchema } from './schemas/recipe.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]), ItemsModule],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}

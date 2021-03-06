import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common'
import { Types } from 'mongoose'

import { RecipesService } from './recipes.service'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto)
  }

  @Get()
  findAll() {
    return this.recipesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.recipesService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: Types.ObjectId, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(id, updateRecipeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.recipesService.remove(id)
  }
}

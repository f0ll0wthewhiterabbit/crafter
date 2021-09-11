import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  Delete,
  ParseBoolPipe,
  UseGuards,
  Req,
} from '@nestjs/common'

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RequestWithUser } from 'src/auth/types'

import { RecipesService } from './recipes.service'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'

@UseGuards(JwtAuthGuard)
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto)
  }

  @Get()
  findAll(
    @Query('filterParents', ParseBoolPipe) filterParents: boolean,
    @Query('filterForeign', ParseBoolPipe) filterForeign: boolean,
    @Req() request: RequestWithUser
  ) {
    const { userId } = request.user

    return this.recipesService.findAll(filterParents, filterForeign, userId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(id, updateRecipeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipesService.remove(id)
  }

  @Get('bag/:id')
  bag(@Param('id') id: string, @Req() request: RequestWithUser) {
    const { userId } = request.user

    return this.recipesService.bag(id, userId)
  }

  @Get('unbag/:id')
  unbag(@Param('id') id: string) {
    return this.recipesService.unbag(id)
  }
}

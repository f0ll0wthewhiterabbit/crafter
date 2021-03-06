import { PartialType } from '@nestjs/mapped-types'
import { IsMongoId, IsOptional } from 'class-validator'

import { CreateRecipeDto } from './create-recipe.dto'

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
  @IsMongoId()
  @IsOptional()
  readonly belongsTo: string | null
}

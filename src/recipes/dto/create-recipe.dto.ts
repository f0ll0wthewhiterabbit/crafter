import { ArrayMinSize, ArrayUnique, IsArray, IsString, IsUrl } from 'class-validator'

import { MIN_NUMBER_OF_ITEMS_IN_RECIPE } from '../constants'

export class CreateRecipeDto {
  @IsString()
  readonly title: string

  @IsUrl()
  readonly imageSrc: string

  @IsArray()
  @ArrayMinSize(MIN_NUMBER_OF_ITEMS_IN_RECIPE)
  @ArrayUnique()
  @IsString({ each: true })
  readonly itemTitles: string[]
}

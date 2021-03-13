import { ArrayMinSize, ArrayUnique, IsArray, IsString, IsUrl } from 'class-validator'

export const MIN_NUMBER_OF_ITEMS_IN_RECIPE = 2

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

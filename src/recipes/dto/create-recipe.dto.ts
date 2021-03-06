import { ArrayMinSize, ArrayUnique, IsArray, IsString, IsUrl } from 'class-validator'

export class CreateRecipeDto {
  @IsString()
  readonly title: string

  @IsUrl()
  readonly imageSrc: string

  @IsArray()
  @ArrayMinSize(2)
  @ArrayUnique()
  @IsString({ each: true })
  readonly items: string[]
}

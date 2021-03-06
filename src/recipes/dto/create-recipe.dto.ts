import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsDateString,
  IsMongoId,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator'
import { Types } from 'mongoose'

export class CreateRecipeDto {
  @IsString()
  readonly title: string

  @IsUrl()
  readonly imageSrc: string

  @IsArray()
  @ArrayMinSize(2)
  @ArrayUnique()
  readonly items: Types.ObjectId[]

  @IsMongoId()
  @IsOptional()
  readonly belongsTo: string | null

  @IsDateString()
  @IsOptional()
  readonly baggageDate: number | null
}

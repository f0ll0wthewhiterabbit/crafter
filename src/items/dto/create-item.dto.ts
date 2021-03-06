import { IsDateString, IsMongoId, IsOptional, IsString, IsUrl } from 'class-validator'

export class CreateItemDto {
  @IsString()
  readonly title: string

  @IsUrl()
  readonly imageSrc: string

  @IsMongoId()
  @IsOptional()
  readonly belongsTo: string | null

  @IsDateString()
  @IsOptional()
  readonly baggageDate: number | null
}

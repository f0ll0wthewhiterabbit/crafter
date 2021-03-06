import { IsString, IsUrl } from 'class-validator'

export class CreateItemDto {
  @IsString()
  readonly title: string

  @IsUrl()
  readonly imageSrc: string
}

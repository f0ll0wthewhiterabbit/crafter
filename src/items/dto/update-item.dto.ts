import { PartialType } from '@nestjs/mapped-types'
import { IsMongoId, IsOptional } from 'class-validator'

import { CreateItemDto } from './create-item.dto'

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @IsMongoId()
  @IsOptional()
  readonly belongsTo: string | null
}

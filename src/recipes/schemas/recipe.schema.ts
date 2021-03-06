import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'

import { Item } from 'src/items/schemas/item.schema'

export type RecipeDocument = Recipe & Document

@Schema({ timestamps: true })
export class Recipe {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  imageSrc: string

  @Prop({ required: true, type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Item' }] })
  items: Item[]

  @Prop({ default: null })
  belongsTo: string | null

  @Prop({ default: null })
  baggageDate: string | null
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe)

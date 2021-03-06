import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type RecipeDocument = Recipe & Document

@Schema({ timestamps: true })
export class Recipe {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  imageSrc: string

  @Prop({ required: true })
  items: string[]

  @Prop({ default: null })
  belongsTo: string | null

  @Prop({ default: null })
  baggageDate: string | null
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe)

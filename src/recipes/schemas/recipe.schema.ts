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
  itemTitles: string[]

  @Prop({ default: null })
  belongsTo: string | null

  @Prop({ default: null })
  baggageDate: string | null

  @Prop({ default: false })
  isParent: boolean
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe)

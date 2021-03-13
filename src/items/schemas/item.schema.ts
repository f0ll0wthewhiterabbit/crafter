import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'

import { Recipe } from 'src/recipes/schemas/recipe.schema'

export type ItemDocument = Item & Document

@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  imageSrc: string

  @Prop({ default: null })
  belongsTo: string | null

  @Prop({ default: null })
  baggageDate: string | null

  @Prop({ default: null })
  craftDate: string | null

  @Prop({ default: false })
  isParent: boolean

  @Prop({ required: false, type: MongooseSchema.Types.ObjectId, ref: 'Recipe' })
  parentRecipe: Recipe

  @Prop({ required: false, type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Item' }] })
  parentItems: Item[]
}

export const ItemSchema = SchemaFactory.createForClass(Item)

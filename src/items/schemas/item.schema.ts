import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

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
}

export const ItemSchema = SchemaFactory.createForClass(Item)

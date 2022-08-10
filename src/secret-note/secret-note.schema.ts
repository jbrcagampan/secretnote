import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SecretNoteDocument = SecretNote & Document;

@Schema()
export class SecretNote {
  @Prop({ required: true })
  note: string;
  _id: Types.ObjectId;
  __v: number;
}

export const SecretNoteSchema = SchemaFactory.createForClass(SecretNote);

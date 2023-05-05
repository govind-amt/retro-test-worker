import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type postcodeDocument = postcode & Document;
@Schema()
export class postcode {
  @Prop({ required: true })
  uprn: string;
  @Prop({ required: true})
  postcode: string;
  @Prop({ required: true })
  response: string;
  @Prop({ required: true })
  longitude: string;
  @Prop({ required: true })
  latitude: string;
  @Prop({ default: Date.now() })
  createdDate: Date;
}
export const postcodeSchema = SchemaFactory.createForClass(postcode);
export const postcodeSchemaName = 'postcode_details';

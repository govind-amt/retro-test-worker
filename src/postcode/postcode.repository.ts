import { Injectable } from '@nestjs/common';
import {
  postcodeDocument,
  postcodeSchemaName,
} from './schema/postcode-details.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class postcodeRepository {
  constructor(
    @InjectModel(postcodeSchemaName)
    private postcodeDocument: Model<postcodeDocument>,
  ) {}

  async savePostCodeData(result) {
    try {
      const postcodeData = new this.postcodeDocument();
      postcodeData.uprn = result.uprn;
      postcodeData.postcode = result.postcode.replace(/\s/g, '');
      postcodeData.longitude = result.longitude;
      postcodeData.latitude = result.latitude;
      postcodeData.response = JSON.stringify(result);
      const savedPostData = await postcodeData.save();
      return {
        status: true,
        data: savedPostData,
      };
    } catch (err) {
      console.log(err);
      return { status: 500, err: err };
    }
  }

  async getSavedPostcodeData(postcode) {
    const query = { postcode: postcode };
    const data = await this.postcodeDocument.find(query).exec();
    return data;
  }
}

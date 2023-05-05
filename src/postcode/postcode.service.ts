import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { HttpModule, HttpService } from '@nestjs/axios';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { postcodeRepository } from './postcode.repository';

@Injectable()
export class PostcodeService {
  constructor(
    private httpService: HttpService,
    private postcodeRepository: postcodeRepository,
  ) {}
  async saveData(postcode: string) {
    console.log('postcode  :', postcode);
    let postcodeLookupData = [];
    // Fetching postcode lookup data for this postcode from database
    const data = await this.postcodeRepository.getSavedPostcodeData(postcode);
    if (data && data.length) {
      postcodeLookupData = data;
    } else {
      //Calling postcodeLookup API
      const result = await this.getPostcodeLookup(postcode);
      console.log('result    :', JSON.stringify(result));
      for (const resultObject of result.result) {
        const savedData = await this.postcodeRepository.savePostCodeData(
          resultObject,
        );
        postcodeLookupData.push(savedData);
      }
      // const newUser = await this.postcodeRepository.savePostCodeData(result);
      console.log('newUser : ', postcodeLookupData);
      // return postcodeLookupData;
    }
    // const epcResponseData = await this.getEpcData(postcode);
    // epcResponseData
  }
  async getPostcodeLookup(postcode) {
    try {
      const reqData = this.httpService
        .get(
          'https://api.ideal-postcodes.co.uk/v1/postcodes/' +
            postcode +
            '?api_key=ak_lgufnm3sY34MaJYHV7tbjHfoTmZ8o',
        )
        .pipe(
          map(async (response: AxiosResponse) => {
            console.log('response from API : ', response.data);
            if (
              response &&
              response.data &&
              response.data.code == 2000 &&
              response.data.result
            ) {
              return response.data;
            } else {
              return { status: false, info: 'Server error' };
            }
          }),
        );
      const data = await lastValueFrom(reqData);
      return data;
    } catch (err) {
      console.log(err);
      return { status: 500, info: err };
    }
  }
  // async getEpcData(_postcode) {
  //   try {
  //     let _postcode = 'SW1A';
  //     const reqData = this.httpService
  //       .get(
  //         'https://epc.opendatacommunities.org/api/v1/domestic/search?postcode=' +
  //           _postcode,
  //       )
  //       .pipe(
  //         map(async (response: AxiosResponse) => {
  //           console.log('response from API : ', response.data);
  //           if (
  //             response &&
  //             response.data &&
  //             response.data.code == 2000 &&
  //             response.data.result
  //           ) {
  //             return response.data;
  //           } else {
  //             return { status: false, info: 'Server error' };
  //           }
  //         }),
  //       );
  //     const data = await lastValueFrom(reqData);
  //     return data;
  //   } catch (err) {
  //     console.log(err);
  //     return { status: 500, info: err };
  //   }
  // }
}

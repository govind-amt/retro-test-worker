import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostcodeModule } from './postcode/postcode.module';
import { PostcodeService } from './postcode/postcode.service';
import { HttpModule } from '@nestjs/axios';
import { postcodeRepository } from './postcode/postcode.repository';
import {
  postcodeSchema,
  postcodeSchemaName,
} from './postcode/schema/postcode-details.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://192.168.2.136:27017/retro-green-api'),
    PostcodeModule,
    HttpModule,
    MongooseModule.forFeature([
      {
        name: postcodeSchemaName,
        schema: postcodeSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, PostcodeService, postcodeRepository],
})
export class AppModule {}

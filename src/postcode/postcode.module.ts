import { Module } from '@nestjs/common';
import { PostcodeController } from './postcode.controller';
import { PostcodeService } from './postcode.service';
import { HttpModule } from '@nestjs/axios';
import { postcodeRepository } from './postcode.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  postcodeSchema,
  postcodeSchemaName,
} from './schema/postcode-details.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: postcodeSchemaName,
        schema: postcodeSchema,
      },
    ]),
  ],
  controllers: [PostcodeController],
  providers: [PostcodeService, postcodeRepository],
})
export class PostcodeModule {}

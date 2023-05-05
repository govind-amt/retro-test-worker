import { Controller, HttpStatus, Res } from '@nestjs/common';
import { Body, Post, Req } from '@nestjs/common/decorators';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PostcodeService } from './postcode.service';

@Controller('postcode')
export class PostcodeController {
  constructor(private PostcodeService: PostcodeService) {}
  @Post('/postcode/saveData')
  async getData(@Body('postcode') postcode: string, @Res() Response) {
    const data = await this.PostcodeService.saveData(postcode);
    Response.send(data);
  }
}

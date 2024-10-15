import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilterHelper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamerHelper';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('product/:imagename')
  findProductImage(
    @Res() res: Response,
    @Param('imagename') imagename: string,
  ) {
    const path = this.filesService.getStaicImage(imagename);

    res.sendFile(path);

    return path;
  }

  @Post('products')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  )
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File is empty');

    const secureURL = `${this.configService.get('APP_URL')}/files/product/${file.filename}`;
    return { secureURL };
  }
}

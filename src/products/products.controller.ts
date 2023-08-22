import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { ProductsService } from './products.service';
import { Product } from './product.interface';
import { CreateProductDto } from './product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @Body() createProductDto: CreateProductDto, 
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
        new FileTypeValidator({ fileType: 'image/*' }),
      ],
    }),
    ) file: Express.Multer.File
  ): Promise<Product> {
    const uploadFile = () =>
      new Promise((resolve, reject) => {
        let cld_upload_stream = cloudinary.uploader.upload_stream({folder: "product"}, (error, result) => {     
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });

        streamifier.createReadStream(file.buffer)
          .pipe(cld_upload_stream);
      });
    
    const result = await uploadFile();
    createProductDto.photo = result?.['url'];

    return this.productsService.create(createProductDto);
  }
}
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  IsIn,
  IsNumber,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'T-shirt',
    description: 'Title of the product',
    uniqueItems: true,
    nullable: false,
  })
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  sizes?: string[];

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;
}

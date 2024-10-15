import { User } from 'src/auth/entities/user.entity';
import { ProductImage } from './';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'Unique identifier',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'T-shirt',
    description: 'Title of the product',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty({
    example: 'This is a T-shirt',
    description: 'Description of the product',
  })
  @Column('text', {
    nullable: true,
  })
  description?: string;

  @ApiProperty()
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({
    example: 0,
    description: 'Price of the product',
  })
  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  price: number;

  @ApiProperty()
  @Column('text', { array: true, default: [] })
  sizes: string[];

  @ApiProperty()
  @Column('varchar', { unique: true, nullable: true })
  slug: string;

  @ApiProperty()
  @Column('varchar', { nullable: true })
  type: string;

  @ApiProperty()
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ApiProperty()
  @Column('text', { nullable: true })
  gender: string;

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug.toLowerCase().replace(/ /g, '_').replace(/'/g, '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug.toLowerCase().replace(/ /g, '_').replace(/'/g, '');
  }
}

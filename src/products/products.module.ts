import { ProductImage } from './entities/product.images.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  // Define los controladores que pertenecen a este módulo.
  controllers: [ProductsController],

  // Define los proveedores que serán utilizados por este módulo.
  providers: [ProductsService],

  // Importa otros módulos que este módulo necesita.
  // TypeOrmModule.forFeature configura TypeORM para trabajar con las entidades Product y ProductImage.
  imports: [TypeOrmModule.forFeature([Product, ProductImage]), AuthModule],

  // Exporta los proveedores para que puedan ser utilizados por otros módulos.
  exports: [ProductsService],
})
export class ProductsModule {}

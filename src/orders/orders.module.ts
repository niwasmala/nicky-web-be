import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { Product } from '../products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), TypeOrmModule.forFeature([OrderItem]), TypeOrmModule.forFeature([Product])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}  
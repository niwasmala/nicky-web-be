import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { customAlphabet } from 'nanoid';
import { Product } from '../products/product.entity';
import { Order } from './order.entity';
import { CreateOrderDto } from './order.dto';

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async create(order: CreateOrderDto): Promise<Order> {
    let total_price = 0;
    
    for (let item of order.items) {
      const product = await this.productsRepository.findOne({where: { id: item.product_id }});
      
      item.price = product.price;
      item.name = product.name;
      item.photo = product.photo;
      
      total_price += item.price * item.quantity;
    }

    order.order_number = nanoid();
    order.total_price = total_price;
    order.change_money = order.buyer_money - order.total_price;

    return this.ordersRepository.save(order);
  }
}
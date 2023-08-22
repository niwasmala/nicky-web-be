import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Order } from './order.entity'

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  photo: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  total_price: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order
}
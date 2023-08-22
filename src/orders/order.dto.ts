export class CreateOrderItemDto {
  product_id: number;
  name: string;
  photo?: string;
  price: number;
  quantity: number;
  total_price: number;
}

export class CreateOrderDto {
  order_number: string;
  total_price: number;
  buyer_money: number;
  change_money: number;
  items: CreateOrderItemDto[];
}
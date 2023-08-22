export interface OrderItem {
  id: number;
  product_id: number;
  name: string;
  photo?: string;
  price: number;
  quantity: number;
  total_price: number;
}

export interface Order {
  id: number;
  order_number: string;
  total_price: number;
  buyer_money: number;
  change_money: number;
  items: OrderItem[];
}
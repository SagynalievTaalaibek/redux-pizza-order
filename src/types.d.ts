export interface ApiDish {
  title: string;
  price: string;
  image: string;
}

export interface Dish {
  id: string;
  title: string;
  price: string;
  image: string;
}

export interface ApiGetDish {
  [id: string]: ApiDish;
}

export interface OrderDish {
  dish: Dish;
  amount: number;
}

export interface OrderInterface {
  [id: string]: number
}

export interface Customer {
  name: string,
  address: string,
  phone: string,
}

export interface ApiOrder {
  order: OrderInterface;
  customer: Customer;
}



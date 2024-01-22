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

export interface Customer {
  name: string,
  address: string,
  phone: string,
}

export interface Order {
  id: string,
  order: { [id: string]: number; };
  customer: Customer;
}

export interface ApiOrder {
  order: { [id: string]: number; };
  customer: Customer;
}

export interface OrderDish {
  dish: Dish;
  amount: number;
}

export interface NewOrder {
  id: string;
  order: OrderDish[];
  customer: Customer;
}

export interface ApiNewOrder {
  [id: string]: ApiOrder;
}



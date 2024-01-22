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



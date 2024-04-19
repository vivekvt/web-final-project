export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  tags: string[];
  category: string[];
  stock: number;
  image: string;
}

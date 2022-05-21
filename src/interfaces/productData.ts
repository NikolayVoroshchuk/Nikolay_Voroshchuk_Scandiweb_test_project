import { ICategory } from "./productList";

export interface IProductData {
  category: {
    name: string;
    products: Array<ICategory>
  };
  getCategoryData: (name: string) => void;
}
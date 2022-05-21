export interface IProductDesc {
  product: {
    brand: string;
    category: string;
    description: string;
    gallery: any;
    id: string;
    inStock: boolean;
    attributes: Array<any>;
    name: string;
    prices: any;
  },
  imageIdx: number;
  attributeIdx: number;
}
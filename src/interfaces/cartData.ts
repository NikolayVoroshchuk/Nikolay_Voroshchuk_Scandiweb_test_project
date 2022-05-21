
export interface ICartData {
  cart: Array<{
    name: string;
    brand: string;
    prices: any;
    attribute: string;
    image: string;
    amount: number;
    attributesSelectedIdx: number;
  }>;
  quantity: number;
}

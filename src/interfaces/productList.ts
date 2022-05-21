interface IAttributes {
  id: string;
  name?: string;
  type?: string;
  __typename?: string;
}

interface ICurrency {
  label: string;
  symbol: string;
  __typename: string;
}

export interface IPrices {
  amount: number;
  currency: ICurrency;
  __typename: string;
}

export interface IProduct {
  id: string;
  attributes?: Array<IAttributes>;
  brand?: string;
  category?: string;
  description?: string;
  gallery?: Array<string>;
  inStock?: boolean;
  name?: string;
  prices?: IPrices;
  __typename?: string;
}

export interface ICategory {
  name?: string;
  products?: Array<IProduct>;
}

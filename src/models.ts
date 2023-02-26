export interface ICurrencies {
  [key: string]: ICurrency;
}

export interface ICurrency {
  CharCode: string;
  ID: string;
  Name: string;
  Nominal: number;
  NumCode: string;
  Previous: number;
  Value: number;
  Price: number;
}

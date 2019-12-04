export interface Country {
  name: string;
  country_code: string;
  population: number;
  currencies: Currency[];
}
export interface Currency {
  label: string;
  rate: number;
}

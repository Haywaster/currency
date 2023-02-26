import { useCurrencyInfo } from './useCurrencyInfo';

export const useExcangeRates = () => {
  const { ratesRef } = useCurrencyInfo();
  const arrayItems = [];

  for (let key in ratesRef.current) {
    const price = ratesRef.current[key].Value / ratesRef.current[key].Nominal;
    ratesRef.current[key].Price = price;
    arrayItems.push(ratesRef.current[key]);
  }

  return { arrayItems };
};

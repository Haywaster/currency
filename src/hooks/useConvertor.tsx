import React, { useState, useEffect } from 'react';
import { ICurrency } from '../models';
import { useCurrencyInfo } from './useCurrencyInfo';

export const useConvertor = () => {
  const { ratesRef, loading } = useCurrencyInfo();

  const [fromCurrency, setFromCurrency] = useState<string>('RUB');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [fromPrice, setFromPrice] = useState<number>(0);
  const [toPrice, setToPrice] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const getCurrentPrice = () => {
    const fromCurrencyObj: ICurrency = ratesRef.current[fromCurrency as keyof ICurrency];
    const toCurrencyObj: ICurrency = ratesRef.current[toCurrency as keyof ICurrency];

    const fromValueCurrency: number = fromCurrencyObj.Value;
    const fromCountCurrency: number = fromCurrencyObj.Nominal;

    const toValueCurrency: number = toCurrencyObj.Value;
    const toCountCurrency: number = toCurrencyObj.Nominal;

    const currentPriceFrom: number = fromValueCurrency / fromCountCurrency;
    const currentPriceTo: number = toValueCurrency / toCountCurrency;

    const currentPrice: number = +(currentPriceFrom / currentPriceTo).toFixed(3);

    setPrice(currentPrice);
    return currentPrice;
  };

  useEffect(() => {
    if (!loading) {
      getCurrentPrice();
    }
  }, [loading, fromCurrency, toCurrency]);

  const onChangeFromPrice = (e: React.ChangeEvent<HTMLInputElement> | number) => {
    const currentPrice = getCurrentPrice();

    if (typeof e === 'number') {
      const result = +(toPrice / currentPrice).toFixed(4);
      setFromPrice(result);
      return;
    }
    const inputValue = +e.target.value;
    const result = +(inputValue * currentPrice).toFixed(4);
    setToPrice(result);
    setFromPrice(inputValue);
  };

  const onChangeToPrice = (e: React.ChangeEvent<HTMLInputElement> | number) => {
    const currentPrice = getCurrentPrice();

    if (typeof e === 'number') {
      const result = +(currentPrice * fromPrice).toFixed(4);
      setToPrice(result);
      return;
    }
    const inputValue = +e.target.value;
    const result = +(inputValue / currentPrice).toFixed(4);
    setFromPrice(result);
    setToPrice(inputValue);
  };

  useEffect(() => {
    if (fromPrice) {
      onChangeFromPrice(fromPrice);
    }
  }, [fromCurrency]);

  useEffect(() => {
    if (toPrice) {
      onChangeToPrice(toPrice);
    }
  }, [toCurrency]);

  return {
    fromCurrency,
    toCurrency,
    fromPrice,
    toPrice,
    setFromCurrency,
    setToCurrency,
    onChangeFromPrice,
    onChangeToPrice,
    price,
    ratesRef
  };
};

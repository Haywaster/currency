import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Block from '../../components/Block';
import style from './Converter.module.css';

import { ICurrency, ICurrencies } from '../../models';

const Converter = () => {
  const [fromCurrency, setFromCurrency] = useState<string>('RUB');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [fromPrice, setFromPrice] = useState<number>(0);
  const [toPrice, setToPrice] = useState<number>(0);

  const ratesRef = useRef<ICurrencies>({});

  const onChangePrice = () => {
    const fromCurrencyObj: ICurrency = ratesRef.current[fromCurrency as keyof ICurrency];
    const toCurrencyObj: ICurrency = ratesRef.current[toCurrency as keyof ICurrency];

    const fromValueCurrency = fromCurrencyObj.Value;
    const fromCountCurrency = fromCurrencyObj.Nominal;

    const toValueCurrency = toCurrencyObj.Value;
    const toCountCurrency = toCurrencyObj.Nominal;

    const priceFrom = fromValueCurrency / fromCountCurrency;
    const priceTo = toValueCurrency / toCountCurrency;

    return { priceFrom, priceTo };
  };

  const onChangeFromPrice = (e: React.ChangeEvent<HTMLInputElement> | number) => {
    const { priceFrom, priceTo } = onChangePrice();

    if (typeof e === 'number') {
      const result = (priceTo / priceFrom) * toPrice;
      setFromPrice(result);
      return;
    }
    const inputValue = +e.target.value;
    const result = (inputValue * priceFrom) / priceTo;
    setToPrice(result);
    setFromPrice(inputValue);
  };

  const onChangeToPrice = (e: React.ChangeEvent<HTMLInputElement> | number) => {
    const { priceFrom, priceTo } = onChangePrice();

    if (typeof e === 'number') {
      const result = (priceFrom / priceTo) * fromPrice;
      setToPrice(result);
      return;
    }
    const inputValue = +e.target.value;
    const result = (inputValue * priceTo) / priceFrom;
    setFromPrice(result);
    setToPrice(inputValue);
  };

  useEffect(() => {
    axios
      .get('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(res => {
        const newObj = {
          ...res.data.Valute,
          RUB: {
            CharCode: 'RUB',
            ID: 0,
            Name: 'Российский рубль',
            Nominal: 1,
            NumCode: '1',
            Previous: 1,
            Value: 1
          }
        };
        ratesRef.current = newObj;
        // onChangeFromPrice(1);
      })
      .catch(err => console.error(err.message));
  }, []);

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

  return (
    <div className={style.converter}>
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
};

export default Converter;

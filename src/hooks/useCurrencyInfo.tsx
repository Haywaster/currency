import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { ICurrencies } from '../models';

export const useCurrencyInfo = () => {
  const ratesRef = useRef<ICurrencies>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.error(err.message);
      });
  }, []);

  return { ratesRef, loading };
};

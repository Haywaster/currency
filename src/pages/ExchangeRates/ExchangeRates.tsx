import React, { useState } from 'react';
import style from './ExchangeRates.module.css';

import { useExcangeRates } from '../../hooks/useExcangeRates';
import { ICurrency } from '../../models';

const ExchangeRates = () => {
  const [activeCur, setActiveCur] = useState<string>('RUB');
  const [activeCurValue, setActiveCurValue] = useState<number>(1);
  const { arrayItems } = useExcangeRates();

  const findCur = (el: ICurrency) => {
    setActiveCur(el.CharCode);
    setActiveCurValue(el.Price);
  };

  return (
    <div>
      <h2>Пожалуйста, выберите исходную валюту</h2>

      <div className={style.initial}>
        {arrayItems.map(el => (
          <div key={el.ID} onClick={() => findCur(el)} className={style.initial_currency}>
            {el.CharCode}
          </div>
        ))}
      </div>
      <div>
        <table className={style.valute_info}>
          <thead className={style.valute_info_header}>
            <tr>
              <th>Валюта</th>
              <th>Курс относительно {activeCur}</th>
            </tr>
          </thead>

          <tbody className={style.valute_info_body}>
            {arrayItems.map(el => {
              return (
                <tr key={el.ID}>
                  <td>{el.Name}</td>
                  <td>{(el.Price / activeCurValue).toFixed(3)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExchangeRates;

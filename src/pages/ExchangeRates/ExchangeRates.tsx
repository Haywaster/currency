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
        <div className={style.initial_currency}>
          <svg
            width='10'
            height='6'
            viewBox='0 0 10 6'
            fill='none'
            style={{ marginRight: '10px' }}
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
              fill='#2C2C2C'
            />
          </svg>
          Другое
        </div>
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

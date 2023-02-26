import React, { useState } from 'react';
import Modal from '../Modal';
import style from './Block.module.css';
import { ICurrencies } from '../../models';

interface BlockProps {
  value: number;
  currency: string;
  onChangeCurrency: (cur: string) => void;
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  price: number;
  otherCurrency: string;
  allData: ICurrencies;
}

const defaultCurrencies = ['RUB', 'USD', 'EUR'];

const Block = ({
  value,
  currency,
  onChangeCurrency,
  onChangeValue,
  price,
  otherCurrency,
  allData
}: BlockProps) => {
  const [openModal, setOpenModal] = useState(false);

  const modalHandler = () => {
    setOpenModal(prev => !prev);
  };

  return (
    <div className={style.block}>
      <ul className={style.currencyes}>
        {defaultCurrencies.map(cur => (
          <li
            onClick={() => onChangeCurrency(cur)}
            className={currency === cur ? style.active : ''}
            key={cur}>
            {cur}
          </li>
        ))}
        <li className={openModal ? style.active : ''} onClick={modalHandler}>
          <svg className={style.arrow} viewBox='0 0 5 9'>
            <path d='M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z' />
          </svg>
        </li>
      </ul>
      <div className={style.input_box}>
        <input onChange={onChangeValue} value={value} type='number' placeholder='Валюта' />
        <div className={style.currency}>
          1 {currency} = {price} {otherCurrency}
        </div>
      </div>
      {openModal && (
        <Modal closeModal={modalHandler} onChangeCurrency={onChangeCurrency} allData={allData} />
      )}
    </div>
  );
};

export default Block;

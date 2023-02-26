import React from 'react';
import { ICurrencies, ICurrency } from '../../models';
import style from './Modal.module.css';

interface ModalProps {
  allData: ICurrencies;
  onChangeCurrency: (cur: string) => void;
  closeModal: () => void;
}

const Modal = ({ allData, onChangeCurrency, closeModal }: ModalProps) => {
  const arrItems = [];

  for (const key in allData) {
    arrItems.push(allData[key]);
  }

  const currencyHandler = (el: ICurrency) => {
    onChangeCurrency(el.CharCode);
    closeModal();
  };

  return (
    <div className={style.modal}>
      {arrItems.map(el => (
        <div onClick={() => currencyHandler(el)} className={style.modal_elem} key={el.ID}>
          <div>{el.Name}</div>
          <div className={style.briff}>{el.CharCode}</div>
        </div>
      ))}
    </div>
  );
};

export default Modal;

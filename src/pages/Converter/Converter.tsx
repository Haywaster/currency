import { useConvertor } from '../../hooks/useConvertor';

import Block from '../../components/Block';
import arrow from '../../image/transfer.svg';

import style from './Converter.module.css';

const Converter = () => {
  const {
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
  } = useConvertor();

  return (
    <div className={style.converter}>
      <Block
        allData={ratesRef.current}
        price={price}
        value={fromPrice}
        otherCurrency={toCurrency}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <div className={style.img_area}>
        <img src={arrow} alt='arrow' />
      </div>
      <Block
        allData={ratesRef.current}
        price={+(1 / price).toFixed(3)}
        value={toPrice}
        otherCurrency={fromCurrency}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
};

export default Converter;

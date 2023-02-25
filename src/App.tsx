import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Converter from './pages/Converter';
import ExchangeRates from './pages/ExchangeRates';

import style from './App.module.css';

const App = () => {
  return (
    <div className={style.App}>
      <Header />
      <div className={style.container}>
        <Routes>
          <Route path='/' element={<ExchangeRates />} />
          <Route path='/converter' element={<Converter />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.css';

const Header = () => {
  return (
    <header className={style.header}>
      <h1 className={style.logo}>Exchange Rate💲</h1>
      <nav className={style.links}>
        <Link className={style.link} to='/'>
          Курс валют
        </Link>
        <Link className={style.link} to='/converter'>
          Конвертер
        </Link>
      </nav>
    </header>
  );
};

export default Header;

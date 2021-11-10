import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className='header'>
      <div className='header__left'>
        <div className='header__left__logo'>
          <img
            loading='lazy'
            src='./images/olilogo.png'
            alt='logo'
            className='logo'
          />
          <p>Olicargo</p>
        </div>

        <div className='header__left__flag'>
          <div className='container'>
            <img
              loading='lazy'
              src='./images/portugal-flag.png'
              alt='Portugal flag'
              className='pt'
            />
            <p>PT</p>
          </div>
          <div className='container'>
            <img
              src='./images/united-kingdom-flag.png'
              alt='English flag'
              className='en'
            />
            <p>PT</p>
          </div>
        </div>
      </div>
      <div className='header__right'>
        {/* Field 3*/}
        {/* Field 2 */}
        {/* Field 1 */}
        {/* Avatar like? */}
      </div>
    </div>
  );
}

export default Header;

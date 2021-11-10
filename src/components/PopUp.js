import React from 'react';
import './PopUp.css';

const Popup = ({ feature }) => {
  const { id, name, url } = feature.properties;

  return (
    <div id={`popup-${id}`} className='popup__container'>
      <img alt={id} src={url} />
      <div className='popup__logo'>
        <img
          loading='lazy'
          src='./images/olilogo.png'
          alt='logo'
          className='homelogo'
        />
        <div className='popup__logo_p'>
          <p className='popup__brandname'>Olicargo</p>
          <p className='popup__quote'>Some random text</p>
        </div>
      </div>
      <h3>{name}</h3>
      <div className='popup__description'>
        Click{' '}
        <span className='popup__description__span'>
          <a href='/'>here </a>
        </span>{' '}
        to explore our instalations and services in {name} and don't forget to
        check the other Olicargo locations.
      </div>
    </div>
  );
};

export default Popup;

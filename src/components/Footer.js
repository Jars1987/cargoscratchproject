import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <div className='footer__left'>
        <p>Sketch project for Olicargo</p>
      </div>
      <div className='footer__center'>
        <p>
          Chech other projects on: <a href='/'> www.ApolloSurfer.com </a>
        </p>
      </div>
      <div className='footer__right'>
        <p>@TM Apollo Surfer 2021 </p>
      </div>
    </div>
  );
}

export default Footer;

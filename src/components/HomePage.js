import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import Map from './Map';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Footer from './Footer';

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [packages, setPackages] = useState(3456285);

  const packagesDelivered = () => {
    return packages.toLocaleString('en');
  };

  useEffect(() => {
    setTimeout(() => setPackages(packages + 1), 3000);
  });

  const mobileMenu = () => {
    if (menuOpen) {
      return (
        <div className='homeheader_menu'>
          <Link className='homeheader__menulink' to='/'>
            <p>News</p>
          </Link>
          <Link className='homeheader__menulink' to='/services'>
            <p>Services</p>
          </Link>
          <Link className='homeheader__menulink' to='/'>
            <p>Track & Trace</p>
          </Link>
        </div>
      );
    } else {
      return;
    }
  };

  return (
    <div className='homeheader'>
      <div className='homeheader__left'>
        <Link className='homeheader__link' to='/'>
          <div className='homeheader__left__logo'>
            <img
              loading='lazy'
              src='./images/olilogo.png'
              alt='logo'
              className='homelogo'
            />
            <p>Olicargo</p>
          </div>
        </Link>
        <div className='homeheader__left__flag'>
          <div className='container'>
            <img
              loading='lazy'
              src='./images/portugal-flag.png'
              alt='Portugal flag'
            />
            <p>PT</p>
          </div>
          <div className='homecontainer'>
            <img src='./images/united-kingdom-flag.png' alt='English flag' />
            <p>PT</p>
          </div>
        </div>
      </div>
      <div className='homeheader__rightComponent'>
        <div className='homeheader__right'>
          <MenuIcon
            className='homeheader__menuButton'
            onClick={() => setMenuOpen(!menuOpen)}
          />
          <Link className='homeheader__link' to='/'>
            <p>News</p>
          </Link>
          <Link className='homeheader__link' to='/services'>
            <p>Services</p>
          </Link>
          <Link className='homeheader__link' to='/'>
            <p>Track and Trace</p>
          </Link>
          <div className='homeheader__signIn'>
            <AccountCircleIcon className='Home__avatar' />
            <p>Sign In</p>
          </div>
        </div>

        {mobileMenu()}
      </div>
      <div className='map__container'>
        <Map />
      </div>
      <div className='homeheader__counter'>
        <p className='homeehader__counter__display'>{packagesDelivered()}</p>
        <p className='homeehader__counter__description'>
          Number of Packages <br />
          Delivered in 2021
        </p>
      </div>
      <div className='homeheader__animation__container'>
        <p className='homeehader__animation__p1'>
          Olicargo with you, anywhere.
        </p>
      </div>
      <div className='homeheader__footer'>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/images/footer-logo.png';
import master from '../../assets/svgs/logo-master.svg';
import visa from '../../assets/images/logo-visa.png';
import amex from '../../assets/images/logo-amex.png';
import stripe from '../../assets/svgs/logo-stripe.svg';
import headphone from '../../assets/svgs/icon-headphone.svg';

const Footer: React.FC = () => {
  return (
    <div className='footer-section'>
      <div className='container-md custom-responsive'>
        <div className='footer-row'>
          <div id='footer-logo'>
            <Link href='/'>
              <a>
                <Image src={logo} alt='footer-logo' />
              </a>
            </Link>
          </div>
          <div className='footer-contact'>
            <Image src={headphone} alt='headphone' />
            <p>
              <a href='tel:(949) 676 7522 (7522)'>(949) 676-SLAB (7522)</a>
            </p>
          </div>
        </div>
        <div className='footer-row'>
          <div className='d-flex'>
            <div className='cards'>
              <Image src={stripe} alt='payment-card' />
            </div>
            <div className='cards'>
              <Image src={master} alt='payment-card' />
            </div>
            <div className='cards'>
              <Image src={visa} alt='payment-card' />
            </div>
            <div className='cards'>
              <Image src={amex} alt='payment-card' />
            </div>
          </div>
          <div className='footer-link'>
            {/* <p>Create An Wholesale Account</p> */}
            <p>
              <Link href='/contact' as='/contact'>
                <a>CONTACT US</a>
              </Link>
            </p>
            <p>
              <Link href='/faq' as='/faq'>
                <a>FAQ</a>
              </Link>
            </p>
          </div>
        </div>
        <div className='copyrighy'>
          <p>Copyright 2021 © Buy Quartz Online, LLC.</p>
          <a href='mailto:info@quartzstonedirect.com' className='footer-help'>
            HELP?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

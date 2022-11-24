import React, { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Banner from '../../assets/images/home-hero-banner.png';
import LogoViatera from '../../assets/images/logo-viatera.png';
import LogoCaesarstone from '../../assets/images/logo-caesarstone.png';
import LogoCambria from '../../assets/images/logo-cambria.png';
import LogoSilestone from '../../assets/images/logo-silestone.png';
import LogoDekton from '../../assets/images/logo-dekton.png';

const brands = [LogoViatera, LogoCaesarstone, LogoCambria, LogoSilestone, LogoDekton];

const Hero: React.FC = () => {
  return (
    <Fragment>
      <section className='hero-banner'>
        <div className='thumbnail'>
          <Image src={Banner} alt='' />
          <div className='banner-overlay' />
        </div>
        <div className='base-content'>
          <h3>Quartz, Porcelain, and Dekton Slabs</h3>
          {/* <p>We are proudly offering all the well known brands in the market online</p> */}
          <p className='text-center'>
            Proudly offering customers brand name materials, wholesale pricing, and direct shipping
            to their selected fabricator.
          </p>
          {/* <p>Brand Name Slabs + Direct Online Pricing</p> */}
          <Link href='/shop'>
            <a className='btn btn-primary btn-shop'>Shop Now</a>
          </Link>
        </div>
      </section>
      <section className='brands-section'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 mb-5'>
              <div className='brands'>
                <ul className='brands_list'>
                  {brands.map((item, index) => (
                    <li key={index}>
                      <Image src={item} alt='Viatera' />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Hero;

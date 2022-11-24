import React from 'react';
import Image from 'next/image';
import Thumbnail from '../../assets/images/faq-thumbnail.png';

const Hero: React.FC = () => {
  return (
    <section className='faq-hero'>
      <div className='thumbnail'>
        <Image src={Thumbnail} alt='FAQ' className='d-none d-sm-block' />
        <div className='banner-overlay' />
      </div>
      <div className='page-title'>
        <h1>FAQ</h1>
      </div>
    </section>
  );
};
export default Hero;

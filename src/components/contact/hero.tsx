import React from 'react';
import Image from 'next/image';

import ContactForm from './contactForm';
import Thumbnail from '../../assets/images/contact-thumbnail.png';

const Hero: React.FC = () => {
  return (
    <section className='contact-hero'>
      <div className='thumbnail'>
        <Image src={Thumbnail} alt='' />
        <div className='banner-overlay' />
      </div>
      <ContactForm />
    </section>
  );
};

export default Hero;

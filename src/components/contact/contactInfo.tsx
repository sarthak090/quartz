import React from 'react';
import Image from 'next/image';
import Headphone from '../../assets/svgs/icon-headphone-fill.svg';
import Bag from '../../assets/svgs/icon-bag-fill.svg';

const ContactInfo: React.FC = () => {
  return (
    <section className='contact-info'>
      <div className='toll-free'>
        <p>
          <Image src={Headphone} alt='' />
          <span>Toll Free :</span>(949) 676-SLAB (7522)
        </p>
      </div>
      <div className='opening-hours'>
        <p>
          <Image src={Bag} alt='' />
          <span>Hours (Pacific Time) :</span>Mon – Fri : 9:00am – 5:00pm
        </p>
      </div>
      <div>
        <p className='caption'>
          We value and appreciate your feedback, suggestions or complaints in order to improve our
          services and the way we communicate.
        </p>
      </div>
    </section>
  );
};
export default ContactInfo;

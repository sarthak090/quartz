import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ShippingBannerBG from '../../assets/images/shipping-banner-bg.png';

const ShippingBanner: React.FC = () => {
  return (
    <section className='shipping-banner'>
      <div className='thumbnail'>
        <Image src={ShippingBannerBG} alt='' />
        <div className='banner-overlay' />
      </div>
      <div className='base-content'>
        <h3>SHIPPING AVAILABLE NATIONWIDE</h3>
        <p>Shipping cost available at check out page. Please click here to see how.</p>
        <p>Shipping is only available to locations with forklift on site.</p>
        <Link href='/shop'>
          <a className='btn btn-primary btn-shop'>Shop Now</a>
        </Link>
      </div>
    </section>
  );
};

export default ShippingBanner;

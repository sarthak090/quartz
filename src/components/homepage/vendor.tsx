import * as React from 'react';
import Link from 'next/link';

const Vendor: React.FC = () => {
  return (
    <section className='vendor-section'>
      <div className='thumbnail'>
        <div className='banner-overlay' />
      </div>
      <div className='section-title'>
        <h4>
          <Link href='/register' as='/register'>
            <a>
              <strong>ARE YOU AN INDUSTRY PARTNER?</strong>
            </a>
          </Link>
        </h4>
        <h5>
          <Link href='/register' as='/register'>
            <a>
              Please <strong>CLICK HERE</strong> to set up an account.
            </a>
          </Link>
        </h5>
      </div>
    </section>
  );
};

export default Vendor;

import React, { Fragment } from 'react';
import { NextPage } from 'next';
import Product from '../components/common/product';
import { useSiteContext } from '../context';

const Wishlist: NextPage = () => {
  const { updateFvtLength, wishList } = useSiteContext();

  return (
    <Fragment>
      <div className='mt-5 mb-5'>
        <div className='container'>
          <div className='row'>
            <h1>My Wishlist on Quartz Stone Direct</h1>
          </div>
        </div>
      </div>
      <div className='mt-5 mb-5'>
        {wishList.length > 0 ? (
          <div className='container'>
            <div className='row'>
              {wishList.map((item: any, index: number) => (
                <Product
                  id={item.id}
                  title={item.title}
                  paSizes={item.attributes}
                  price={item.price}
                  image={item.image}
                  slug={item.slug}
                  key={index}
                  updateFvt={updateFvtLength}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className='d-flex align-items-center mt-5 mb-5' style={{ height: 150 }}>
            <div className='container text-center' style={{ opacity: 0.5 }}>
              <h2>No products added to the wishlist</h2>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Wishlist;

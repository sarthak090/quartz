import React from 'react';
import Image from 'next/image';

function formatCurrency(value: string) {
  return Number(value.replace(/,/g, '')).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

interface Props {
  products: any[];
  onChangeProductQuantity: (args: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveProduct: (args: number) => void;
}

const ProductList: React.FC<Props> = ({ products, onChangeProductQuantity, onRemoveProduct }) => {
  return (
    <section>
      <ul className='products'>
        {products.map((product, index) => {
          return (
            <li className='row' key={index}>
              <div className='col'>
                <div className='thumbnail'>
                  <Image
                    src={
                      product.image === null || product.image === undefined
                        ? 'https://cms.quartzstonedirect.com/wp-content/uploads/woocommerce-placeholder.png'
                        : product.image
                    }
                    alt={product.name}
                    height={150}
                    width={200}
                    objectFit='cover'
                  />
                </div>
                <div className='detail'>
                  <div className='name'>
                    <a href='#'>
                      {product.name} {product?.attribute && <span>, {product.attribute}</span>}{' '}
                    </a>
                  </div>
                  <div className='description'>{product.description}</div>
                  <div className='price'>{formatCurrency(product.price)}</div>
                </div>
              </div>

              <div className='col col-mobile'>
                <div className='quantity'>
                  <input
                    type='number'
                    className='quantity'
                    step='1'
                    value={product.quantity}
                    onChange={(event) => onChangeProductQuantity(index, event)}
                  />
                </div>

                <div className='remove'>
                  <svg
                    onClick={() => onRemoveProduct(index)}
                    version='1.1'
                    className='close'
                    x='0px'
                    y='0px'
                    viewBox='0 0 60 60'
                    enableBackground='new 0 0 60 60'>
                    <polygon points='38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812' />
                  </svg>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ProductList;

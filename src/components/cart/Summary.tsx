import React from 'react';
import { useRouter } from 'next/router';

import { useSiteContext } from '../../context';

function formatCurrency(value: number) {
  return Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

interface Props {
  subTotal: number;
  discount: number;
  tax: number;
  // onEnterPromoCode?: (args: React.ChangeEvent<HTMLInputElement>) => void;
  // checkPromoCode?: () => void;
}

const Summary: React.FC<Props> = ({
  subTotal,
  discount,
  tax,
  // onEnterPromoCode,
  // checkPromoCode,
}) => {
  const router = useRouter();
  const { setTotalPrice } = useSiteContext();
  const total = subTotal - discount + tax;

  const _checkout = () => {
    setTotalPrice(total);
    router.push('/checkout');
  };
  return (
    <div className='bottom-cart'>
      {/* <div className='promotion'>
        <label htmlFor='promo-code'>Have A Promo Code?</label>
        <input type='text' onChange={onEnterPromoCode} />
        <button type='button' onClick={checkPromoCode} className='cart-btn'>
          Apply{' '}
        </button>
      </div> */}

      <div className='summary'>
        <ul>
          <li>
            Subtotal <span>{formatCurrency(subTotal)}</span>
          </li>
          {discount > 0 && (
            <li>
              Discount <span>{formatCurrency(discount)}</span>
            </li>
          )}
          <li>
            Tax <span>{formatCurrency(tax)}</span>
          </li>
          <li className='total'>
            Total <span>{formatCurrency(total)}</span>
          </li>
        </ul>

        <button type='button' onClick={_checkout} className='cart-btn'>
          Check Out
        </button>
      </div>
    </div>
  );
};

export default Summary;

import React, { useEffect, Fragment } from 'react';
import CryptoJS from 'crypto-js/aes';
import Summary from '../../components/cart/Summary';
import ProductList from '../../components/cart/ProductList';
import Header from '../../components/cart/Header';
import { useRouter } from 'next/router';
import { useSiteContext } from '../../context';

// const PROMOTIONS = [
//   {
//     code: 'SUMMER',
//     discount: '50%',
//   },
//   {
//     code: 'AUTUMN',
//     discount: '40%',
//   },
//   {
//     code: 'WINTER',
//     discount: '30%',
//   },
// ];

const TAX = 0;

const Cart: React.FC = () => {
  const router = useRouter();
  const { updateCartLength, list } = useSiteContext();
  const [products, setProducts] = React.useState<any>(list);
  // const [promoCode, setPromoCode] = React.useState('');
  // const [discountPercent, setDiscountPercent] = React.useState(0);

  useEffect(() => {
    // const items = JSON.parse(localStorage.getItem('@cartItems')!);
    // if (items !== null) {
    //   setProducts(items);
    // }
    setProducts(list);
  }, [list]);

  const itemCount = products.reduce((quantity: number, product: any) => {
    return quantity + +product.quantity;
  }, 0);
  const subTotal = products.reduce((total: number, product: any) => {
    return total + parseFloat(String(product.price).replace(/,/g, '')) * +product.quantity;
  }, 0);
  // const discount = (subTotal * discountPercent) / 100;

  const onChangeProductQuantity = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const valueInt = parseInt(value);
    const cloneProducts: any[] = [...products];
    // Minimum quantity is 1, maximum quantity is 100, can left blank to input easily
    if (value === '') {
      cloneProducts[index].quantity = value;
    } else if (valueInt > 0 && valueInt < 100) {
      cloneProducts[index].quantity = valueInt;
    }
    const encryptText = CryptoJS.encrypt(
      JSON.stringify(cloneProducts),
      process.env.CART_SECRET_KEY || ''
    ).toString();

    localStorage.setItem('@key_product', encryptText);
    // localStorage.setItem('@cartItems', JSON.stringify(cloneProducts));
    setProducts(cloneProducts);
  };

  const onRemoveProduct = (i: number) => {
    const filteredProduct = products.filter((product: any, index: number) => {
      return index != i;
    });
    const encryptText = CryptoJS.encrypt(
      JSON.stringify(filteredProduct),
      process.env.CART_SECRET_KEY || ''
    ).toString();

    localStorage.setItem('@key_product', encryptText);

    // localStorage.setItem('@cartItems', JSON.stringify(filteredProduct));
    setProducts(filteredProduct);
    updateCartLength();
  };

  // const onEnterPromoCode = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPromoCode(event.target.value);
  // };

  // const checkPromoCode = () => {
  //   for (let i = 0; i < PROMOTIONS.length; i++) {
  //     if (promoCode === PROMOTIONS[i].code) {
  //       setDiscountPercent(parseFloat(PROMOTIONS[i].discount.replace('%', '')));

  //       return;
  //     }
  //   }

  //   alert('Sorry, the Promotional code you entered is not valid!');
  // };

  return (
    <Fragment>
      <div className='container'>
        <div className='cart'>
          <Header itemCount={itemCount} />

          {products.length > 0 ? (
            <div>
              <ProductList
                products={products}
                onChangeProductQuantity={onChangeProductQuantity}
                onRemoveProduct={onRemoveProduct}
              />

              <Summary
                subTotal={subTotal}
                discount={0}
                tax={TAX}
                // onEnterPromoCode={onEnterPromoCode}
                // checkPromoCode={checkPromoCode}
              />
            </div>
          ) : (
            <div className='empty-product'>
              <h3>There are no products in your cart.</h3>
              <button onClick={() => router.push('/shop')} className='cart-btn'>
                Shopping now
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
export default Cart;

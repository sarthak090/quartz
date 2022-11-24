import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import CryptoJS from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';

type contextType = {
  cartLength: number;
  total: number;
  fvtLength: number;
  wishList: any;
  list: any;
  setTotalPrice: (args: number) => void;
  updateCartLength: () => void;
  updateFvtLength: () => void;
};

const contextDefaultValues: contextType = {
  cartLength: 0,
  total: 0,
  fvtLength: 0,
  wishList: [],
  list: [],
  setTotalPrice: () => {},
  updateCartLength: () => {},
  updateFvtLength: () => {},
};

const SiteContext = createContext<contextType>(contextDefaultValues);

export function useSiteContext() {
  return useContext(SiteContext);
}

type Props = {
  children: ReactNode;
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [cartLength, setCartLength] = useState<number>(0);
  const [fvtLength, setFvtLength] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [wishList, setWishList] = useState<any>([]);
  const [list, setList] = useState<any>([]);

  const setTotalPrice = (price: number) => {
    setTotal(price);
  };

  useEffect(() => {
    if (localStorage.getItem('@key_product')) {
      const encrypt = localStorage.getItem('@key_product')!;
      const bytes = CryptoJS.decrypt(encrypt, process.env.CART_SECRET_KEY || '');

      const cart = JSON.parse(bytes.toString(CryptoENC));
      const subTotal = cart.reduce((total: number, product: any) => {
        return total + parseFloat(String(product.price).replace(/,/g, '')) * +product.quantity;
      }, 0);

      setTotal(subTotal);
    }
    // if (localStorage.getItem('@cartItems')) {
    //   const cart = JSON.parse(localStorage.getItem('@cartItems')!);
    //   const subTotal = cart.reduce((total: number, product: any) => {
    //     return total + product.price * +product.quantity;
    //   }, 0);

    //   setTotal(subTotal);
    // }
    updateCartLength();
    updateFvtLength();
  }, []);

  const updateCartLength = () => {
    if (localStorage.getItem('@key_product')) {
      const encrypt = localStorage.getItem('@key_product')!;
      const bytes = CryptoJS.decrypt(encrypt, process.env.CART_SECRET_KEY || '');
      const cart = JSON.parse(bytes.toString(CryptoENC));

      setCartLength(cart.length);
      setList(cart);
    } else {
      setList([]);
      setCartLength(0);
    }
    // if (localStorage.getItem('@cartItems')) {
    //   const cart = JSON.parse(localStorage.getItem('@cartItems')!);

    //   setCartLength(cart.length);
    // }
  };
  const updateFvtLength = () => {
    if (localStorage.getItem('@fvtItems')) {
      const fvt = JSON.parse(localStorage.getItem('@fvtItems')!);
      setFvtLength(fvt.length);
      setWishList(fvt);
    }
  };

  const value = {
    cartLength,
    total,
    fvtLength,
    wishList,
    list,
    setTotalPrice,
    updateCartLength,
    updateFvtLength,
  };

  return (
    <>
      <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
    </>
  );
};

import React, { useState, useEffect, Fragment } from 'react';
import { useSiteContext } from '../context';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import axios from 'axios';
import countrylist from '../constants/country.json';
import Router from 'next/router';
import { validateEmail, isNumber, validatePhone } from '../utils/validator';

const CARD_OPTIONS = {
  hidePostalCode: true,
  style: {
    base: {
      // iconColor: '#c4f0ff',
      color: '#000',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#777',
      },
    },
    invalid: {
      iconColor: '#9e2146',
      color: '#9e2146',
    },
  },
};

const Checkout: React.FC = () => {
  const { total, updateCartLength, list } = useSiteContext();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<any>(null);
  const [shipping, setShipping] = useState(true);
  const [country, setCountry] = useState('');
  const [shippingCountry, setShippingCountry] = useState('');
  const [processing, setProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    city: '',
    postalCode: '',
    email: '',
    address: '',
    phone: '',
  });
  const [shippingAddress, setShippingAddress] = useState({
    s_firstName: '',
    s_lastName: '',
    s_city: '',
    s_postalCode: '',
    s_address: '',
  });

  useEffect(() => {
    if (total === 0) {
      window.location.replace('/');
    }
  }, [total]);

  const onChangeCountry = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const value = evt.target.value;
    setCountry(value);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const onChangeShippingCountry = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const value = evt.target.value;
    setShippingCountry(value);
  };

  const handleShippingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setShippingAddress({
      ...shippingAddress,
      [evt.target.name]: value,
    });
  };

  const hanldeCheckbox = () => {
    setShipping(!shipping);
  };

  const handleSubmit = async () => {
    const { firstName, lastName, city, postalCode, email, address, phone } = state;
    const { s_firstName, s_lastName, s_address, s_city, s_postalCode } = shippingAddress;

    if (firstName === '' || lastName === '' || country === '' || city === '') {
      toast.error('All fields are required!');
    } else if (!validateEmail(email)) {
      toast.error('Invalid email address');
    } else if (!isNumber(postalCode)) {
      toast.error('Post code should be a number');
    } else if (!validatePhone(phone)) {
      toast.error('Invalid phone number');
    } else if (address === '') {
      toast.error('All fields are required!');
    } else {
      if (!shipping) {
        if (s_firstName === '' || s_lastName === '' || shippingCountry === '' || s_city === '') {
          toast.error('Shipping fields are required!');
          return;
        } else if (!isNumber(s_postalCode)) {
          toast.error('Post code should be a number');
          return;
        } else if (s_address === '') {
          toast.error('Shipping address is required!');
          return;
        }
      }

      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }

      if (error) {
        elements.getElement('card')!.focus();
        return;
      }

      const billingDetails = {
        name: `${firstName} ${lastName}`,
        email: email,
        address: {
          country: country,
          line1: address,
          state: city,
          postal_code: postalCode,
        },
      };
      if (cardComplete) {
        setProcessing(true);
      } else {
        toast.error('Card detail required!');
        return;
      }
      // const cartItems = localStorage.getItem('@cartItems');
      // if (cartItems) {
      //   console.log('----items', JSON.parse(cartItems));
      // }

      const data = {
        billing: {
          first_name: firstName,
          last_name: lastName,
          address_1: address,
          city: city,
          postcode: postalCode,
          country: country,
          email: email,
          phone: phone,
        },
        shipping: {
          first_name: shipping ? firstName : s_firstName,
          last_name: shipping ? lastName : s_lastName,
          address_1: shipping ? address : s_address,
          city: shipping ? city : s_city,
          postcode: shipping ? postalCode : s_postalCode,
          country: shipping ? country : shippingCountry,
          email: email,
        },
      };

      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        try {
          const { data: clientSecret } = await axios.post('/api/stripe-payment', {
            amount: total * 100,
          });

          const payload = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: billingDetails,
          });

          if (payload.error) {
            setError(payload?.error?.message || '');
            setProcessing(false);
            return;
          }

          const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: payload.paymentMethod.id,
          });

          if (error) {
            setError(error.message || '');
            setProcessing(false);
            return;
          } else {
            _saveOrder(data);
          }
        } catch (err: any) {
          setError(err.message || '');
          setProcessing(false);
        }
      }
    }
  };
  const _saveOrder = async (data: any) => {
    // const cartItemsLocal = localStorage.getItem('@cartItems');
    // const cartItems = JSON.parse(cartItemsLocal!);
    const lineItems = list.map((item: any) => {
      const price = parseFloat(item.price) * parseFloat(item.quantity);
      if (item.variationId) {
        return {
          product_id: item.product_id,
          quantity: item.quantity,
          price: price.toFixed(2),
          name: item.name,
          variation_id: item.variationId,
        };
      } else {
        return {
          product_id: item.product_id,
          quantity: item.quantity,
          price: price.toFixed(2),
          name: item.name,
        };
      }
    });
    const orderDetail = {
      set_paid: true,
      billing: data.billing,
      shipping: data.shipping,
      line_items: lineItems,
    };
    axios
      .post(`${process.env.API_URL}/api/orders`, {
        data: orderDetail,
      })
      .then(async () => {
        setProcessing(false);
        localStorage.setItem('@cartItems', JSON.stringify([]));
        updateCartLength();
        toast.success('Order Placed Successfully');
        await Router.push('/');
      })
      .catch(() => {
        setProcessing(false);
        toast.error('Something went wrong while placing order!');
      });
  };
  if (total === 0) {
    return <></>;
  }

  return (
    <Fragment>
      <div className='container checkout'>
        <h5>Total Amount: ${total}</h5>
        <h3>Billing Address</h3>
        <div className='row'>
          <div className='col-sm-12 col-md-10'>
            <form>
              <div className='row'>
                <div className='col-sm-12 col-md-6 mb-3'>
                  <label htmlFor='firstName'>First Name</label>
                  <input
                    type='text'
                    className='form-control align-left'
                    name='firstName'
                    value={state.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-sm-12 col-md-6 mb-3'>
                  <label htmlFor='lastName'>Last Name</label>
                  <input
                    type='text'
                    className='form-control align-left'
                    name='lastName'
                    value={state.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='row'>
                <div className='col-sm-12 col-md-6 mb-3'>
                  <label>Your Country</label>
                  <select
                    value={country}
                    onChange={onChangeCountry}
                    className='form-control custom-select'>
                    <option value={''}></option>
                    {countrylist.map((i, index) => (
                      <option value={i.code} key={index}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='col-sm-12 col-md-6 mb-3'>
                  <label>City</label>
                  <input
                    type='text'
                    className='form-control align-left'
                    name='city'
                    value={state.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='row'>
                <div className='col-sm-12 col-md-6 mb-3'>
                  <label>Postal Code</label>
                  <input
                    type='text'
                    className='form-control align-left'
                    name='postalCode'
                    value={state.postalCode}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-sm-12 col-md-6 mb-3'>
                  <label>Email Address</label>
                  <input
                    type='email'
                    className='form-control align-left'
                    name='email'
                    onChange={handleChange}
                    value={state.email}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-12 col-md-6 mb-3'>
                  <label>Phone Number</label>
                  <input
                    type='text'
                    className='form-control align-left'
                    name='phone'
                    value={state.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-sm-12 col-md-6 mb-3'>
                  <label>Address</label>
                  <input
                    type='text'
                    className='form-control align-left'
                    name='address'
                    onChange={handleChange}
                    value={state.address}
                  />
                </div>
              </div>
              <div className='col-sm-12 col-md-6 mb-3'>
                <input
                  type='checkbox'
                  checked={shipping}
                  onChange={hanldeCheckbox}
                  style={{ marginRight: 5 }}
                />
                Shipping address same as billing
              </div>
              {!shipping && (
                <div>
                  <h3>Shipping Address</h3>
                  <div className='row'>
                    <div className='col-sm-12 col-md-6 mb-3'>
                      <label htmlFor='firstName'>First Name</label>
                      <input
                        type='text'
                        className='form-control align-left'
                        name='s_firstName'
                        value={shippingAddress.s_firstName}
                        onChange={handleShippingChange}
                      />
                    </div>
                    <div className='col-sm-12 col-md-6 mb-3'>
                      <label htmlFor='lastName'>Last Name</label>
                      <input
                        type='text'
                        className='form-control align-left'
                        name='s_lastName'
                        value={shippingAddress.s_lastName}
                        onChange={handleShippingChange}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-12 col-md-6 mb-3'>
                      <label>Your Country</label>
                      <select
                        value={shippingCountry}
                        onChange={onChangeShippingCountry}
                        className='form-control custom-select'>
                        <option value={''}></option>
                        {countrylist.map((i, index) => (
                          <option value={i.code} key={index}>
                            {i.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='col-sm-12 col-md-6 mb-3'>
                      <label>City</label>
                      <input
                        type='text'
                        className='form-control align-left'
                        name='s_city'
                        value={shippingAddress.s_city}
                        onChange={handleShippingChange}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-12 col-md-6 mb-3'>
                      <label>Postal Code</label>
                      <input
                        type='text'
                        className='form-control align-left'
                        name='s_postalCode'
                        value={shippingAddress.s_postalCode}
                        onChange={handleShippingChange}
                      />
                    </div>
                    <div className='col-sm-12 col-md-6 mb-3'>
                      <label>Address</label>
                      <input
                        type='text'
                        className='form-control align-left'
                        name='s_address'
                        value={shippingAddress.s_address}
                        onChange={handleShippingChange}
                      />
                    </div>
                  </div>
                </div>
              )}
              <label>Card Detail</label>
              <div
                style={{
                  marginTop: 10,
                  marginLeft: 5,
                  backgroundColor: '#F6F6F6',
                  padding: 17,
                  borderRadius: 5,
                }}>
                <CardElement
                  options={CARD_OPTIONS}
                  onChange={(e: any) => {
                    setError(e.error || '');
                    setCardComplete(e.complete);
                  }}
                />
              </div>
              <br />
            </form>
            {error && <ErrorMessage>{error?.message}</ErrorMessage>}
            <SubmitButton
              processing={processing}
              error={error}
              disabled={!stripe}
              onClick={handleSubmit}>
              Pay
            </SubmitButton>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Checkout;

const ErrorMessage = ({ children }: { children: React.ReactNode }) => (
  <div className='ErrorMessage' role='alert'>
    <svg width='16' height='16' viewBox='0 0 17 17'>
      <path
        fill='#777'
        d='M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z'
      />
      <path
        fill='#6772e5'
        d='M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z'
      />
    </svg>
    {children}
  </div>
);

const SubmitButton = ({
  processing,
  error,
  children,
  disabled,
  onClick,
}: {
  processing: boolean;
  error: any;
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
}) => (
  <button
    className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
    onClick={onClick}
    disabled={processing || disabled}>
    {processing ? 'Processing...' : children}
  </button>
);

import React, { Fragment } from 'react';
import { NextPage } from 'next';
import Hero from '../components/faq/hero';
import Faqs from '../components/faq/faqs';
import FooterProducts from '../components/footerProducts';

const Faq: NextPage = () => {
  return (
    <Fragment>
      <Hero />
      <Faqs />
      <FooterProducts />
    </Fragment>
  );
};

export default Faq;

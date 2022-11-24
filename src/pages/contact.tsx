import React, { Fragment } from 'react';
import { NextPage } from 'next';
import Hero from '../components/contact/hero';
import ContactInfo from '../components/contact/contactInfo';
import FooterProducts from '../components/footerProducts';

const Contact: NextPage = () => {
  return (
    <Fragment>
      <Hero />
      <ContactInfo />
      <FooterProducts />
    </Fragment>
  );
};

export default Contact;

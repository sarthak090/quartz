/** @type {import('next').NextConfig} */

const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['cms.quartzstonedirect.com'],
  },
  env: {
    API_URL: process.env.API_URL,
    BASE_URL: process.env.BASE_URL,
    CART_SECRET_KEY: process.env.CART_SECRET_KEY,
    WOOCOMMERCE_CONSUMER_KEY: process.env.WOOCOMMERCE_CONSUMER_KEY,
    WOOCOMMERCE_CONSUMER_SECRET: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  },
};

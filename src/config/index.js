import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

// export const Api = new WooCommerceRestApi({
//   url: 'https://cms.quartzstonedirect.com',
//   consumerKey: 'ck_305b719db2594ced6494ebf7895a7ec69456f40e',
//   consumerSecret: 'cs_72e992fbcae19fc856c0ba1efa65698c80abdc01',
//   version: 'wc/v3',
// });

export const Api = new WooCommerceRestApi({
  url: process.env.BASE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: 'wc/v3',
});

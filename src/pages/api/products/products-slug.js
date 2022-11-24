import { Api } from '../../../config';

const productHandler = (req, res) => {
  const {
    query: { page },
    // body,
    method,
  } = req;
  //   console.log('body', body, 'method', method, 'query', page);
  switch (method) {
    case 'GET':
      // Get data from your database
      return Api.get('products', {
        page: page,
        per_page: 90, // 100 products per page
        status: 'publish',
      })
        .then((response) => {
          // Successful request
          return res.status(200).json({
            totalPages: response.headers['x-wp-totalpages'],
            totalProducts: response.headers['x-wp-total'],
            data: response.data,
          });
        })
        .catch((error) => {
          // Invalid request, for 4xx and 5xx statuses
          return res.status(error.response.status).json({
            data: error.response.data,
          });
        })
        .finally(() => {
          // Always executed.
        });
    default:
      // res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
export default productHandler;

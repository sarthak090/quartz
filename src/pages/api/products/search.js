import { Api } from '../../../config';

const productSearchHandler = (req, res) => {
  const {
    query: { s },
    // body,
    method,
  } = req;
  switch (method) {
    case 'GET':
      // Get data from your database
      return Api.get(`products?search=${s}`, {
        per_page: 30, // 20 products per search
        status: 'publish',
      })
        .then((response) => {
          // Successful request
          return res.status(200).json({
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
export default productSearchHandler;

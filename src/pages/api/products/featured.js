import { Api } from '../../../config';

const handler = (req, res) => {
  const {
    // query: { id, name },
    method,
  } = req;
  switch (method) {
    case 'GET':
      // Get data from your database
      return Api.get('products?filter[meta_key]=_featured&filter[meta_value]=yes', {
        page: 1,
        per_page: 4, // 20 products per page
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
export default handler;

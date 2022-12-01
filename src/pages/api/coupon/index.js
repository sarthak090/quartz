import { Api } from '../../../config';

const productHandler = (req, res) => {
  const { method, query } = req;
  switch (method) {
    case 'GET':
      // Get data from your database
      console.log(req.params);
      return Api.get(`coupons?code=${query.code}`)
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
export default productHandler;

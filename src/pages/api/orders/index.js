import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';
import { Api } from '../../../config';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['POST'],
  })
);

const orderHandler = async (req, res) => {
  await cors(req, res);
  const {
    // query: { id, name },
    body,
    method,
  } = req;
  switch (method) {
    case 'POST':
      if (!body.data) {
        return res.status(400).json({
          message: 'order body missig',
        });
      }
      // Get data from your database
      return Api.post(`orders`, body.data)
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
export default orderHandler;

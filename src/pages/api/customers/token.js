import axios from 'axios';
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['POST'],
  })
);

const loginHandler = async (req, res) => {
  await cors(req, res);
  const {
    // query: { id, name },
    body,
    method,
  } = req;

  switch (method) {
    case 'POST':
      return axios
        .post(`${process.env.BASE_URL}/wp-json/jwt-auth/v1/token`, {
          username: body.username,
          password: body.password,
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
        });

    default:
      // res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
export default loginHandler;

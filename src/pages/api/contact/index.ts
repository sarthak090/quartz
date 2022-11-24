import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import axios from 'axios';
import FormData from 'form-data';
import initMiddleware from '../../../lib/init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['POST'],
  })
);

const contactHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  const {
    // query: { id, name },
    body,
    method,
  } = req;
  const formData = new FormData();

  switch (method) {
    case 'POST':
      formData.append('your-name', body.fullName);
      formData.append('company-name', body.companyName);
      formData.append('your-email', body.email);
      formData.append('phone', body.phone);
      formData.append('message', body.message);
      formData.append('your-subject', 'Quartz Stone Client Feedback/Query');
      // Get data from your database
      return axios
        .post(
          'https://cms.quartzstonedirect.com/wp-json/contact-form-7/v1/contact-forms/2759/feedback',
          formData,
          {
            headers: formData.getHeaders(),
          }
        )
        .then((response) => {
          if (response.data.invalid_fields.length > 0) {
            res.status(400).end(response.data.message);
          } else {
            res.status(200).end(`Query Submitted Successfully!`);
          }
        })
        .catch((error) => {
          res.status(error.response.status).end(`Something went wrong!`);
        });
    default:
      // res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
export default contactHandler;

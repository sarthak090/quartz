import Stripe from 'stripe';
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';
const stripe = new Stripe(
  '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'
);

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['POST'],
  })
);

export default async (req, res) => {
  await cors(req, res);
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });

      res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

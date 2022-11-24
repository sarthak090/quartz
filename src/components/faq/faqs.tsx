import React from 'react';
import Accordion from '../common/accordion';

export const shipping = [
  {
    title: 'How do you ship the materials?',
    content:
      'We are crafting the slabs and ship to business addresses only. Forklift required in the delivery location.',
  },
  {
    title: 'How much shipping cost ?',
    content:
      'Shipping cost may vary depending on the state and the quantity of the slabs. We can load up to 6 slabs to a crate. Shipping to east coast will cost $1500-$2000, mid states $700-$1100, west coast $400-600.',
  },
  {
    title: 'Do you ship internationally?',
    content:
      'We don’t offer international shipping but we can crate your order as required and you can arrange your own shipping.',
  },
];
export const order = [
  {
    title: 'How Long Will It Take To Get My Package?',
    content:
      'We need 3 working days for crating your order and shipping will take about 4-7 working days.',
  },
  {
    title: 'What is your return policy ?',
    content:
      'All materials needs to be in the original condition. Customer is responsible for return shipping cost.',
  },
];
const Faqs: React.FC = () => {
  return (
    <section className='faqs-section'>
      <div className='container'>
        <h3>Shipping</h3>
        <div className='accordion'>
          {shipping.map(({ title, content }, index) => (
            <Accordion title={title} content={content} key={index} />
          ))}
        </div>
        <h3>Orders & Returns</h3>
        <div className='accordion'>
          {order.map(({ title, content }, index) => (
            <Accordion title={title} content={content} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Faqs;

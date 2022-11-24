import React from 'react';
import Product from '../common/product';
import { useSiteContext } from '../../context';

interface Props {
  list: any[];
}

const Collection: React.FC<Props> = ({ list }) => {
  const { updateFvtLength } = useSiteContext();
  return (
    <section className='best-seller'>
      <h3 className='mb-5'>Best Sellers</h3>
      {/* <h1 className='text-center page-title'>MSI Granite Slab Stores</h1> */}
      <div className='container-md'>
        <div className='row'>
          {list.length > 0 &&
            list.map((item, index) => (
              <Product
                id={item.node.databaseId}
                title={item.node.name}
                paSizes={item?.node?.paSlabSizes?.nodes}
                price={item.node.price}
                image={item.node.image.mediaItemUrl}
                slug={item.node.slug}
                key={index}
                updateFvt={updateFvtLength}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;

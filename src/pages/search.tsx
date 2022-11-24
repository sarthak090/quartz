import React, { Fragment } from 'react';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import client from '../apollo';
import { SEARCH_PRODUCTS } from '../apollo/queries/product';
import Product from '../components/common/product';
import { useSiteContext } from '../context';

interface Props {
  data: any;
  s: string;
}

const Search: NextPage<Props> = ({ data, s }) => {
  const { updateFvtLength } = useSiteContext();

  const { products } = data;

  return (
    <Fragment>
      <div className='mt-5 mb-5'>
        <div className='container'>
          <div className='row'>
            <h1>Search Results for &quot;{s}&quot;</h1>
          </div>
        </div>
      </div>
      {products.edges.length > 0 ? (
        <div className='mt-5 mb-5'>
          <div className='container'>
            <div className='row'>
              {products.edges.map(({ node }: any, index: number) => (
                <Product
                  id={node.databaseId}
                  title={node.name}
                  paSizes={node?.paSlabSizes?.nodes}
                  price={node.price}
                  image={node.image.mediaItemUrl}
                  slug={node.slug}
                  key={index}
                  updateFvt={updateFvtLength}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='d-flex align-items-center mt-5 mb-5' style={{ height: 150 }}>
          <div className='container text-center' style={{ opacity: 0.5 }}>
            <h2>No products were found matching your selection.</h2>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.query.s) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
  }

  const { data } = await client.query({
    query: SEARCH_PRODUCTS,
    variables: {
      slug: context.query.s,
    },
  });

  return { props: { data, s: context.query.s } };
};

export default Search;

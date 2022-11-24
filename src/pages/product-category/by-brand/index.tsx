import { Fragment, useState, useEffect } from 'react';
import { NextPage } from 'next';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useLazyQuery } from '@apollo/client';
import client from '../../../apollo';
import { GET_SHOP_PRODUCTS, GET_PAGE_PRODUCTS } from '../../../apollo/queries/product';
import Link from 'next/link';
import Product from '../../../components/common/product';
import Seo from '../../../components/seo';
import { useSiteContext } from '../../../context';

const ByBrand: NextPage = ({ data, error }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { products } = data;
  const { updateFvtLength } = useSiteContext();
  const [hasNextPage, setNextPage] = useState<boolean>(false);
  const [endCursor, setEndCursor] = useState<string>('');
  const [localData, setLocalData] = useState<any>([]);
  const [getProducts, { loading, data: moreProducts, error: clientError }] = useLazyQuery(
    GET_PAGE_PRODUCTS,
    {
      fetchPolicy: 'network-only',
    }
  );
  useEffect(() => {
    if (!error && products.edges.length) {
      setLocalData(products.edges);
      setEndCursor(products?.pageInfo.endCursor);
      setNextPage(products?.pageInfo.hasNextPage);
    }
  }, [products]);
  useEffect(() => {
    if (moreProducts && moreProducts.products.edges.length > 0) {
      setLocalData([...localData, ...moreProducts.products.edges]);
      setEndCursor(moreProducts.products.pageInfo.endCursor);
      setNextPage(moreProducts.products.pageInfo.hasNextPage);
    }
  }, [moreProducts?.products]);

  return (
    <Fragment>
      <Seo />
      <div className='container'>
        <div className='d-flex justify-content-between'>
          <nav className='breadcrumb text-uppercase'>
            <Link href='/' as='/'>
              <a>Home</a>
            </Link>
            <span>/</span>By Brand
          </nav>
        </div>
      </div>
      <div className='mt-5'>
        <div className='container'>
          <div className='row'>
            {localData.map(({ node }: any, index: number) => (
              <Product
                id={node.databaseId}
                title={node.name}
                paSizes={node?.paSlabSizes?.nodes}
                price={node.price}
                image={
                  node.image !== null
                    ? node.image.mediaItemUrl
                    : 'https://cms.quartzstonedirect.com/wp-content/uploads/woocommerce-placeholder.png'
                }
                slug={node.slug}
                key={index}
                updateFvt={updateFvtLength}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='d-flex justify-content-center mt-5 mb-5'>
            {clientError && <p>Something went wrong!</p>}
            {hasNextPage && (
              <button
                className='btn btn-primary load-btn'
                disabled={loading}
                onClick={() =>
                  getProducts({
                    variables: {
                      endCursor,
                    },
                  })
                }>
                {loading ? 'Loading...' : 'Load More'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await client.query({
    query: GET_SHOP_PRODUCTS,
  });
  return { props: { data: data, error: error || null }, revalidate: 1 };
};

export default ByBrand;

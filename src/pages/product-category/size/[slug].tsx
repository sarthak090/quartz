import { Fragment, useState, useEffect } from 'react';
import { NextPage } from 'next';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useLazyQuery } from '@apollo/client';
import Product from '../../../components/common/product';
import Seo from '../../../components/seo';
import { useSiteContext } from '../../../context';
import client from '../../../apollo';
import {
  GET_SIZES,
  GET_SIZE_PRODUCTS,
  GET_MORE_SIZE_PRODUCTS,
} from '../../../apollo/queries/product';

const BySizeProducts: NextPage = ({
  data,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { paSlabSize } = data;
  const { updateFvtLength } = useSiteContext();
  const [hasNextPage, setNextPage] = useState<boolean>(false);
  const [endCursor, setEndCursor] = useState<string>('');
  const [localData, setLocalData] = useState<any>([]);
  const [getProducts, { loading, data: moreProducts, error: clientError }] = useLazyQuery(
    GET_MORE_SIZE_PRODUCTS,
    {
      fetchPolicy: 'network-only',
    }
  );
  useEffect(() => {
    if (!error && paSlabSize.products.edges.length) {
      setLocalData(paSlabSize.products.edges);
      setEndCursor(paSlabSize.products?.pageInfo.endCursor);
      setNextPage(paSlabSize.products?.pageInfo.hasNextPage);
    }
  }, [paSlabSize.products]);
  useEffect(() => {
    if (moreProducts && moreProducts?.paSlabSize?.products.edges.length > 0) {
      setLocalData([...localData, ...moreProducts?.paSlabSize?.products.edges]);
      setEndCursor(moreProducts?.paSlabSize?.products.pageInfo.endCursor);
      setNextPage(moreProducts?.paSlabSize?.products.pageInfo.hasNextPage);
    }
  }, [moreProducts?.paSlabSize?.products]);

  return (
    <Fragment>
      <Seo />
      <div className='container'>
        <div className='d-flex justify-content-between'>
          <nav className='breadcrumb text-uppercase'>
            <Link href='/' as='/'>
              <a>Home</a>
            </Link>
            <span>/</span>Size
            <span>/</span>
            {paSlabSize.name}
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
            {clientError && <p className='d-block'>Something went wrong!</p>}
            {hasNextPage && (
              <button
                className='btn btn-primary load-btn'
                disabled={loading}
                onClick={() =>
                  getProducts({
                    variables: {
                      slug: paSlabSize?.slug,
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

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug;
  const { data, error } = await client.query({
    query: GET_SIZE_PRODUCTS,
    variables: {
      slug,
    },
  });
  return { props: { data: data, error: error || null }, revalidate: 1 };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  let page = '';
  let pageList: any = [];
  const getEntireList = async function () {
    const { data } = await client.query({
      query: GET_SIZES,
      variables: {
        endCursor: page,
      },
    });
    pageList = [...pageList, ...data?.paSlabSizes?.edges];
    if (data?.paSlabSizes?.pageInfo?.hasNextPage) {
      page = data?.paSlabSizes?.pageInfo?.endCursor;
      await getEntireList();
    }
  };

  await getEntireList();

  const paths = await pageList.map(({ node }: { node: any }) => ({
    params: { slug: node?.slug },
  }));

  return {
    paths,
    fallback: false, //indicates the type of fallback
  };
};

export default BySizeProducts;

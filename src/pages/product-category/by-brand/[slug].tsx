import { Fragment, useState, useEffect } from 'react';
import { NextPage } from 'next';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useLazyQuery } from '@apollo/client';
import Product from '../../../components/common/product';
import { useSiteContext } from '../../../context';
import Seo from '../../../components/seo';
import client from '../../../apollo';
import {
  GET_CATEGORY_PRODUCTS,
  GET_MORE_CATEGORY_PRODUCTS,
  GET_CATEGORIES,
} from '../../../apollo/queries/product';

const BrandProducts: NextPage = ({
  data,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { productCategory } = data;
  const { updateFvtLength } = useSiteContext();
  const [hasNextPage, setNextPage] = useState<boolean>(false);
  const [endCursor, setEndCursor] = useState<string>('');
  const [localData, setLocalData] = useState<any>([]);
  const [getProducts, { loading, data: moreProducts, error: clientError }] = useLazyQuery(
    GET_MORE_CATEGORY_PRODUCTS,
    {
      fetchPolicy: 'network-only',
    }
  );
  useEffect(() => {
    if (!error && productCategory.products.edges.length) {
      setLocalData(productCategory.products.edges);
      setEndCursor(productCategory.products?.pageInfo.endCursor);
      setNextPage(productCategory.products?.pageInfo.hasNextPage);
    }
  }, [productCategory.products]);
  useEffect(() => {
    if (moreProducts && moreProducts?.productCategory?.products.edges.length > 0) {
      setLocalData([...localData, ...moreProducts?.productCategory?.products.edges]);
      setEndCursor(moreProducts?.productCategory?.products.pageInfo.endCursor);
      setNextPage(moreProducts?.productCategory?.products.pageInfo.hasNextPage);
    }
  }, [moreProducts?.productCategory?.products]);

  return (
    <Fragment>
      <Seo
        title={productCategory?.seo?.title ? productCategory?.seo?.title : productCategory.name}
        description={productCategory?.seo?.metaDesc}
      />
      <div className='container'>
        <div className='d-flex justify-content-between'>
          <nav className='breadcrumb text-uppercase'>
            <Link href='/' as='/'>
              <a>Home</a>
            </Link>
            <span>/</span>
            <Link href='/product-category/by-brand' as='/product-category/by-brand'>
              <a>By Brand</a>
            </Link>
            <span>/</span>
            {productCategory.name}
          </nav>
        </div>
      </div>
      <div className=''>
        <h1 className='text-center page-title'>
          {productCategory?.seo?.title ? productCategory?.seo?.title : productCategory.name}
        </h1>
        <div className='container pt-5'>
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
                      slug: productCategory?.slug,
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
      <div className='container'>
        <div className='row'>
          <div
            className='page-content'
            dangerouslySetInnerHTML={{ __html: productCategory?.description }}></div>
        </div>
      </div>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug;
  const { data, error } = await client.query({
    query: GET_CATEGORY_PRODUCTS,
    variables: {
      slug,
    },
  });
  return { props: { data: data, error: error || null, slug: slug }, revalidate: 1 };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  let page = '';
  let pageList: any = [];
  const getEntireList = async function () {
    const { data } = await client.query({
      query: GET_CATEGORIES,
      variables: {
        endCursor: page,
      },
    });
    pageList = [...pageList, ...data?.productCategories?.edges];
    if (data?.productCategories?.pageInfo?.hasNextPage) {
      page = data?.productCategories?.pageInfo?.endCursor;
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

export default BrandProducts;

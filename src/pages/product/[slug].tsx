import React, { Fragment } from 'react';
import { NextPage } from 'next';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import useInView from 'react-cool-inview';
import client from '../../apollo';
import { GET_SIGNLE_PRODUCT, GET_PRODUCTS_SLUG } from '../../apollo/queries/product';
import Gallery from '../../components/productDetail/gallery';
import Content from '../../components/productDetail/content';
import TabsView from '../../components/productDetail/tabsView';
import FooterProducts from '../../components/footerProducts';
import Seo from '../../components/seo';

const ProductDetail: NextPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // const router = useRouter();
  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
  });
  // if (router.isFallback) return null;

  const { product } = data;

  return (
    <Fragment>
      <Seo title={product?.seo?.title} description={product?.seo?.metaDesc} />
      <div style={{ marginTop: 30 }}>
        {product ? (
          <>
            <div className='container'>
              <div className='row'>
                <div className='col-md-7'>
                  <Gallery
                    images={product?.galleryImages?.edges}
                    featuredImage={product?.image?.mediaItemUrl}
                  />
                </div>
                <div className='col-md-5'>
                  <Content product={product} />
                </div>
              </div>
            </div>
            <TabsView description={product.description} />
          </>
        ) : (
          <h1>Product Not Found!</h1>
        )}
        <div ref={observe}>{inView && <FooterProducts />}</div>
      </div>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug;

  const { data } = await client.query({
    query: GET_SIGNLE_PRODUCT,
    variables: {
      slug,
    },
  });

  return { props: { data: data }, revalidate: 1 };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  let page = '';
  let productList: any = [];
  const getEntireProductList = async function () {
    const { data } = await client.query({
      query: GET_PRODUCTS_SLUG,
      variables: {
        after: page,
      },
    });
    // data.concat(res.data.data);
    productList = [...productList, ...data?.products?.edges];
    // console.log('total pppp', data);
    if (data?.products?.pageInfo?.hasNextPage) {
      page = data?.products?.pageInfo?.endCursor;
      await getEntireProductList();
    }
  };

  await getEntireProductList();

  const paths = await productList.slice(0, 10).map(({ node }: { node: any }) => ({
    params: { slug: node?.slug },
  }));

  return {
    paths,
    fallback: false, //indicates the type of fallback
  };
};

export default ProductDetail;

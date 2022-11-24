import { Fragment, useState, useEffect } from 'react';
import { NextPage } from 'next';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useLazyQuery } from '@apollo/client';
import client from '../../apollo';
import { GET_SHOP_PRODUCTS, GET_PAGE_PRODUCTS } from '../../apollo/queries/product';
import Product from '../../components/common/product';
import { useSiteContext } from '../../context';
import Seo from '../../components/seo';

const Shop: NextPage = ({ data, error }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
      <Seo
        title='Affordable Granite Slabs | Wholesale Porcelain Countertops'
        description='Affordable granite slabs and wholesale porcelain countertops for sale are available in Quartzstonedirect, these are becoming increasingly popular nowadays.'
      />
      <div className='container'>
        <div className='d-flex justify-content-between'>
          <nav className='breadcrumb text-uppercase'>
            <Link href='/'>
              <a>Home</a>
            </Link>
            <span>/</span>Shop
          </nav>
        </div>
      </div>
      <div className=''>
        <h1 className='text-center page-title'>Wholesale porcelain countertops for sale</h1>
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
      <div className='container'>
        <div className='row'>
          <div
            className='page-content'
            dangerouslySetInnerHTML={{
              __html:
                '<p class="p1">Often, when considering different materials to use for countertops, quartz and granite come to mind as the strongest and most durable options. Porcelain often gets overlooked, but is another prime countertop material that looks good, has an array of options, and is actually stronger than granite. The earliest form of porcelain was created a millennium ago during the Shang Dynasty in early China. Since then, porcelain has been crafted to new levels of pristine perfection and make a great addition to any countertop space. At <a href="https://www.quartzstonedirect.com/"><span class="s1">Quartzstonedirect</span></a>, we have numerous options of wholesale porcelain countertops for sale. Go ahead and take a look <a href="https://www.quartzstonedirect.com/shop"><span class="s1">online</span></a>, but first let us tell you a little more about the product so you can have a better idea if it’s something you’d be interested in.</p>\r\n<p class="p1"><b>What is porcelain?</b></p>\r\n<p class="p1">Porcelain is a vitrified pottery material, meaning it is transformed into the glass-like substance we call porcelain through exposure to extreme heat. As mentioned before, the earliest evidence of porcelain came into existence in ancient China, but since then the process has developed to create a stronger and more refined material.<span class="Apple-converted-space"> </span></p>\r\n<p class="p1">To start, porcelain is made by heating (at very high temperatures) a mixture of powdered china stone and white china clay, also known as kaolin. The extreme heat causes the china stone to vitrify into a highly durable and dense material, while the kaolin helps it retain its shape. There are impurities in the kaolin as well, such as silica and feldspars that add to the porcelain\'s strength and color.<span class="Apple-converted-space"> </span></p>\r\n<p class="p1">Finally, when porcelain slabs are manufactured for countertops, they are coated with a pigmetized glaze in order to enhance their smoothness, look, and feel. This allows porcelain to come in various colors and look as aesthetic as marble, while being stronger than granite.<span class="Apple-converted-space"> </span></p>\r\n<p class="p1"><b>Benefits of porcelain</b></p>\r\n\r\n<ul class="ul1">\r\n \t<li class="li1"><b>Heat resistant. </b>You should have no worries about harming your porcelain countertops with hot pots and pans, it’s already been through a lot hotter.</li>\r\n \t<li class="li1"><b>Stain resistant. </b>Porcelain is super non absorbent and will not harbor any stains or odors.</li>\r\n \t<li class="li1"><b>Easy maintenance. </b>Porcelain countertops don’t require to be sealed like marble and granite do.</li>\r\n \t<li class="li1"><b>UV resistant. </b>This is one area where porcelain countertops excel over quartz. Prolonged exposure to sunlight will not harm your porcelain countertops making them an ideal option for outdoor spaces.</li>\r\n \t<li class="li1"><b>Environmentally friendly. </b>Unlike Dekton, Silestone, and other man made countertop materials, porcelain is made from 100% natural materials.</li>\r\n</ul>\r\n<p class="p1"><b>Color variety</b></p>\r\n<p class="p1">Since porcelain is coated with natural pigments during their production, there is an endless variety of colors you can choose from depending on where you buy from. We have a broad range of colors available ranging from white, black, gray, and brown, all with different grains and veins. This allows for ease when trying to match your countertops with the overall style of your project. Check out our wholesale options so you can save money on the big purchases required for bigger projects.</p>',
            }}></div>
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

export default Shop;

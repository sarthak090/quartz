import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useQuery } from '@apollo/client';
import { GET_FOOTER_PRODUCTS } from '../../apollo/queries/product';
import HashLoader from 'react-spinners/HashLoader';
import FooterProduct from '../common/footerProduct';

const override = css`
  display: block;
  margin: 0 auto;
`;

const FooterProducts: React.FC = () => {
  const { data, loading, error } = useQuery(GET_FOOTER_PRODUCTS);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [localData, setLocalData] = useState<any>(null);

  useEffect(() => {
    if (!loading && data) {
      setLocalData({
        latest: data.latest.edges,
        featured: data.featured.edges,
        bestSelling: data.products.edges.slice(0, 4),
        topRated: data.products.edges.slice(4, 8),
      });
      if (!loading) {
        setLoading(false);
      }
    }
  }, [data, loading]);

  if (isLoading) {
    return (
      <div className='py-5'>
        <HashLoader color='#0d98ba' loading={isLoading} css={override} size={50} />
      </div>
    );
  }

  if (!isLoading && error && data === null) {
    return (
      <div className='py-5 text-center'>
        <p>Something went wrong, while loading products!</p>
      </div>
    );
  }

  const { latest, featured, bestSelling, topRated } = localData;
  return (
    <section className='footer-products'>
      <div className='container-md' style={{ marginBottom: 150 }}>
        <div className='row'>
          <div className='col-sm-6 col-lg-3'>
            <h3>LATEST</h3>
            {latest.map(({ node }: any, index: number) => (
              <FooterProduct
                name={node?.name + '-' + node?.productCategories?.edges[0]?.node?.name}
                priceHtml={node?.price}
                previewImg={node?.image.mediaItemUrl}
                slug={node?.slug}
                key={index}
              />
            ))}
          </div>
          <div className='col-sm-6 col-lg-3'>
            <h3>BEST SELLING</h3>
            {bestSelling.map(({ node }: any, index: number) => (
              <FooterProduct
                name={node?.name + '-' + node?.productCategories?.edges[0]?.node?.name}
                priceHtml={node?.price}
                previewImg={node?.image.mediaItemUrl}
                slug={node?.slug}
                key={index}
              />
            ))}
          </div>
          <div className='col-sm-6 col-lg-3'>
            <h3>FEATURED</h3>
            {featured.map(({ node }: any, index: number) => (
              <FooterProduct
                name={node?.name + '-' + node?.productCategories?.edges[0]?.node?.name}
                priceHtml={node?.price}
                previewImg={node?.image.mediaItemUrl}
                slug={node?.slug}
                key={index}
              />
            ))}
          </div>
          <div className='col-sm-6 col-lg-3'>
            <h3>TOP RATED</h3>
            {topRated.map(({ node }: any, index: number) => (
              <FooterProduct
                name={node?.name + '-' + node?.productCategories?.edges[0]?.node?.name}
                priceHtml={node?.price}
                previewImg={node?.image.mediaItemUrl}
                slug={node?.slug}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default FooterProducts;

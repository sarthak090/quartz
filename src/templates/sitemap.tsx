import React from 'react';
import moment from 'moment';
import client from '../apollo';
import {
  GET_PRODUCTS_SITEMAP,
  GET_CATEGORIES_SITEMAP,
  GET_COLORS_SITEMAP,
  GET_SIZES,
} from '../apollo/queries/sitemap/products';

const BASE_URL = 'https://www.quartzstonedirect.com/';

const createSitemap = (products: any) => `<?xml version="1.0" encoding="UTF-8"?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
		>
		<url>
			<loc>https://www.quartzstonedirect.com/</loc>
			<lastmod>${moment(new Date().getTime()).format('yyyy-MM-DDTHH:mm:ss+00:00')}</lastmod>
			<changefreq>daily</changefreq>
			<priority>1.0</priority>
		</url>
        ${
          products.edges.length > 0 &&
          products.edges
            .map(({ node }: { node: any }) => {
              return `
                    	<url>
							<loc>${`${BASE_URL}product/${node.slug}`}</loc>
							<lastmod>${moment(new Date().getTime()).format('yyyy-MM-DDTHH:mm:ss+00:00')}</lastmod>
							<changefreq>daily</changefreq>
							<priority>0.6</priority>
                    	</url>
					`;
            })
            .join('')
        }
		<url>
			<loc>https://www.quartzstonedirect.com/login</loc>
			<lastmod>${moment(new Date().getTime()).format('yyyy-MM-DDTHH:mm:ss+00:00')}</lastmod>
			<changefreq>weekly</changefreq>
			<priority>0.6</priority>
		</url>
		<url>
			<loc>https://www.quartzstonedirect.com/register</loc>
			<lastmod>${moment(new Date().getTime()).format('yyyy-MM-DDTHH:mm:ss+00:00')}</lastmod>
			<changefreq>weekly</changefreq>
			<priority>0.6</priority>
		</url>
		<url>
			<loc>https://www.quartzstonedirect.com/faq</loc>
			<lastmod>${moment(new Date().getTime()).format('yyyy-MM-DDTHH:mm:ss+00:00')}</lastmod>
			<changefreq>weekly</changefreq>
			<priority>0.6</priority>
		</url>
		<url>
			<loc>https://www.quartzstonedirect.com/contact</loc>
			<lastmod>${moment(new Date().getTime()).format('yyyy-MM-DDTHH:mm:ss+00:00')}</lastmod>
			<changefreq>weekly</changefreq>
			<priority>0.6</priority>
		</url>
		<url>
			<loc>https://www.quartzstonedirect.com/product-category/by-brand</loc>
			<lastmod>${moment(new Date().getTime()).format('yyyy-MM-DDTHH:mm:ss+00:00')}</lastmod>
			<changefreq>weekly</changefreq>
			<priority>0.6</priority>
		</url>
        <url>
			<loc>https://www.quartzstonedirect.com/product-category/by-design/calacatta</loc>
			<lastmod>${moment(new Date().getTime()).format('yyyy-MM-DDTHH:mm:ss+00:00')}</lastmod>
			<changefreq>weekly</changefreq>
			<priority>0.6</priority>
		</url>
        <url>
			<loc>https://www.quartzstonedirect.com/product-category/by-design/carrara</loc>
			<lastmod>${moment(new Date().getTime()).format('yyyy-MM-DDTHH:mm:ss+00:00')}</lastmod>
			<changefreq>weekly</changefreq>
			<priority>0.6</priority>
		</url>
        <url>
			<loc>https://www.quartzstonedirect.com/product-category/by-design/statuario</loc>
			<lastmod>${moment(new Date().getTime()).format('yyyy-MM-DDTHH:mm:ss+00:00')}</lastmod>
			<changefreq>weekly</changefreq>
			<priority>0.6</priority>
		</url>
        <url>
			<loc>https://www.quartzstonedirect.com/product-category/by-design/concrete</loc>
			<lastmod>${moment(new Date().getTime()).format('yyyy-MM-DDTHH:mm:ss+00:00')}</lastmod>
			<changefreq>weekly</changefreq>
			<priority>0.6</priority>
		</url>
        <url>
			<loc>https://www.quartzstonedirect.com/product-category/by-design/blackpool-matte</loc>
			<lastmod>${moment(new Date().getTime()).format('yyyy-MM-DDTHH:mm:ss+00:00')}</lastmod>
			<changefreq>weekly</changefreq>
			<priority>0.6</priority>
		</url>
		<url>
			<loc>https://www.quartzstonedirect.com/shop</loc>
			<lastmod>${moment(new Date().getTime()).format('yyyy-MM-DDTHH:mm:ss+00:00')}</lastmod>
			<changefreq>weekly</changefreq>
			<priority>0.6</priority>
		</url>
    </urlset>
`;
const Sitemap = () => {};

export const getServerSideProps = async ({ res }: { res: any }) => {
  const { data, error } = await client.query({
    query: GET_PRODUCTS_SITEMAP,
  });
  console.log('error=====', error);
  // const { data: siteMapCategories } = await client.query({
  //   query: GET_CATEGORIES_SITEMAP,
  // });
  // const { data: siteMapColors } = await client.query({
  //   query: GET_COLORS_SITEMAP,
  // });
  // const { data: siteMapSizes } = await client.query({
  //   query: GET_SIZES,
  // });
  const products = data.products;
  // const categories = siteMapCategories.productCategories;
  // const colors = siteMapColors.paColors;
  // const sizes = siteMapSizes.paSlabSizes;
  res.setHeader('Content-Type', 'text/xml');
  res.write(createSitemap(products));
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;

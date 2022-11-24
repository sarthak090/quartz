import React, { Fragment } from 'react';
import { NextPage } from 'next';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import useInView from 'react-cool-inview';
import client from '../apollo';
import { GET_BEST_SALLER_PRODUCTS } from '../apollo/queries/product';
import Hero from '../components/homepage/hero';
// import TopCollection from '../components/homepage/collection';
import BestSeller from '../components/homepage/bestSeller';
import ShippingBanner from '../components/homepage/shippingBanner';
import Vendor from '../components/homepage/vendor';
import FooterProducts from '../components/footerProducts';
import Popup from '../components/common/popup';
import Seo from '../components/seo';

const Home: NextPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
  });

  return (
    <Fragment>
      <Seo title='MSI Granite Countertop Slab | Neolith Sintered Stone For Sale' />
      <Hero />
      <Popup></Popup>
      {/* <TopCollection /> */}
      {/* <h1 className='text-center page-title'>MSI Granite Slab Stores</h1> */}
      <BestSeller list={data.products.edges} />
      <ShippingBanner />
      <Vendor />
      <div ref={observe}>{inView && <FooterProducts />}</div>
      <div className='container'>
        <div className='row'>
          <div
            className='page-content'
            dangerouslySetInnerHTML={{
              __html:
                '<p class="p1">MSI, or MS International, is a leading distributor of home improvement materials including countertop surfaces. At <a href="https://www.quartzstonedirect.com/"><span class="s1">Quartzstonedirect</span></a>, we offer a wide range of MSI granite slabs for your home renovations, whatever they might be. We share MSI’s goal of contributing to a world where everyone can create and afford a beautiful space in which to live and work. In pursuit of this goal, we do our best to offer a wide variety of high quality brand materials and educate our customers on them. So let’s dive in.</p>\r\n<p class="p1"><b>The pros of granite slabs</b></p>\r\n\r\n<ul class="ul1">\r\n \t<li class="li1"><b>Durability. </b>Granite is super strong, just a tear below quartz and some man-made materials like Dekton.<span class="Apple-converted-space"> </span></li>\r\n \t<li class="li1"><b>Heat and scratch resistant. </b>Granite is also quite good at resisting any damage from heat or scratches. With granite kitchen countertops, you don’t need to worry about where you put your hot pans and you’re more likely to dull your knife than scratch the granite.<span class="Apple-converted-space"> </span></li>\r\n \t<li class="li1"><b>Reasonably priced. </b>Granite is high quality material and can still be an extremely cost efficient option when remodeling your home.<span class="Apple-converted-space"> </span></li>\r\n \t<li class="li1"><b>Minimal maintenance. </b>Granite does require sealing every year or so, but with the right care and attention granite countertops can last you a lifetime.</li>\r\n \t<li class="li1"><b>Stain resistant. </b>As long as your granite is sealed correctly, it is very stain and smell resistant. Be mindful, however, if your granite is not sealed correctly it’s porous nature can be more prone to holding stains and odors. <span class="Apple-converted-space"> </span></li>\r\n</ul>\r\n<p class="p1"><b>Variety</b></p>\r\n<p class="p1">There is an extremely wide variety of granite, allowing you to have a full spectrum of choices available to be integrated into your home design with ease. There are countless colors, grains, and types of granite to explore, from all over the world. MSI granite slabs are sourced from the highest quality producers and offer enough options to cater to almost any design. The only hard part about incorporating granite slabs into your work is narrowing down your choices. Be sure to take advantage of this plethora of material and order some samples if you\'re stuck choosing between a few.</p>\r\n<p class="p1"><b>Pricing</b></p>\r\n<p class="p1">There is often a misconception that materials like granite will run you too steep a price to be worth it. This simply isn’t true, granite can be a totally affordable option and can last a lifetime. MSI granite slabs range in price from anywhere as low as $35 to $175 per square foot. Yes, there is an expensive end if you have the means and the desire, but there are affordable granite countertop slabs that can completely upgrade your home to the next level.<span class="Apple-converted-space"> </span></p>\r\n<p class="p1">Do some research and exploring to see if MSI granite slabs can fit into your budget, it is definitely worth the extra effort if you discover it is something available to you.<span class="Apple-converted-space"> </span></p>',
            }}></div>
        </div>
      </div>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: GET_BEST_SALLER_PRODUCTS,
  });
  return { props: { data: data }, revalidate: 1 };
};

export default Home;

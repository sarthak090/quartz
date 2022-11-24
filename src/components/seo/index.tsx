import Head from 'next/head';
import { useRouter } from 'next/router';

const meta = {
  title: 'Quartz Stone Direct',
  site_name: 'Quartz Stone Direct',
  description:
    'Quartzstonedirect is offering you the exclusive price of these MSI granite countertop slabs and Neolith sintered stones for sale. ',
  url: 'https://www.quartzstonedirect.com/',
  image: 'https://www.quartzstonedirect.com/logo.png',
  type: 'website',
  robots: 'follow, index',
};

type SeoProps = {
  date?: string;
  pageTitle?: string;
  title?: string;
  description?: string;
  image?: string;
};

export default function Seo(props: SeoProps) {
  const router = useRouter();

  return (
    <Head>
      <title>{props.title ? props.title : meta.title}</title>
      {/* <meta name='robots' content={meta.robots} /> */}
      <meta content={props.description ? props.description : meta.description} name='description' />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      {/* <link rel='canonical' href={`${meta.url}${router.asPath}`} /> */}
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.site_name} />
      <meta
        property='og:description'
        content={props.description ? props.description : meta.description}
      />
      <meta property='og:title' content={props.title ? props.title : meta.title} />
      <meta name='image' property='og:image' content={props.image ? props.image : meta.image} />
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@th_clarence' />
      <meta name='twitter:title' content={meta.title} />
      <meta
        name='twitter:description'
        content={props.description ? props.description : meta.description}
      />
      <meta name='twitter:image' content={props.image ? props.image : meta.image} />
      {/* {meta.date && (
        <>
          <meta property='article:published_time' content={meta.date} />
          <meta
            name='publish_date'
            property='og:publish_date'
            content={meta.date}
          />
          <meta
            name='author'
            property='article:author'
            content='Theodorus Clarence'
          />
        </>
      )} */}
    </Head>
  );
}

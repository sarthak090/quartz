import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Navbar from './navbar';
import Footer from './footer';
import { GET_HEADER_MENU } from '../../apollo/queries/headerMenu';

type Props = {
  children?: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { data } = useQuery(GET_HEADER_MENU);

  return (
    <>
      <Head>
        <link rel='canonical' href={`https://www.quartzstonedirect.com${router.asPath}`} />
        <meta name='robots' content='follow, index' />
      </Head>
      <div>
        {data && data.menuItems.edges.length > 0 && <Navbar menuItems={data.menuItems.edges} />}
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;

import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'next-pagination/dist/index.css';
import '../../styles/globals.scss';
import 'nprogress/nprogress.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import Router, { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ContextProvider } from '../context';
import client from '../apollo';
import * as ga from '../lib/ga';
import Layout from '../components/layout';

const stripePromise = loadStripe(
  'pk_live_51JhJjeGHPdFi7TK79dNMJhqxN3YmQ4Xqhi7qRR0Z2CTYiK75dY2DWYISqD6uEbBi41RBhpSbJOt93X3ygRT4IPCg00ao2jr0kW'
);

NProgress.configure({ showSpinner: false });
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  //Binding events.
  Router.events.on('routeChangeStart', () => NProgress.start());
  Router.events.on('routeChangeComplete', () => NProgress.done());
  Router.events.on('routeChangeError', () => NProgress.done());

  // google analytics
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Elements stripe={stripePromise}>
      <ApolloProvider client={client}>
        <ContextProvider>
          <Layout>
            <Component {...pageProps} />
            <Toaster />
          </Layout>
        </ContextProvider>
      </ApolloProvider>
    </Elements>
  );
}
export default MyApp;

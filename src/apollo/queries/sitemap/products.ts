import { gql } from '@apollo/client';
export const GET_PRODUCTS_SITEMAP = gql`
  query {
    products(where: { status: "publish", orderby: { field: DATE, order: DESC } }, first: 1400) {
      edges {
        node {
          slug
        }
      }
    }
  }
`;

export const GET_CATEGORIES_SITEMAP = gql`
  query {
    productCategories {
      edges {
        node {
          slug
        }
      }
    }
  }
`;

export const GET_COLORS_SITEMAP = gql`
  query {
    paColors {
      edges {
        node {
          slug
        }
      }
    }
  }
`;

export const GET_SIZES = gql`
  query {
    paSlabSizes {
      edges {
        node {
          slug
        }
      }
    }
  }
`;

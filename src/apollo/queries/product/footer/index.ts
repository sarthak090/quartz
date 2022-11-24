import { gql } from '@apollo/client';
export const GET_FOOTER_PRODUCTS = gql`
  query {
    products(where: { status: "publish", orderby: { field: TOTAL_SALES, order: DESC } }, first: 8) {
      edges {
        node {
          name
          slug
          databaseId
          image {
            mediaItemUrl
          }
          productCategories {
            edges {
              node {
                name
                slug
              }
            }
          }
          averageRating
          attributes {
            edges {
              node {
                attributeId
                label
                options
              }
            }
          }
          ... on VariableProduct {
            price
          }
          ... on SimpleProduct {
            price
          }
        }
      }
    }
    latest: products(
      where: { status: "publish", orderby: { field: DATE, order: DESC } }
      first: 4
    ) {
      edges {
        node {
          name
          slug
          databaseId
          image {
            mediaItemUrl
          }
          productCategories {
            edges {
              node {
                name
                slug
              }
            }
          }
          averageRating
          attributes {
            edges {
              node {
                attributeId
                label
                options
              }
            }
          }
          ... on VariableProduct {
            price
          }
          ... on SimpleProduct {
            price
          }
        }
      }
    }
    featured: products(
      where: { status: "publish", orderby: { field: DATE, order: DESC }, featured: true }
      first: 4
    ) {
      edges {
        node {
          name
          slug
          databaseId
          image {
            mediaItemUrl
          }
          productCategories {
            edges {
              node {
                name
                slug
              }
            }
          }
          averageRating
          attributes {
            edges {
              node {
                attributeId
                label
                options
              }
            }
          }
          ... on VariableProduct {
            price
          }
          ... on SimpleProduct {
            price
          }
        }
      }
    }
  }
`;

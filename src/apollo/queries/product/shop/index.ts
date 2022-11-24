import { gql } from '@apollo/client';

export const GET_SHOP_PRODUCTS = gql`
  query {
    products(where: { status: "publish", orderby: { field: DATE, order: DESC } }, first: 30) {
      edges {
        node {
          name
          reviewCount
          slug
          type
          image {
            mediaItemUrl
          }
          databaseId
          reviews {
            averageRating
          }
          ... on VariableProduct {
            price
          }
          ... on SimpleProduct {
            price
          }
          paSlabSizes {
            nodes {
              name
              id
              slug
            }
          }
          attributes {
            edges {
              node {
                label
                options
                id
                attributeId
                visible
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_PAGE_PRODUCTS = gql`
  query ($endCursor: String!) {
    products(
      after: $endCursor
      where: { status: "publish", orderby: { field: DATE, order: DESC } }
      first: 30
    ) {
      edges {
        node {
          name
          reviewCount
          slug
          type
          image {
            mediaItemUrl
          }
          databaseId
          reviews {
            averageRating
          }
          ... on VariableProduct {
            price
          }
          ... on SimpleProduct {
            price
          }
          attributes {
            edges {
              node {
                label
                options
                id
                attributeId
                visible
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_PRODUCTS_SLUG = gql`
  query ($after: String!) {
    products(
      after: $after
      where: { status: "publish", orderby: { field: DATE, order: DESC } }
      first: 30
    ) {
      edges {
        node {
          slug
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

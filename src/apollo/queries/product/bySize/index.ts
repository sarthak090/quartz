import { gql } from '@apollo/client';

export const GET_SIZES = gql`
  query ($endCursor: String!) {
    paSlabSizes(first: 20, after: $endCursor) {
      edges {
        node {
          name
          slug
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_SIZE_PRODUCTS = gql`
  query ($slug: ID!) {
    paSlabSize(id: $slug, idType: SLUG) {
      name
      slug
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
  }
`;

export const GET_MORE_SIZE_PRODUCTS = gql`
  query ($endCursor: String!, $slug: ID!) {
    paSlabSize(id: $slug, idType: SLUG) {
      name
      slug
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
  }
`;

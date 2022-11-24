import { gql } from '@apollo/client';

export const GET_COLORS = gql`
  query ($endCursor: String!) {
    paColors(first: 20, after: $endCursor) {
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

export const GET_COLOR_PRODUCTS = gql`
  query ($slug: ID!) {
    paColor(id: $slug, idType: SLUG) {
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

export const GET_MORE_COLOR_PRODUCTS = gql`
  query ($endCursor: String!, $slug: ID!) {
    paColor(id: $slug, idType: SLUG) {
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

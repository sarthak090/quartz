import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query ($endCursor: String!) {
    productCategories(first: 20, after: $endCursor) {
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

export const GET_CATEGORY_PRODUCTS = gql`
  query ($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      name
      slug
      description
      seo {
        title
        metaDesc
      }
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

export const GET_MORE_CATEGORY_PRODUCTS = gql`
  query ($endCursor: String!, $slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      name
      slug
      description
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

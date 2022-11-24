import { gql } from '@apollo/client';

export const SEARCH_PRODUCTS = gql`
  query ($slug: String!) {
    products(
      where: { status: "publish", search: $slug, orderby: { field: DATE, order: DESC } }
      first: 30
    ) {
      edges {
        node {
          name
          featured
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
    }
  }
`;

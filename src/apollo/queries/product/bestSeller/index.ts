import { gql } from '@apollo/client';
export const GET_BEST_SALLER_PRODUCTS = gql`
  query {
    products(
      where: { status: "publish", orderby: { field: TOTAL_SALES, order: DESC } }
      first: 16
    ) {
      edges {
        node {
          name
          slug
          databaseId
          image {
            mediaItemUrl
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
          paSlabSizes {
            nodes {
              name
              id
              slug
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

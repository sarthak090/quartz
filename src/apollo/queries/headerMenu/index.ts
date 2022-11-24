import { gql } from '@apollo/client';
export const GET_HEADER_MENU = gql`
  query {
    menuItems(where: { location: PRIMARY, parentId: "0" }, first: 100) {
      edges {
        node {
          label
          url
          path
          childItems(first: 100) {
            edges {
              node {
                label
                url
                path
                childItems(first: 100) {
                  edges {
                    node {
                      label
                      url
                      path
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

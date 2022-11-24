import { gql } from '@apollo/client';

export const GET_SIGNLE_PRODUCT = gql`
  query ($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      databaseId
      name
      averageRating
      description(format: RENDERED)
      slug
      shortDescription(format: RENDERED)
      sku
      seo {
        metaDesc
        title
      }
      galleryImages {
        edges {
          node {
            mediaItemUrl
          }
        }
      }
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
      type
      reviewCount
      reviews(first: 10) {
        edges {
          node {
            content
            author {
              node {
                name
              }
            }
            approved
            date
          }
          rating
        }
        averageRating
      }
      shippingClasses {
        edges {
          node {
            name
            slug
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
      paColors {
        nodes {
          name
          id
          slug
        }
      }
      paFinishes {
        nodes {
          name
          id
          slug
        }
      }
      paOrigins {
        nodes {
          name
          id
          slug
        }
      }
      paThicknesses {
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
      reviewsAllowed
      ... on VariableProduct {
        id
        name
        stockQuantity
        stockStatus
        price(format: RAW)
        taxStatus
        taxClass
        variations(first: 150) {
          edges {
            node {
              regularPrice(format: RAW)
              price
              name
              link
              databaseId
              image {
                mediaItemUrl
              }
              attributes {
                edges {
                  node {
                    name
                    label
                    value
                  }
                }
              }
            }
          }
        }
      }
      ... on SimpleProduct {
        id
        name
        stockQuantity
        stockStatus
        price(format: RAW)
        taxStatus
        taxClass
      }
      related(first: 25) {
        edges {
          node {
            name
            featured
            reviewCount
            slug
            type
            image {
              mediaItemUrl
              sourceUrl
              altText
            }
            databaseId
            reviews {
              averageRating
            }
            shippingClasses {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            ... on VariableProduct {
              stockQuantity
              stockStatus
              price(format: RAW)
              taxStatus
              taxClass
            }
            ... on SimpleProduct {
              stockQuantity
              stockStatus
              price(format: RAW)
              taxStatus
              taxClass
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
            paSlabSizes {
              nodes {
                name
                id
                slug
              }
            }
            paColors {
              nodes {
                name
                id
                slug
              }
            }
            paFinishes {
              nodes {
                name
                id
                slug
              }
            }
            paOrigins {
              nodes {
                name
                id
                slug
              }
            }
            paThicknesses {
              nodes {
                name
                id
                slug
              }
            }
          }
        }
      }
    }
  }
`;

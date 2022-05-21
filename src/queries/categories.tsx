import { gql } from '@apollo/client';

export const GET_CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

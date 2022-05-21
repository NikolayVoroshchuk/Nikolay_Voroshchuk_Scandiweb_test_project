import { gql } from '@apollo/client';

export const GET_CURRENCIES_QUERY = gql`
  query Currencies {
    currencies {
      label 
      symbol 
    }
  }
`;

import { gql } from '@apollo/client';

export const COUNTRIES_QUERY = gql`
  query GetCountries {
    countries {
      code
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

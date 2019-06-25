import gql from "graphql-tag";

export const GET_USERS = gql`
  query usersSearch($page: Int, $limit: Int, $text: String!) {
    usersSearch(page: $page, limit: $limit, text: $text) {
      users {
        id
        avatar
        username
      }
    }
  }
`;

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

export const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      username
      avatar
    }
  }
`;

export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      id
      email
      username
      avatar
    }
  }
`;

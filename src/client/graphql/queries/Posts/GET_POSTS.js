import gql from "graphql-tag";

const GET_POSTS = gql`
  query postsFeed($page: Int, $limit: Int, $username: String) {
    postsFeed(page: $page, limit: $limit, username: $username) {
      posts {
        id
        text
        user {
          avatar
          username
        }
      }
    }
  }
`;

export default GET_POSTS;

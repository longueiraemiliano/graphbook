import gql from "graphql-tag";

const DELETE_POST = gql`
  mutation deletePost($postId: Int!) {
    deletePost(postId: $postId) {
      success
    }
  }
`;

export default DELETE_POST;

import gql from "graphql-tag";

const UPDATE_POST = gql`
  mutation updatePost($post: PostInput!, $postId: Int!) {
    updatePost(post: $post, postId: $postId) {
      id
      text
    }
  }
`;

export default UPDATE_POST;

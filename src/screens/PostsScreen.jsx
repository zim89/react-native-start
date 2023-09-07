import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Box } from '../components/containers';
import UserInfo from '../components/UserInfo';
import PostList from '../components/PostList';

import { posts } from '../mock/posts.js';

const PostsScreen = () => {
  return (
    <Box style={styles.container}>
      <UserInfo style={styles.userInfo} />
      <PostList posts={posts} />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  userInfo: {
    marginBottom: 32,
  },
});

export default PostsScreen;

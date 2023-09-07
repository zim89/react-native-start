import PropTypes from 'prop-types';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import PostItem from './PostItem';

const PostList = ({ posts = [], showLikes = false }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item: { comments, image, location, geolocation, title, likes, isLiked } }) => (
          <PostItem
            comments={comments}
            image={image}
            location={location}
            geolocation={geolocation}
            title={title}
            likes={likes}
            isLiked={isLiked}
            showLikes={showLikes}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PostList;

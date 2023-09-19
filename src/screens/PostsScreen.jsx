import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Box } from '../components/containers';
import UserInfo from '../components/UserInfo';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../configs/firebase';
import PostItem from '../components/PostItem';

const PostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = () => {
    const refPosts = collection(db, 'posts');
    onSnapshot(refPosts, (data) => {
      const posts = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const sortedPosts = posts.sort((a, b) => b.createdAt - a.createdAt);
      setPosts(sortedPosts);
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box style={styles.container}>
      <UserInfo style={styles.userInfo} />

      {posts.length !== 0 && (
        <FlatList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostItem
              key={item.id}
              id={item.id}
              title={item.title}
              location={item.location}
              url={item.photo}
              geolocation={item.geolocation}
            />
          )}
          contentContainerStyle={styles.contentContainer}
        />
      )}
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

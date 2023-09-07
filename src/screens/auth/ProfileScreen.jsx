import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Box } from '../../components/containers';
import { Background } from '../../components/containers';

import bgImage from '../../assets/images/bg_image.jpg';
import { LogoutButton } from '../../components/elements';
import { ProfileImage } from '../../components/forms/image';
import PostList from '../../components/PostList';

import { posts } from '../../mock/posts';

const ProfileScreen = () => {
  return (
    <Background image={bgImage}>
      <Box style={styles.box}>
        <ProfileImage style={styles.profileImage} />
        <View style={styles.logoutButton}>
          <LogoutButton />
        </View>
        <Text style={styles.header}>Natali Romanova</Text>
        <PostList posts={posts} showLikes />
      </Box>
    </Background>
  );
};

const styles = StyleSheet.create({
  box: {
    paddingTop: 92,
    paddingBottom: 0,
    height: '80%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  profileImage: {
    marginBottom: 32,
    position: 'absolute',
  },
  logoutButton: {
    position: 'absolute',
    top: 22,
    right: 16,
  },
  header: {
    color: '#212121',
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    letterSpacing: 0.3,
    marginBottom: 33,
  },
});

export default ProfileScreen;

import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../configs/firebase';
import { sendLike, deleteLike } from '../redux/operations/postOperations';
import { selectUser, selectIsAuth } from '../redux/slices/authSlice';

const PostItem = ({ id, title, location, url, geolocation }) => {
  const isAuth = useSelector(selectIsAuth);
  const navigation = useNavigation();
  const { uid: userId, username, picture: avatar } = useSelector(selectUser) ?? {};
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [userPutLike, setUserPutLike] = useState(false);

  useEffect(() => {
    const commentsRef = collection(db, 'posts', id, 'comments');
    onSnapshot(commentsRef, (data) => {
      const comments = data.docs.map((doc) => ({
        commentId: doc.id,
        ...doc.data(),
      }));
      setComments(comments);
    });
  }, []);

  useEffect(() => {
    const likesRef = collection(db, 'posts', id, 'likes');
    onSnapshot(likesRef, (data) => {
      const likes = data.docs.map((doc) => ({
        likeId: doc.id,
        ...doc.data(),
      }));
      const didUserPutLike = likes.some((like) => like.likeId === userId);
      setUserPutLike(didUserPutLike);
      setLikes(likes);
    });
  }, []);

  const handleLikes = async () => {
    if (!userPutLike) {
      await sendLike(id, userId, username, avatar);
      return;
    }
    await deleteLike(id, userId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: url }} style={styles.image} alt={title} />
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.content}>
        {/* COMMENTS */}
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('Comments', { url, id })}>
          <Feather name='message-circle' size={24} color={comments.length > 0 ? '#ff6c00' : '#bdbdbd'} />
          <Text style={[styles.itemText, comments.length > 0 && styles.accent]}>{comments.length}</Text>
        </TouchableOpacity>

        {/* LIKES */}
        <View style={styles.item}>
          <Feather name='thumbs-up' size={24} color={!userPutLike ? '#BDBDBD' : '#ff6c00'} onPress={handleLikes} />
          <Text style={[styles.itemText, likes > 0 && styles.accent]}>{likes.length}</Text>
        </View>

        {/* LOCATION */}
        <TouchableOpacity
          style={[styles.item, styles.locationItem]}
          onPress={() => navigation.navigate('Map', { geolocation, location })}>
          <Feather name='map-pin' size={24} color='#bdbdbd' />
          <Text style={[styles.itemText, styles.locationItemText]} numberOfLines={1}>
            {location}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 15,
    marginBottom: 32,
  },
  imageWrap: {
    width: '100%',
    height: 240,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    fontFamily: 'Roboto-Medium',
    color: '#212121',
    fontSize: 16,
  },
  content: {
    flexDirection: 'row',
    gap: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    color: '#bdbdbd',
    fontFamily: 'Roboto-Regular',
    marginLeft: 6,
  },
  accent: {
    color: '#212121',
  },
  locationItem: {
    marginLeft: 'auto',
    maxWidth: '70%',
  },
  withoutLikes: {
    maxWidth: '100%',
  },
  locationItemText: {
    color: '#212121',
    textDecorationLine: 'underline',
  },
  // postComments: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   gap: 6,
  // },
});

export default PostItem;

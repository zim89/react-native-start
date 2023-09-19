import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';

import { db } from '../configs/firebase';
import { deleteLike, deletePost, sendLike } from '../redux/operations/postOperations';
import { selectUser } from '../redux/slices/authSlice';

const PostProfileItem = ({ id, title, location, url, geolocation }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
      {/* Post IMAGE */}
      <View style={styles.postImageWrap}>
        <Image source={{ uri: url }} style={styles.postImage} alt={title} />
        <TouchableOpacity style={styles.trashBtn} onPress={() => dispatch(deletePost(id))}>
          <Feather name='trash-2' size={20} color={'#9e9d9d'} />
        </TouchableOpacity>
      </View>

      {/* Post TITLE */}
      <Text style={styles.title}>{title}</Text>

      {/* Post DETAILS */}
      <View style={styles.details}>
        {/* Post COMMENTS */}
        <TouchableOpacity style={styles.postItem} onPress={() => navigation.navigate('Comments', { url, id })}>
          <Feather name={'message-circle'} size={24} color={comments.length === 0 ? '#BDBDBD' : '#FF6C00'} />
          <Text style={[styles.postItemText, comments.length === 0 ? styles.textMute : null]}>{comments.length}</Text>
        </TouchableOpacity>

        {/* Post LIKES */}
        <View style={{ ...styles.postItem, marginLeft: 24 }}>
          <Feather name='thumbs-up' size={24} color={!userPutLike ? '#BDBDBD' : '#FF6C00'} onPress={handleLikes} />
          <Text style={[styles.postItemText, !userPutLike ? styles.textMute : null]}>{likes.length}</Text>
        </View>

        {/* Post LOCATION */}
        <View style={styles.location}>
          <Feather name='map-pin' size={24} color={'#BDBDBD'} />
          <Text style={styles.locationText} onPress={() => navigation.navigate('Map', { geolocation, location })}>
            {location}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 35,
  },
  postImageWrap: {
    width: '100%',
    height: 240,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: 240,
    borderRadius: 8,
  },
  trashBtn: {
    height: 30,
    width: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  title: {
    display: 'flex',
    marginBottom: 8,
    fontFamily: 'Roboto-Medium',
    color: '#212121',
    fontSize: 16,
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
  },
  postItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  postItemText: {
    fontFamily: 'Roboto-Regular',
    color: '#212121',
    fontSize: 16,
  },
  textMute: {
    color: '#BDBDBD',
  },
  location: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },

  locationText: {
    fontFamily: 'Roboto-Regular',
    color: '#212121',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default PostProfileItem;

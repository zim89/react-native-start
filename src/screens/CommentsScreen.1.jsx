import { View, Image, TextInput, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../configs/firebase';
import { selectUser } from '../redux/slices/authSlice';
import CommentItem from '../components/CommentItem';
import { styles } from './CommentsScreen';

export const CommentsScreen = ({ route }) => {
  const { id, url } = route.params;

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const { uid: userId, username, picture: avatar } = useSelector(selectUser);

  const sendComment = async () => {
    if (!comment) {
      return;
    }
    try {
      await addDoc(collection(db, 'posts', id, 'comments'), {
        comment,
        owner: { userId, username, avatar },
        createdAt: new Date().getTime(),
      });
      setComment('');
    } catch (error) {
      console.log(error.code);
    }
  };

  useEffect(() => {
    const commentsRef = collection(db, 'posts', id, 'comments');
    onSnapshot(commentsRef, (data) => {
      const comments = data.docs.map((doc) => ({
        commentId: doc.id,
        ...doc.data(),
      }));
      const sortedComments = comments.sort((a, b) => a.createdAt - b.createdAt);
      setComments(sortedComments);
    });
  }, []);

  return (
    <TouchableWithoutFeedback TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.postPhotoWrap}>
            <Image source={{ uri: url ? url : null }} style={styles.postPhoto} />
          </View>
          {comments.length !== 0 ? (
            comments.map(({ commentId, comment, owner, createdAt }) => (
              <CommentItem
                key={commentId}
                commentId={commentId}
                comment={comment}
                owner={owner}
                createdAt={createdAt}
              />
            ))
          ) : (
            <View style={{ flex: 1, marginTop: 30, paddingHorizontal: 16 }}>
              <Text style={styles.text}>Ще немає коментарів</Text>
            </View>
          )}
        </ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.inputWrap}>
            <TextInput
              name='comment'
              value={comment}
              placeholder='Коментувати...'
              placeholderTextColor={'#BDBDBD'}
              style={isFocused ? { ...styles.input, borderColor: '#2765b8' } : { ...styles.input }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChangeText={(value) => setComment(value)}
            />
            <View style={styles.sendBtn}>
              <Feather onPress={sendComment} name='arrow-up' size={24} color={'#FFFFFF'} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

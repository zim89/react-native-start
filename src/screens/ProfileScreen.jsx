import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

import bgImage from '../assets/images/bg_image.jpg';
import defaultUserAvatar from '../assets/images/defaultUserAvatar.png';
import { LogoutButton } from '../components/elements';

import { db } from '../configs/firebase';
import { selectUser } from '../redux/slices/authSlice';

import PostProfileItem from '../components/PostProfileItem';
import { Background } from '../components/containers';

const ProfileScreen = () => {
  const { uid: userId, username, picture: avatar } = useSelector(selectUser) ?? {};

  const [newAvatar, setNewAvatar] = useState('');
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const postsRef = collection(db, 'posts');
    const userQuery = query(postsRef, where('owner.userId', '==', userId));
    onSnapshot(userQuery, (data) => {
      const posts = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const sortedPosts = posts.sort((a, b) => b.createdAt - a.createdAt);
      setUserPosts(sortedPosts);
    });
  }, []);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
          setNewAvatar(result.assets[0].uri);
          setChangeAvatar(true);
        }
      }
    } catch (error) {
      console.log('error', error.message);
    }
  };

  return (
    <Background image={bgImage}>
      <View style={styles.container}>
        {/* Logout Button */}
        <View style={styles.logoutBtn}>
          <LogoutButton />
        </View>

        {/* User Profile Image */}
        <View style={styles.avatarWrap}>
          <Image
            source={newAvatar ? { uri: newAvatar } : avatar ? { uri: avatar } : defaultUserAvatar}
            style={styles.avatar}
            alt='User photo'
          />
          <TouchableOpacity style={styles.btnAdd}>
            <AntDesign name='closecircleo' size={25} color={'#b0aeae'} onPress={pickImage} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{username}</Text>

        {userPosts.length !== 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={userPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PostProfileItem
                id={item.id}
                title={item.title}
                location={item.location}
                url={item.photo}
                geolocation={item.geolocation}
              />
            )}
          />
        ) : (
          <View style={{ flex: 1, marginTop: 30, paddingHorizontal: 16 }}>
            <Text style={styles.text}>Ще немає публікацій</Text>
          </View>
        )}
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 280,
    minHeight: Dimensions.get('window').height - 280,
    position: 'relative',
    paddingTop: 92,
    // paddingBottom: 45,
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#FFFFFF',
  },
  logoutBtn: {
    position: 'absolute',
    top: 22,
    right: 16,
  },
  avatarWrap: {
    position: 'absolute',
    top: -60,
    left: '50%',
    transform: [{ translateX: -50 }],
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  cameraBtnPos: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  cameraBtn: {
    width: 35,
    height: 35,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAdd: {
    position: 'absolute',
    top: 75,
    right: -12,
    width: 25,
    height: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    color: '#212121',
    fontSize: 30,
    textAlign: 'center',
    // paddingBottom: 15,
    marginBottom: 33,
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProfileScreen;

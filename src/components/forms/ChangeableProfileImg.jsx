import * as ImagePicker from 'expo-image-picker';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ChangeableProfileImg = ({ style, source, setSource }) => {
  const setPicture = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled) setSource(result.assets[0]);
  };

  const resetPicture = () => setSource(null);

  return (
    <View style={[styles.container, style]}>
      {source && <Image style={styles.image} source={source} />}
      <TouchableOpacity
        style={[styles.icon, source ? styles.remove : styles.add]}
        activeOpacity={0.6}
        onPress={source ? resetPicture : setPicture}>
        <AntDesign name='pluscircleo' size={25} color={source ? '#e8e8e8' : '#ff6c00'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    backgroundColor: '#f6f6f6',
    borderRadius: 16,
    alignSelf: 'center',
    marginTop: -60,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  icon: {
    position: 'absolute',
    bottom: 14,
    right: -12,
    borderRadius: 25 / 2,
    backgroundColor: '#fff',
    transform: {
      perspective: 1000,
    },
  },
  add: {
    transform: [{ rotate: '0deg' }],
  },
  remove: {
    transform: [{ rotate: '45deg' }],
  },
});

export default ChangeableProfileImg;

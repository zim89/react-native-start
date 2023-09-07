import PropTypes from 'prop-types';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ProfileImage = ({ style, source }) => {
  return (
    <View style={[styles.container, style]}>
      {source && <Image style={styles.userImage} source={source} />}
      <TouchableOpacity style={[styles.icon, source ? styles.remove : styles.add]} activeOpacity={0.6}>
        <AntDesign name='pluscircleo' size={25} color={source ? '#e8e8e8' : '#ff6c00'} />
      </TouchableOpacity>
    </View>
  );
};

ProfileImage.propTypes = {
  style: PropTypes.object,
  source: PropTypes.any,
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

export default ProfileImage;

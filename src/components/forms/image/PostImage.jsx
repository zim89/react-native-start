import PropTypes from 'prop-types';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const PostImage = ({ style }) => {
  return (
    <View style={[style]}>
      <View style={styles.container}>
        <View style={styles.pictureContainer}></View>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={[styles.icon]} activeOpacity={0.6}>
            <FontAwesome name='camera' size={24} color='#bdbdbd' />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.bottomText}>Завантажте фото</Text>
    </View>
  );
};

PostImage.propTypes = {
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 8,
  },
  pictureContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    backgroundColor: '#f6f6f6',
    width: '100%',
    height: 240,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picture: {
    aspectRatio: '1/1',
    height: 'auto',
    width: '100%',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    color: '#bdbdbd',
    fontFamily: 'Roboto-Regular',
  },
});

export default PostImage;

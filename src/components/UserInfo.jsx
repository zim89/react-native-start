import PropTypes from 'prop-types';
import { View, Image, Text, StyleSheet } from 'react-native';

import userImage from '../assets/images/avatars/user-img.png';

const UserInfo = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image style={styles.image} source={userImage} />
      <View>
        <Text style={styles.name}>Natali Romanova</Text>
        <Text style={styles.email}>email@example.com</Text>
      </View>
    </View>
  );
};
UserInfo.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  name: {
    color: '#212121',
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
  },
  email: {
    color: 'rgba(33 33 33 / 0.8)',
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
  },
  image: {
    borderRadius: 16,
    width: 60,
    height: 60,
    backgroundColor: '#f6f6f6',
  },
});

export default UserInfo;

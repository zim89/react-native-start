import { View, Image, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { selectUser } from '../redux/slices/authSlice';

const UserInfo = ({ style }) => {
  const { username, email, picture } = useSelector(selectUser) ?? {};

  return (
    <View style={[styles.container, style]}>
      <Image style={styles.image} source={{ uri: picture }} />
      <View>
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.email}>{email}</Text>
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
  image: {
    borderRadius: 16,
    width: 60,
    height: 60,
    backgroundColor: '#f6f6f6',
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
});

export default UserInfo;

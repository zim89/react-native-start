import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

const BoxAuth = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

BoxAuth.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 45,
  },
});

export default BoxAuth;

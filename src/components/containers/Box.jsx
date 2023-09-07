import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

const Box = ({ style, children }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

Box.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 32,
    height: '100%',
  },
});

export default Box;

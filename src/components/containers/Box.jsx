import { StyleSheet, View } from 'react-native';

const Box = ({ style, children }) => {
  return <View style={[styles.container, style]}>{children}</View>;
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

import { StyleSheet, Text } from 'react-native';

const ErrorText = ({ style, text }) => {
  return <Text style={[styles.text, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Medium',
    color: '#ef4444',
  },
});

export default ErrorText;

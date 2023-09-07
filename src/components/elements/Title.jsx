import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

const Title = ({ label, style }) => {
  return <Text style={[styles.text, style]}>{label}</Text>;
};

Title.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  text: {
    color: '#212121',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    letterSpacing: 0.3,
  },
});

export default Title;

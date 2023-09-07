import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

const TitleHeader = ({ label, style }) => {
  return <Text style={[styles.text, style]}>{label}</Text>;
};

TitleHeader.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    textAlign: 'center',
    color: '#212121',
  },
});

export default TitleHeader;

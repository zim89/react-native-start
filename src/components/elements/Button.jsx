import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const Button = ({ label, style, onPress, disabled = false }) => {
  return (
    <TouchableOpacity style={style} activeOpacity={0.75} onPress={onPress} disabled={disabled}>
      <View style={[styles.button, disabled && styles.buttonDisabled]}>
        <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff6c00',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: '#f6f6f6',
  },
  buttonTextDisabled: {
    color: '#bdbdbd',
  },
});

export default Button;

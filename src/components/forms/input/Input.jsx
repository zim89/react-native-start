import PropTypes from 'prop-types';
import { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = ({ style, name, placeholder, autoComplete, keyboardType, hidden, value, onChangeText }) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <TextInput
      style={[styles.input, isFocus && styles.focused, style]}
      placeholder={placeholder}
      placeholderTextColor='#bdbdbd'
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      secureTextEntry={hidden}
      autoComplete={autoComplete}
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
      name={name}
      autoCapitalize='none'
    />
  );
};

Input.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  keyboardType: PropTypes.string,
  hidden: PropTypes.bool,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

const styles = StyleSheet.create({
  input: {
    padding: 16,
    backgroundColor: '#f6f6f6',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  focused: {
    backgroundColor: '#fff',
    borderColor: '#ff6c00',
    color: '#212121',
  },
});

export default Input;

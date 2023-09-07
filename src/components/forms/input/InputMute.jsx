import PropTypes from 'prop-types';
import { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const MuteInput = ({
  style,
  placeholder,
  autoComplete,
  keyboardType,
  hidden,
  value,
  onChangeText,
  icon,
  accent = false,
}) => {
  const [focused, setFocused] = useState(false);

  if (!icon)
    return (
      <TextInput
        style={[styles.container, styles.input, focused && styles.focused, accent && styles.accent, style]}
        placeholder={placeholder}
        placeholderTextColor='#bdbdbd'
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        secureTextEntry={hidden}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
    );

  return (
    <View style={[styles.container, focused && styles.focused, style]}>
      <View style={styles.iconContainer}>{icon}</View>
      <TextInput
        style={[styles.input, accent && styles.accent, { marginLeft: 28 }]}
        placeholder={placeholder}
        placeholderTextColor='#bdbdbd'
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        secureTextEntry={hidden}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

MuteInput.propTypes = {
  style: PropTypes.object,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  keyboardType: PropTypes.string,
  hidden: PropTypes.bool,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  icon: PropTypes.element,
  accent: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderColor: '#e8e8e8',
    borderBottomWidth: 1,
  },
  input: {
    paddingTop: 16,
    paddingBottom: 15,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#212121',
  },
  focused: {
    borderColor: '#ff6c00',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  accent: {
    fontFamily: 'Roboto-Medium',
  },
});

export default MuteInput;

import PropTypes from 'prop-types';
import { Keyboard, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';

const KeyboardElement = ({ children, verticalOffset }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.wrap}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={verticalOffset}>
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

KeyboardElement.propTypes = {
  children: PropTypes.any,
  verticalOffset: PropTypes.number,
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
});

export default KeyboardElement;

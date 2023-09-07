import PropTypes from 'prop-types';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Input from './Input';
import { Link } from '../../elements';

const InputPass = ({ style, name, value, onChangeText, isNew = false }) => {
  const [isPassShown, setIsPassShown] = useState(false);

  return (
    <View style={[styles.wrap, style]}>
      <Input
        name={name}
        placeholder='Пароль'
        autoComplete={isNew ? 'new-password' : 'current-password'}
        hidden={!isPassShown}
        value={value}
        onChangeText={onChangeText}
      />
      <Link style={styles.showButton} onPress={() => setIsPassShown((prev) => !prev)}>
        {isPassShown ? 'Сховати' : 'Показати'}
      </Link>
    </View>
  );
};

InputPass.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  isNew: PropTypes.bool,
};

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
  },
  showButton: {
    position: 'absolute',
    top: 0,
    right: 16,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default InputPass;

import PropTypes from 'prop-types';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Title } from '../elements';
import { Input, InputPass } from '../forms/input';
import { useNavigation } from '@react-navigation/native';

const LoginForm = ({ style }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log({ email, password });
    setEmail('');
    setPassword('');
    navigation.navigate('Home', { sessionId: 45, userId: '22e24' });
  };

  return (
    <View style={style}>
      <Title label='Увійти' style={styles.title} />

      {/* EMAIL field */}
      <View style={styles.input}>
        <Input
          placeholder='Адреса електронної пошти'
          autoComplete='email'
          keyboardType='email-address'
          name='email'
          onChangeText={setEmail}
          value={email}
        />
      </View>

      {/* PASSWORD field */}
      <View style={styles.passInput}>
        <InputPass onChangeText={setPassword} value={password} />
      </View>

      {/* SUBMIT button */}
      <Button label='Увійти' onPress={handleLogin} />
    </View>
  );
};

LoginForm.propTypes = {
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 33,
  },
  input: {
    marginBottom: 16,
  },
  passInput: {
    marginBottom: 43,
  },
});

export default LoginForm;

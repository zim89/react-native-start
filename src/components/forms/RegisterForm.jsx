import PropTypes from 'prop-types';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button, Title } from '../elements';
import { Input, InputPass } from '../forms/input';
import { ProfileImage } from './image';

const RegisterForm = ({ style }) => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    console.log({ login, email, password });
    setLogin('');
    setEmail('');
    setPassword('');
    navigation.navigate('Home', { sessionId: 45, userId: '22e24' });
  };

  return (
    <View style={style}>
      <ProfileImage style={styles.userAvatar} />

      <Title label='Реєстрація' style={styles.title} />

      {/* LOGIN field */}
      <View style={styles.input}>
        <Input placeholder='Логін' autoComplete='username' name='login' onChangeText={setLogin} value={login} />
      </View>

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
      <Button label='Зареєструватися' onPress={handleRegister} />
    </View>
  );
};

RegisterForm.propTypes = {
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  userAvatar: {
    marginBottom: 32,
  },
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

export default RegisterForm;

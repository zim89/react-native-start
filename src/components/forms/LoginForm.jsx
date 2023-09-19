import { signInWithEmailAndPassword } from 'firebase/auth';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import { Button, Title, ErrorText } from '../elements';
import { Input, InputPass } from '../forms/input';
import { parseAuthError } from '../../helpers';
import { auth } from '../../configs/firebase';
import { setUser } from '../../redux/slices/authSlice';

const LoginForm = ({ style }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      email = email.trim();
      password = password.trim();
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      const { uid, displayName: username, photoURL: picture, email: userEmail } = credentials.user;
      dispatch(setUser({ uid, username, email: userEmail, picture }));
      reset();
    } catch (err) {
      const [name, message] = parseAuthError(err);
      setError(name, { type: 'custom', message });
    }
  };

  return (
    <View style={style}>
      <Title label='Увійти' style={styles.title} />

      {/* EMAIL field */}
      <View style={styles.input}>
        {errors.email && <ErrorText text={errors.email.message} />}
        <Controller
          control={control}
          rules={{ required: "Це поле - обов'язкове" }}
          render={({ field: { onChange, value } }) => (
            <Input
              autoComplete='email'
              keyboardType='email-address'
              placeholder='Адреса електронної пошти'
              onChangeText={onChange}
              value={value}
            />
          )}
          name='email'
        />
      </View>

      {/* PASSWORD field */}
      <View style={styles.passInput}>
        {errors.password && <ErrorText text={errors.password.message} />}
        <Controller
          control={control}
          rules={{ required: "Це поле - обов'язкове" }}
          render={({ field: { onChange, value } }) => <InputPass onChangeText={onChange} value={value} />}
          name='password'
        />
      </View>

      {errors.root && <ErrorText style={{ textAlign: 'center', marginBottom: 24 }} text={errors.root.message} />}

      {/* SUBMIT button */}
      <Button label='Увійти' onPress={handleSubmit(onSubmit)} disabled={isSubmitting} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 33,
  },
  input: {
    marginBottom: 16,
  },
  passInput: {
    marginBottom: 35,
  },
});

export default LoginForm;

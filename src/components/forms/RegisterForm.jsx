import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button, Title, ErrorText } from '../elements';
import ChangeableProfileImg from './ChangeableProfileImg';
import { Input, InputPass } from '../forms/input';
import { parseAuthError, uploadImage } from '../../helpers';
import { auth } from '../../configs/firebase';
import { setUser } from '../../redux/slices/authSlice';

const RegisterForm = ({ style }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      picture: null,
    },
  });

  const onSubmit = async ({ username, email, password, picture }) => {
    username = username.trim();
    email = email.trim();
    password = password.trim();

    try {
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credentials.user, {
        displayName: username,
        photoURL: picture && (await uploadImage('profile_images', picture.uri)),
      });

      const { photoURL, uid, email: userEmail } = credentials.user;
      dispatch(setUser({ uid, username, email: userEmail, picture: photoURL }));
      reset();
    } catch (err) {
      const [name, message] = parseAuthError(err);
      setError(name, { type: 'custom', message });
    }
  };

  return (
    <View style={style}>
      <Controller
        control={control}
        render={({ field: { value } }) => (
          <ChangeableProfileImg
            style={styles.userProfileImage}
            source={value}
            setSource={(picture) => setValue('picture', picture)}
          />
        )}
        name='picture'
      />

      <Title label='Реєстрація' style={styles.title} />

      {/* LOGIN field */}
      <View style={styles.input}>
        {errors.username && <ErrorText text={errors.username.message} />}
        <Controller
          control={control}
          rules={{
            required: "Це поле - обов'язкове",
            minLength: { value: 3, message: 'Мінімальна довжина - 3 символу' },
          }}
          render={({ field: { onChange, value } }) => (
            <Input autoComplete='username' placeholder='Логін' onChangeText={onChange} value={value} />
          )}
          name='username'
        />
      </View>

      {/* EMAIL field */}
      <View style={styles.input}>
        {errors.email && <ErrorText text={errors.email.message} />}
        <Controller
          control={control}
          rules={{
            required: "Це поле - обов'язкове",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}\s*$/i,
              message: 'Введіть валідний адрес пошти',
            },
          }}
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
          rules={{
            required: "Це поле - обов'язкове",
            minLength: { value: 6, message: 'Мінімальна довжина - 6 символів' },
          }}
          render={({ field: { onChange, value } }) => <InputPass onChangeText={onChange} value={value} />}
          name='password'
        />
      </View>

      {errors.root && <ErrorText style={{ textAlign: 'center', marginBottom: 24 }} text={errors.root.message} />}

      {/* SUBMIT button */}
      <Button label='Зареєструватися' onPress={handleSubmit(onSubmit)} disabled={isSubmitting} />
    </View>
  );
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
    marginBottom: 35,
  },
});

export default RegisterForm;

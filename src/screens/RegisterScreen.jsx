import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { KeyboardElement, BoxAuth, Background } from '../components/containers';
import { RegisterForm } from '../components/forms';
import { Link } from '../components/elements';

import bgImage from '../assets/images/bg_image.jpg';

const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <KeyboardElement verticalOffset={-160}>
      <Background image={bgImage}>
        <BoxAuth>
          <RegisterForm style={styles.registerForm} />

          <Link onPress={() => navigation.navigate('Login')}>Вже є аккаунт? Увійти</Link>
        </BoxAuth>
      </Background>
    </KeyboardElement>
  );
};

const styles = StyleSheet.create({
  registerForm: {
    marginBottom: 16,
  },
});

export default RegisterScreen;

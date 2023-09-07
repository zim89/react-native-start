import { StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { KeyboardElement, BoxAuth, Background } from '../components/containers';
import { LoginForm } from '../components/forms';
import { Link } from '../components/elements';

import bgImage from '../assets/images/bg_image.jpg';

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <KeyboardElement verticalOffset={-220}>
      <Background image={bgImage}>
        <BoxAuth style={styles.container}>
          <LoginForm style={styles.loginForm} />

          <Link onPress={() => navigation.navigate('Register')}>Немає акаунту? Зареєструватися</Link>
        </BoxAuth>
      </Background>
    </KeyboardElement>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 111,
  },
  loginForm: {
    marginBottom: 16,
  },
});
export default LoginScreen;

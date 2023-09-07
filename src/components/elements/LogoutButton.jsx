import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Login');
  };
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={handleLogout}>
      <Feather name='log-out' size={24} color='#bdbdbd' />
    </TouchableOpacity>
  );
};

export default LogoutButton;

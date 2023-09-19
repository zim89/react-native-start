import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { auth } from '../../configs/firebase';
import { setUser } from '../../redux/slices/authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth);
    dispatch(setUser(null));
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={handleLogout}>
      <Feather name='log-out' size={24} color='#bdbdbd' />
    </TouchableOpacity>
  );
};

export default LogoutButton;

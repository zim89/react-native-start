import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const GoBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
      <Ionicons name='arrow-back' size={24} color='rgba(33, 33, 33, 0.8)' />
    </TouchableOpacity>
  );
};

export default GoBackButton;

import PropTypes from 'prop-types';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { PostImage } from '../forms/image';
import { InputMute } from '../forms/input';
import { Button, DeleteButton } from '../elements';

const CreatePostForm = ({ style }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log({ name, location });
    setName('');
    setLocation('');
  };

  const handleDelete = () => {
    setName('');
    setLocation('');
  };

  return (
    <View style={style}>
      <View style={styles.image}>
        <PostImage />
      </View>

      <View style={styles.topInput}>
        <InputMute accent placeholder='Назва...' onChangeText={setName} value={name} />
      </View>

      <View style={styles.bottomInput}>
        <InputMute
          placeholder='Місцевість...'
          icon={<Feather name='map-pin' size={24} color='#dbdbdb' />}
          onChangeText={setLocation}
          value={location}
        />
      </View>

      <Button style={styles.submitButton} label='Опублікувати' onPress={handleSubmit} />
      <DeleteButton style={styles.deleteButton} />
    </View>
  );
};

CreatePostForm.propTypes = {
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  image: {
    marginBottom: 32,
  },
  topInput: {
    marginBottom: 16,
  },
  bottomInput: {
    marginBottom: 32,
  },
  submitButton: {
    marginBottom: 32,
  },
  deleteButton: {
    marginTop: 'auto',
    alignSelf: 'center',
  },
});

export default CreatePostForm;

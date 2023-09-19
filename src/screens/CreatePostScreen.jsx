import { StyleSheet, Text } from 'react-native';

import { KeyboardElement, Box } from '../components/containers';
import { CreatePostForm } from '../components/forms';

const CreatePostScreen = () => {
  return (
    <KeyboardElement verticalOffset={-20}>
      <Box>
        <CreatePostForm style={styles.createPostForm} />
      </Box>
    </KeyboardElement>
  );
};

const styles = StyleSheet.create({
  createPostForm: {
    height: '100%',
  },
});

export default CreatePostScreen;

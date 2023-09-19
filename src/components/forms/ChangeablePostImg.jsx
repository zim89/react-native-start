import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';

import { Spinner, ErrorText } from '../elements';

const ChangeablePostImg = ({ style, image, setImage, error }) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();

  const takePhoto = async () => {
    if (cameraRef) {
      setIsLoading(true);

      const { uri } = await cameraRef.takePictureAsync();
      setImage(await MediaLibrary.createAssetAsync(uri));
      setIsLoading(false);
    }
  };

  const resetPhoto = () => {
    setImage(null);
  };

  useEffect(() => {
    requestCameraPermission();
    requestMediaPermission();
  }, []);

  const pickImage = async () => {
    try {
      setIsLoading(true);
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.log('error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermission = cameraPermission?.granted && mediaPermission?.granted;
  const pictureAvailable = image || (hasPermission && cameraRef);

  return (
    <View style={[style]}>
      <View style={styles.container}>
        <View style={styles.pictureContainer}>
          {image || !hasPermission ? (
            <Image style={styles.picture} source={image} />
          ) : (
            //FIXME:
            <Camera style={styles.picture} ratio='1:1' zoom={0} type={CameraType.back} ref={setCameraRef} />
          )}
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={[
              styles.icon,
              pictureAvailable && {
                backgroundColor: 'rgba(255 255 255 / 0.3)',
              },
            ]}
            activeOpacity={0.6}
            disabled={isLoading}
            onPress={image ? resetPhoto : takePhoto}>
            {isLoading ? (
              <Spinner size={24} color={pictureAvailable ? '#fff' : '#bdbdbd'} />
            ) : (
              <FontAwesome
                name={image ? 'refresh' : 'camera'}
                size={24}
                color={pictureAvailable ? '#fff' : '#bdbdbd'}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {error ? (
        <ErrorText text={error} />
      ) : (
        <Text style={styles.bottomText}>{image ? 'Редагувати фото' : 'Завантажте фото'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 8,
  },
  pictureContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    backgroundColor: '#f6f6f6',
    width: '100%',
    height: 240,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picture: {
    aspectRatio: '1/1',
    height: 'auto',
    width: '100%',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    color: '#bdbdbd',
    fontFamily: 'Roboto-Regular',
  },
});

export default ChangeablePostImg;

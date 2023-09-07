import PropTypes from 'prop-types';
import { ImageBackground, StyleSheet } from 'react-native';

const Background = ({ children, image }) => (
  <ImageBackground style={styles.bgImage} source={image}>
    {children}
  </ImageBackground>
);

Background.propTypes = {
  children: PropTypes.any,
  image: PropTypes.any,
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default Background;

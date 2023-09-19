import { Feather } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const Spinner = ({ style, size, color }) => {
  const rotationValue = useRef(new Animated.Value(0)).current;

  useEffect(
    () =>
      Animated.loop(
        Animated.timing(rotationValue, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start(),
    []
  );

  const spin = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[style, { transform: [{ rotate: spin }] }]}>
      <Feather name='loader' size={size} color={color} />
    </Animated.View>
  );
};

export default Spinner;

import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import HomeNavigator from './HomeNavigator';
import { LoginScreen, RegisterScreen, CommentsScreen, MapScreen } from '../screens';
import { TitleHeader, GoBackButton } from '../components/elements';
import { selectIsAuth } from '../redux/slices/authSlice';

const MainStack = createStackNavigator();

const RootNavigator = () => {
  const isAuth = useSelector(selectIsAuth);

  return !isAuth ? (
    <MainStack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false,
        headerRightContainerStyle: {
          paddingRight: 16,
        },
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
      }}>
      <MainStack.Screen name='Login' component={LoginScreen} />
      <MainStack.Screen name='Register' component={RegisterScreen} />
    </MainStack.Navigator>
  ) : (
    <MainStack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        headerRightContainerStyle: {
          paddingRight: 16,
        },
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
      }}>
      <MainStack.Screen name='Home' component={HomeNavigator} />
      <MainStack.Screen
        name='Comments'
        component={CommentsScreen}
        options={{
          headerShown: true,
          headerTitle: () => <TitleHeader label='Коментарі' />,
          headerLeft: () => <GoBackButton />,
        }}
      />
      <MainStack.Screen
        name='Map'
        component={MapScreen}
        options={{
          headerShown: true,
          headerTitle: () => <TitleHeader label='Карта' />,
          headerLeft: () => <GoBackButton />,
        }}
      />
    </MainStack.Navigator>
  );
};

export default RootNavigator;

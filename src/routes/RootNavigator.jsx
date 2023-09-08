import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen, RegisterScreen, CommentsScreen, MapScreen } from '../screens';
import Home from "../screens/Home";
import { TitleHeader, GoBackButton } from '../components/elements';

const MainStack = createStackNavigator();

const RootNavigator = () => {
  return (
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
      <MainStack.Screen name='Home' component={Home} />
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

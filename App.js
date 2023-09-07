import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen, RegisterScreen, Home, CommentsScreen, MapScreen } from './src/screens';
import { TitleHeader, GoBackButton } from './src/components/elements';

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}

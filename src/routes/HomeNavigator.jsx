import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { PostsScreen, CreatePostScreen, ProfileScreen } from '../screens';
import { GoBackButton, LogoutButton, TitleHeader } from '../components/elements';

const Tabs = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          paddingHorizontal: 90,
          paddingTop: 15,
          marginBottom: 15,
          height: 71,
        },
        tabBarItemStyle: {
          height: 40,
          borderRadius: 20,
        },
        tabBarIconStyle: {
          size: 24,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: 'rgba(33, 33, 33, 0.8)',
        tabBarActiveBackgroundColor: '#FF6C00',
        tabBarInactiveBackgroundColor: 'transparent',
        headerRightContainerStyle: {
          paddingRight: 16,
        },
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
        headerRight: () => <LogoutButton />,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Posts') {
            return <AntDesign name='appstore-o' size={size} color={color} />;
          }
          if (route.name === 'CreatePost') {
            return <Feather name='plus' size={size} color={color} />;
          }
          if (route.name === 'Profile') {
            return <Feather name='user' size={24} color={color} />;
          }
        },
      })}>
      <Tabs.Screen
        name='Posts'
        component={PostsScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => <TitleHeader label='Публікації' />,
          headerLeft: false,
        }}
      />
      <Tabs.Screen
        name='CreatePost'
        component={CreatePostScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarStyle: { display: 'none' },
          headerTitle: () => <TitleHeader label='Створити публікацію' />,
          headerLeft: () => <GoBackButton />,
          headerRight: false,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
    </Tabs.Navigator>
  );
};
export default HomeNavigator;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserProfile from '../screens/Users';
import MakePromise from '../screens/MakePromise';
import Dashboard from '../screens/Dashboard';
import PromiseNetwork from '../screens/PromiseNetwork';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <HomeScreen />
  );
};

const Users = () => {
  return (
    <UserProfile />
  );
};

const AddScreen = () => {
  return (
   <MakePromise />
  );
};

const DashboardScreen = () => {
  return (
    <Dashboard />
  );
};

const NotificationsScreen = () => {
  return (
    <NotificationsScreen />
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName={'Home'}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'User') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Add') {
              iconName = focused ? 'add' : 'add-outline';
            } else if (route.name === 'Dashboard') {
              iconName = focused ? 'business' : 'business-outline';
            } else if (route.name === 'Notifications') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue', // Color when tab is active
          inactiveTintColor: 'gray', // Color when tab is inactive
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="User" component={PromiseNetwork} />
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

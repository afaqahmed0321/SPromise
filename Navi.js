import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLaunchScreen from './src/screens/AppLaunchScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import VerficationPage from './src/screens/VerficationPage';
import HomeScreen from './src/screens/HomeScreen';
import { View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './src/screens/Dashboard';
import MakePromise from './src/screens/MakePromise';
import Notifications from './src/screens/Notifications';
// import Users from './src/screens/Users';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import { FontAwesome, Ionicons } from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesi from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAw from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Review from './src/comp/makePromise/review';
import SnapPromiseVerification from './src/screens/SnapPromiseVerification';
import PromiseNetwork from './src/screens/PromiseNetwork';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';


import { useRecoilState } from 'recoil';
import { UserNo, token } from './src/recoil/AddPromise';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReqDashboard from './src/screens/ReqDashboard';
import Drawer from './src/comp/Drawer';
import Player from './src/comp/makePromise/Player';
import UserProfile from './src/screens/UserProfile';
import TransactionsHistory from './src/screens/TransactionsHistory';
import AdminPanel from './src/screens/AdminPanel';
import BraintreeDropInUI from './src/screens/Payment';
import PaymentScreen from './src/screens/PaymentScreen';
import { StripeProvider } from '@stripe/stripe-react-native';
import { STRIPE_PUBLIC_KEY } from './src/comp/Payment/helper';

import EnterNewPasswordScreen from './src/screens/EnterNewPasswordScreen';
import EnterOTPScreen from './src/screens/EnterOTPScreen';
import ForgetPasswordEmailScreen from './src/screens/ForgetPasswordEmailScreen';
import NetworkFeed from './src/comp/PromiseNetwork/NetworkFeed';
import PaymentScreens from './src/screens/PaymentScreens';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeScreenn() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'HomeScreenB') {
            iconName = 'envelope';
          }
          else if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          }
          else if (route.name === 'ReqDashboard') {
            iconName = 'git-pull-request';
          }
          else if (route.name === 'Users') {
            iconName = 'user';
          } else if (route.name === 'MakePromise') {
            iconName = 'check';
          } else if (route.name === 'Notifications') {
            iconName = 'bell';
          }

          // return <Feather name={iconName} size={size} color={color} />;
        },

        showLabel: false,
       
        style:{backgroundColor:'#fff'},
        tabBarStyle: {
          // position: 'absolute',
          // position: 'relative',
          backgroundColor: '#F4DEFF',
          display: 'flex',
          borderRadius: 23,
          width: wp(90),
          marginHorizontal: wp(5),
          height: hp(8),
          // marginLeft: wp(4),
          // marginHorizontal: wp()
          marginBottom: hp(2),
          // bottom: hp(5),
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
        },
        // tabBarActiveTintColor:'red'
        tabBarActiveTintColor: '#652D90',
        tabBarShowLabel: false,
        tabBarInactiveTintColor: '#C4A5D3',
        // tabBarActiveBackgroundColor: 'red',
        // tabBarIconStyle:{
        //   width: wp(1)
        // }
      })}>

      <Tab.Screen
        name="HomeScreenB"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View>
              <Feather name="home" color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAw name="handshake-simple" color={color} size={size} light />
          ),
          title: 'Promises',
        }}
      />
      <Tab.Screen
        name="MakePromise"
        component={MakePromise}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Promise Request Dashboard"
        component={ReqDashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <MaterialIcons name="space-dashboard" color={color} size={size} />
            <FontAw name="handshake-angle" color={color} size={size} />

          ),
          title: 'Promise Request'
        }}
      />

      {/* <Tab.Screen
        name="Users"
        component={Users}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="NetworkFeed"
        component={NetworkFeed}
        options={({ navigation }) => ({
          title: '',
          tabBarIcon: ({ color, size }) => (
            <AntDesi name="addusergroup" color={color} size={size} />
          ),
          headerStyle: {
            backgroundColor: '#E4EEE',
          },

          headerLeft: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginRight: wp(10), position: 'absolute', left: wp(4) }}>
                {/* <EvilIcon name="arrow-left" size={40} color="black" /> */}
                <FontAw5 name="arrow-alt-circle-left" size={30} color="#6650A4" />

              </TouchableOpacity>
            </View>
          ),
        })}
      />
      {/* <Tab.Screen
        name="PromiseNetwork"
        component={PromiseNetwork}
        options={({navigation}) => ({
          title: 'My Promise Network',
          tabBarIcon: ({color, size}) => (
            <Feather name="user" color={color} size={size} />
          ),
          headerStyle: {
            backgroundColor: '#E4EEE',
          },

          headerLeft: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{marginRight: wp(8)}}>
                <EvilIcon name="arrow-left" size={40} color="black" />
              </TouchableOpacity>
            </View>
          ),
        })}
      /> */}
      {/* <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: '#E4EEE6'},
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="notifications" color={color} size={size} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

const Auth = () => {
  const [Token, setToken] = useRecoilState(token);
  const [userN, setUserN] = useRecoilState(UserNo);
  useEffect(() => {
    readData();
  }, []);
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const UserNoV = await AsyncStorage.getItem('userNo');

      if (value !== null) {
        setToken(value);
        setUserN(UserNoV);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };
  return (
    <StripeProvider publishableKey={STRIPE_PUBLIC_KEY}>
      <NavigationContainer>
        <Stack.Navigator>
          {Token == '' ? (
            <>
              <Stack.Screen
                name="AppLaunchScreen"
                component={AppLaunchScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="VerficationPage"
                component={VerficationPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EnterNewPasswordScreen"
                component={EnterNewPasswordScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EnterOTPScreen"
                component={EnterOTPScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ForgetPasswordEmailScreen"
                component={ForgetPasswordEmailScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>

              <Stack.Screen
                name="HomeScreen"
                component={HomeScreenn}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Review"
                component={Review}
                options={{
                  title: 'Make Promise',
                  headerStyle: { backgroundColor: '#E4EEE6' },
                }}
              />
              <Stack.Screen
                name="SnapPromiseVerification"
                component={SnapPromiseVerification}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="UserProfile"
                component={UserProfile}
                options={{ headerShown: false }}
              />
              {/* <Stack.Screen

              name="AdminPanel"
              component={AdminPanel}
              options={{headerShown: false}}
            /> */}
              <Stack.Screen
                name="Player"
                component={Player}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="PaymentScreen"
                component={PaymentScreen}
                options={{ headerShown: true }}
              />
              {/* <Stack.Screen

              name="BraintreeDropInUI"
              component={BraintreeDropInUI}
              options={{headerShown: false}}
            /> */}
              {/* <Stack.Screen
              name="NetworkFeed"
              component={NetworkFeed}
              options={{headerShown: false}}
            /> */}
              {/* <Stack.Screen
              name="Drawer"
              component={Drawer}
              options={{headerShown: false}}
            /> */}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>

  );
};

export default Auth;

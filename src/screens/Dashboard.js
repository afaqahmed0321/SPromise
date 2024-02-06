/* The code is importing necessary components and libraries from React Native and other files. It is
defining a top tab navigator using `createMaterialTopTabNavigator` from the
`@react-navigation/material-top-tabs` library. The top tab navigator has multiple screens/components
such as `ShowAllTab`, `Pending`, `Ongoing`, `Complete`, and `Failed`. The `Dashboard` component
renders a view with two buttons for switching between "My Promises" and "Promises to Me". Depending
on the selected button, it renders the corresponding screens/components using the `DashboardTopTabs`
component. The styles are defined using `StyleSheet.create`. */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RecoilState, useRecoilState} from 'recoil';
import {MakeaPromise, deadline, startDate} from '../recoil/AddPromise';


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ShowAllTab from '../comp/Dashboard/Promise/MyPromise/ShowAllTab';
import Pending from '../comp/Dashboard/Promise/MyPromise/Pending';
import Ongoing from '../comp/Dashboard/Promise/MyPromise/Ongoing';
import Complete from '../comp/Dashboard/Promise/MyPromise/Complete';
import Failed from '../comp/Dashboard/Promise/MyPromise/Failed';
import ShowAllTabPTM from '../comp/Dashboard/Promise/PromisesToMe/ShowAllTabPTM';
import { showMyPromises } from '../recoil/Dashboard/dashBoard';
import OngoingPTM from '../comp/Dashboard/Promise/PromisesToMe/OngoingPTM';
import CompletePTM from '../comp/Dashboard/Promise/PromisesToMe/CompletePTM';
import FailedPTM from '../comp/Dashboard/Promise/PromisesToMe/FailedPTM';
import PendingPTM from '../comp/Dashboard/Promise/PromisesToMe/PendingPTM';

const Tab = createMaterialTopTabNavigator();


const DashboardTopTabs = () => {
  const [isMyPromisesV, setIsMyPromisesV] = useRecoilState(showMyPromises);
  return (
    <Tab.Navigator
    tabBarOptions={{

      activeTintColor: 'blue', // Color of the active tab label
      inactiveTintColor: 'gray', 
      
      labelStyle: {
        fontSize: hp(1.3 ), // Font size of the tab label
        fontWeight: 'bold', // Font weight of the tab label
        paddingHorizontal: 0,
        marginHorizontal: 0,
      },
      tabStyle: {
        backgroundColor: 'white', // Background color of the tab
      },
      indicatorStyle: {
        backgroundColor: 'blue', // Color of the indicator line
      },
    }}
    >
      <Tab.Screen name="Show All" component={isMyPromisesV ? ShowAllTab : ShowAllTabPTM } />
      <Tab.Screen name="Pending" component={isMyPromisesV ? Pending : PendingPTM } />
      <Tab.Screen name="Active" component={ isMyPromisesV ? Ongoing : OngoingPTM } />
      <Tab.Screen name="Complete" component={ isMyPromisesV ? Complete : CompletePTM} />
      <Tab.Screen name="Failed" component={ isMyPromisesV ? Failed : FailedPTM } />
      {/* <Tab.Screen name="Tab3" component={Screen3} /> */}
    </Tab.Navigator>
  );
};

const Dashboard = () => {
  
  const [isMyPromisesV, setIsMyPromisesV] = useRecoilState(showMyPromises);
  // const [isMyPromisesV, setisMyPromisesV] = useState(true);

  const makeprmsbg2 = ['#E4A936', '#EE8347'];
  const makeprmsbg1 = ['#EB6F1F', '#AA8F3C'];
  const rqstprmsbg2 = ['#73B6BF', '#2E888C'];
  const rqstprmsbg1 = ['#305B61', '#779A9C'];

  const [deadlinedate, setDeadLinedate] = useRecoilState(deadline);
  const [promidate, setPromidate] = useRecoilState(startDate);
  return (
    <View style={styles.container}>
        <View>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: hp(5),
            marginTop:hp(.5)
          }}>
          <TouchableOpacity
            onPress={() => {
              setIsMyPromisesV(true), setDeadLinedate(''), setPromidate('');
            }}
            style={styles.LinerC}>
            <LinearGradient
              colors={isMyPromisesV ? makeprmsbg1 : makeprmsbg2}
              style={styles.LinerC}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                Promises
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsMyPromisesV(false), setDeadLinedate(''), setPromidate('');
            }}
            style={styles.LinerC}>
            <LinearGradient
              colors={isMyPromisesV ? rqstprmsbg2 : rqstprmsbg1}
              style={styles.LinerC}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                Promises to Me
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
      </View>
      {
        isMyPromisesV ? (<DashboardTopTabs />) : (<DashboardTopTabs />)
      }
      
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
  LinerC: {
        // flex: 1,
        width: wp(45),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp(5),
       
        height: hp(5)
      },
});

export default Dashboard;


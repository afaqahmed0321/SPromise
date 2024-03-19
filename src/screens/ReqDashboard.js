import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useRecoilState } from 'recoil';
import { deadline, startDate } from '../recoil/AddPromise';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { showMyPromiseReq } from '../recoil/Dashboard/dashBoard';
import ShowAllTabPromiseReq from '../comp/Dashboard/ReqPromiseDashBoard/UserPromisesReq/ShowAllTabPromiseReq';
import PendingPromiseReq from '../comp/Dashboard/ReqPromiseDashBoard/UserPromisesReq/PendingPromiseReq';
import CompletePromiseReq from '../comp/Dashboard/ReqPromiseDashBoard/UserPromisesReq/CompletePromiseReq';
import FailedPromiseReq from '../comp/Dashboard/ReqPromiseDashBoard/UserPromisesReq/FailedPromiseReq';
import ShowAllTabPRTM from '../comp/Dashboard/ReqPromiseDashBoard/PromisesReqToUser/ShowAllTabPRTM';
import PendingPRTM from '../comp/Dashboard/ReqPromiseDashBoard/PromisesReqToUser/PendingPRTM';
import CompletePRTM from '../comp/Dashboard/ReqPromiseDashBoard/PromisesReqToUser/CompletePTM';
import FailedPRTM from '../comp/Dashboard/ReqPromiseDashBoard/PromisesReqToUser/FailedPTM';
const Tab = createMaterialTopTabNavigator();
const DashboardTopTabs = () => {
  const [isshowMyPromiseReqV, setIsShowMyPromiseReqV] = useRecoilState(showMyPromiseReq);
  return (
    <Tab.Navigator
      tabBarOptions={{

        activeTintColor: 'blue', inactiveTintColor: 'gray',

        labelStyle: {
          fontSize: hp(1.3), fontWeight: 'bold',
        },
        tabStyle: {
          backgroundColor: 'white',
        },
        indicatorStyle: {
          backgroundColor: 'blue',
        },
      }}
    >

      <Tab.Screen name="Show All" component={isshowMyPromiseReqV ? ShowAllTabPromiseReq : ShowAllTabPRTM } />
      <Tab.Screen name="Pending" component={isshowMyPromiseReqV ? PendingPromiseReq : PendingPRTM } />
      {/* <Tab.Screen name="Active" component={ isshowMyPromiseReqV ? OngoingPromiseReq : OngoingPRTM } /> */}
      <Tab.Screen name="Accepted" component={ isshowMyPromiseReqV ? CompletePromiseReq : CompletePRTM} />
      <Tab.Screen name="Rejected" component={ isshowMyPromiseReqV ? FailedPromiseReq : FailedPRTM } />
      {/* <Tab.Screen name="Tab3" component={Screen3} /> */}
    </Tab.Navigator>
  );
};

const ReqDashboard = () => {

  const [isshowMyPromiseReqV, setIsShowMyPromiseReqV] = useRecoilState(showMyPromiseReq);

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
            justifyContent: 'space-around',
            alignItems: 'center',
            height: hp(5),
            marginTop: hp(.5)
          }}>
          <TouchableOpacity
            onPress={() => {
              setIsShowMyPromiseReqV(true), setDeadLinedate(''), setPromidate('');
            }}
            style={styles.LinerC}>
            <LinearGradient
              colors={isshowMyPromiseReqV ? makeprmsbg1 : makeprmsbg2}
              style={styles.LinerC}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>
                My Requests
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity

            onPress={() => {
              setIsShowMyPromiseReqV(false), setDeadLinedate(''), setPromidate('');
            }}
            style={styles.LinerC}>
            <LinearGradient
              colors={isshowMyPromiseReqV ? rqstprmsbg2 : rqstprmsbg1}
              style={styles.LinerC}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Requests To Me
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </View>
      {
        isshowMyPromiseReqV ? (<DashboardTopTabs />) : (<DashboardTopTabs />)
      }


    </View>
  )
}

export default ReqDashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  LinerC: {
    width: wp(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(5),

    height: hp(5)
  },
});
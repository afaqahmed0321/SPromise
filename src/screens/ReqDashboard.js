import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useRecoilState } from 'recoil';
import { useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { deadline, startDate } from '../recoil/AddPromise';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { docNum, showMyPromiseReq, activeTabIndexState } from '../recoil/Dashboard/dashBoard';
import ShowAllTabPromiseReq from '../comp/Dashboard/ReqPromiseDashBoard/UserPromisesReq/ShowAllTabPromiseReq';
import PendingPromiseReq from '../comp/Dashboard/ReqPromiseDashBoard/UserPromisesReq/PendingPromiseReq';
import CompletePromiseReq from '../comp/Dashboard/ReqPromiseDashBoard/UserPromisesReq/CompletePromiseReq';
import FailedPromiseReq from '../comp/Dashboard/ReqPromiseDashBoard/UserPromisesReq/FailedPromiseReq';
import ShowAllTabPRTM from '../comp/Dashboard/ReqPromiseDashBoard/PromisesReqToUser/ShowAllTabPRTM';
import PendingPRTM from '../comp/Dashboard/ReqPromiseDashBoard/PromisesReqToUser/PendingPRTM';
import CompletePRTM from '../comp/Dashboard/ReqPromiseDashBoard/PromisesReqToUser/CompletePTM';
import FailedPRTM from '../comp/Dashboard/ReqPromiseDashBoard/PromisesReqToUser/FailedPTM';

const Tab = createMaterialTopTabNavigator();

const DashboardTopTabs = ({ initialTabIndex }) => {
  const [activeTabIndex, setActiveTabIndex] = useRecoilState(activeTabIndexState);

  useEffect(() => {
    if (initialTabIndex !== undefined) {
      setActiveTabIndex(initialTabIndex);
    }
  }, [initialTabIndex]);

  const [isshowMyPromiseReqV, setIsShowMyPromiseReqV] = useRecoilState(showMyPromiseReq);

  return (
    <Tab.Navigator
      initialRouteName={activeTabIndex === 0 ? 'Show All' : activeTabIndex === 1 ? 'Pending' : activeTabIndex === 2 ? 'Accepted' : 'Rejected'}
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: hp(1.3),
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: 'white',
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'blue',
        },
      }}
    >
      <Tab.Screen name="Show All" component={isshowMyPromiseReqV ? ShowAllTabPromiseReq : ShowAllTabPRTM} />
      <Tab.Screen name="Pending" component={isshowMyPromiseReqV ? PendingPromiseReq : PendingPRTM} />
      <Tab.Screen name="Accepted" component={isshowMyPromiseReqV ? CompletePromiseReq : CompletePRTM} />
      <Tab.Screen name="Rejected" component={isshowMyPromiseReqV ? FailedPromiseReq : FailedPRTM} />
    </Tab.Navigator>
  );
};

const ReqDashboard = () => {
  const [doc, setDoc] = useRecoilState(docNum);
  const [isshowMyPromiseReqV, setIsShowMyPromiseReqV] = useRecoilState(showMyPromiseReq);
  const [deadlinedate, setDeadLinedate] = useRecoilState(deadline);
  const [promidate, setPromidate] = useRecoilState(startDate);
  const [activeTabIndex, setActiveTabIndex] = useRecoilState(activeTabIndexState);

  const route = useRoute();
  const docNo = route?.params?.docNo;

  useEffect(() => {
    console.log('Received docNo:', docNo);
    if (docNo) {
      setDoc(docNo); // Set the docNo in Recoil state
      setIsShowMyPromiseReqV(false); // Show "Requests To Me" if docNo is present
      setActiveTabIndex(1); // Set to 'Pending' tab or any other logic you prefer
    } else {
      setIsShowMyPromiseReqV(true); // Default to "My Requests" if docNo is not present
      setActiveTabIndex(0); // Set to 'Show All' tab by default
    }
  }, [docNo]);

  const makeprmsbg2 = ['#E4A936', '#EE8347'];
  const makeprmsbg1 = ['#EB6F1F', '#AA8F3C'];
  const rqstprmsbg2 = ['#73B6BF', '#2E888C'];
  const rqstprmsbg1 = ['#305B61', '#779A9C'];

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: hp(5),
            marginTop: hp(0.5),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIsShowMyPromiseReqV(true);
              setDeadLinedate('');
              setPromidate('');
              setActiveTabIndex(0); // Reset to 'Show All' tab when switching
            }}
            style={styles.LinerC}
          >
            <LinearGradient colors={isshowMyPromiseReqV ? makeprmsbg1 : makeprmsbg2} style={styles.LinerC}>
              <Text style={{ color: 'white', textAlign: 'center' }}>My Requests</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsShowMyPromiseReqV(false);
              setDeadLinedate('');
              setPromidate('');
              setActiveTabIndex(0); // Reset to 'Show All' tab when switching
            }}
            style={styles.LinerC}
          >
            <LinearGradient colors={isshowMyPromiseReqV ? rqstprmsbg2 : rqstprmsbg1} style={styles.LinerC}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Requests To Me</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <DashboardTopTabs initialTabIndex={activeTabIndex} />
    </View>
  );
};

export default ReqDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  LinerC: {
    width: wp(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(5),
    height: hp(5),
  },
});

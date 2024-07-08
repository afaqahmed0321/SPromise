import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRecoilState } from 'recoil';
import { deadline, startDate } from '../recoil/AddPromise';
import { useRoute, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ShowAllTab from '../comp/Dashboard/Promise/MyPromise/ShowAllTab';
import Pending from '../comp/Dashboard/Promise/MyPromise/Pending';
import Ongoing from '../comp/Dashboard/Promise/MyPromise/Ongoing';
import Complete from '../comp/Dashboard/Promise/MyPromise/Complete';
import Failed from '../comp/Dashboard/Promise/MyPromise/Failed';
import ShowAllTabPTM from '../comp/Dashboard/Promise/PromisesToMe/ShowAllTabPTM';
import { showMyPromises, docNum } from '../recoil/Dashboard/dashBoard';
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
        activeTintColor: '#652D90',
        inactiveTintColor: 'gray',
        padding: 0,
        margin: 0,
        labelStyle: {
          fontSize: hp(1.2),
          fontWeight: 'bold',
          padding: 0,
          margin: 0,
        },
        tabStyle: {
          backgroundColor: 'white',
          padding: 0,
          margin: 0,
        },
        indicatorStyle: {
          backgroundColor: '#652D90',
        },
      }}>
      <Tab.Screen name="Show All" component={isMyPromisesV ? ShowAllTab : ShowAllTabPTM} />
      <Tab.Screen name="Pending" component={isMyPromisesV ? Pending : PendingPTM} />
      <Tab.Screen name="Active" component={isMyPromisesV ? Ongoing : OngoingPTM} />
      <Tab.Screen name="Completed" component={isMyPromisesV ? Complete : CompletePTM} />
      <Tab.Screen name="Failed" component={isMyPromisesV ? Failed : FailedPTM} />
    </Tab.Navigator>
  );
};

const Dashboard = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [doc, setDoc] = useRecoilState(docNum);
  const [isMyPromisesV, setIsMyPromisesV] = useRecoilState(showMyPromises);
  const [deadlinedate, setDeadLinedate] = useRecoilState(deadline);
  const [promidate, setPromidate] = useRecoilState(startDate);

  useEffect(() => {
    if (route.params?.docNo) {
      setDoc(route.params.docNo);
      setIsMyPromisesV(false); // Set to "Promises to Me" if docNo is present
    } else {
      setIsMyPromisesV(true); // Default to "My Promises" if docNo is not present
    }
  }, [route.params]);

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
          }}>
          <TouchableOpacity
            onPress={() => {
              setIsMyPromisesV(true), setDeadLinedate(''), setPromidate('');
            }}
            style={styles.LinerC}>
            <LinearGradient
              colors={isMyPromisesV ? makeprmsbg1 : makeprmsbg2}
              style={styles.LinerC}>
              <Text style={{ color: 'white', textAlign: 'center' }}>My Promises</Text>
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
              <Text style={{ color: 'white', textAlign: 'center' }}>Promises to Me</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      {isMyPromisesV ? <DashboardTopTabs /> : <DashboardTopTabs />}
    </View>
  );
};

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

export default Dashboard;

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { PlayerData } from '../Data/Data';
import { Headings } from '../Styling/Headings';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import PromiseStatusData from './PromiseStatusData';
import LeaderBoard from './LeaderBoard';
import { useRecoilState } from 'recoil';
import { UserNo } from '../recoil/AddPromise';
import { useFocusEffect } from '@react-navigation/native';
import fetchOnGoingPromises from '../Network/Users/GetOnGoingPromises';
import { useIsFocused } from '@react-navigation/native';
import DetailCard from './Global/DetailCard';
import { onGoingPromisesListCard } from '../recoil/Dashboard/dashBoard';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import MyPromisesApi from '../Network/Dashboard/Promises/MyPromisesApi/MyPromisesApi';
import PromisesToMeApi from '../Network/Dashboard/Promises/PromisesToMeApi/PromisesToMeApi';
import GetPromiseRequestToUser from '../Network/Dashboard/PromiseReq/GetPromiseReqToUser';
import GetUserPromiseRequest from '../Network/Dashboard/PromiseReq/GetUserPromiseReq';

data = PlayerData;

const HomePageDataSection = () => {
  const [rating, setRating] = useState(0);
  const [promises, setPromises] = useState([]);
  const [promisesToMe, setpromisesToMe] = useState([]);
  const [promisesReq, setPromisesReq] = useState([]);
  const [promisesReqToMe, setpromisesReqToMe] = useState([]);
  const [myPromisesLis, setMyPromisesLis] = useState([])
  const [promisesToMeList, setPromisesToMeList] = useState([])
  const [userN, setUserN] = useRecoilState(UserNo);
  const [showDetail, setshowDetail] = useState('');
  const [onGoingPromises, setOnGoingPromises] = useRecoilState(onGoingPromisesListCard);
  const [forName, setForName] = useState(false);
  const [timer, setTimer] = useState(true);

  const focus = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [refersh, setrefresh] = useState(false);
  const fetchData = async () => {
    console.log("Fetch data call")

    // setPromises();
    setIsLoading(true);
    await MyPromisesApi(userN)
      .then(data => {
        setPromises(data);
        // setIsLoading(false);
        console.log(data, "active promises MyPromisesApi")
      })
      .catch(error => {
        console.error('Error fetching promises:', error);
        setIsLoading(false);
      });

    await PromisesToMeApi(userN)
      .then(data => {
        setpromisesToMe(data);
        // setIsLoading(false);
        console.log(data, "active promises PromisesToMeApi" )
      })
      .catch(error => {
        console.error('Error fetching promises:', error);
        setIsLoading(false);
      });


    await GetPromiseRequestToUser(userN)
      .then(data => {
        setPromisesReq(data);
        // setIsLoading(false);
        console.log(data, "active promises GetPromiseRequestToUser")
      })
      .catch(error => {
        console.error('Error fetching promises:', error);
        setIsLoading(false);
      });

    await GetUserPromiseRequest(userN)
      .then(data => {
        setpromisesReqToMe(data);
        // setIsLoading(false);
        console.log(data, "active promises GetUserPromiseRequest")
      })
      .catch(error => {
        console.error('Error fetching promises:', error);
        setIsLoading(false);
      });


    setIsLoading(true);
  };
  const onRefresh = () => {
    setrefresh(!refersh);
  };
  useEffect(() => {
    console.log("useEffect call")
    fetchData();
  }, [focus, refersh]);
  
  useEffect(() => {
    console.log("useEffect call 2")
    fetchData();
    setTimeout(()=>{
      setTimer(false);
    },500)
  },[timer]);

  const renderItem = ({ item, index }) => (
    <>
    {item.actions == 'Pay' && setForName(true)}
    {console.log("itemsss", item)}
      {showDetail == item.promiseID ? (
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center', }}
          onPress={() => {
            setshowDetail('');
          }}>
          <View style={{ flex: 1, marginHorizontal: 10, paddingHorizontal: 10 }} >
            {console.log(item,"bharwy")}
            <DetailCard
              promiseeProfileImageUrl={item.promiseeProfileImageUrl}
              promisetype={item.promiseType}
              amount={item.paymentAmount}
              promiseeName={item.promiseeName}
              promisorName={item.promisorName}
              date={item.expiryDate}
              promiseMediaURL={item.promiseMediaURL}
              ratingImpact={item.ratingImpact}
              promiseGoal={item.promiseGoal}
              actions={item.actions}
              promiseID={item.promiseID}
              refreshCallback={onRefresh}
              rewardPoints={item.rewardPoints}
              onGoingPromises={onGoingPromises}
              userN={userN}
              tab={
                'Home'
              }
              jugaar="abc"
            />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setshowDetail(item.promiseID)}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <LinearGradient
              colors={
                item.actions == "Pay" ? ['#E4A936', '#EE8347']
                  : ['#73B6BF', '#2E888C']
              }
              style={styles.Card}>
              <View style={{ margin: hp(0.8) }}>
                <View style={{ flexDirection: 'row', marginLeft: wp(2) }}>
                  <View
                    style={{
                      backgroundColor: '#888888',
                      width: wp(8),
                      height: hp(4),
                      borderRadius: wp(4),
                    }}>
                    <Image
                      source={
                        item.promiseeProfileImageUrl === ''
                          ? {
                            uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                          }
                          : { uri: item.promiseeProfileImageUrl }
                      }
                      style={{
                        width: wp(8),
                        height: hp(4),
                        borderRadius: wp(4),
                      }}
                    />
                  </View>
                  <View
                    style={{
                      marginLeft: wp(2),
                      justifyContent: 'center',
                      width: wp(33),
                    }}>
                    <Text
                      style={[
                        Headings.Input6,
                        { marginLeft: wp(0.7), color: 'white', marginTop: wp(1) },
                      ]}>
                        {item.actions == 'Pay' ? item?.promiseeName : item?.promisorName}
                      {}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginLeft: wp(17),
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View>
                        <Entypo size={18} color="white" name="calendar" />
                      </View>

                      <View style={{ alignSelf: 'center', marginHorizontal: 2 }}>
                        <Text
                          style={[
                            Headings.Input6,
                            { color: 'white', textAlign: 'center' },
                          ]}>
                          {format(new Date(item.expiryDate), 'dd/MM/yyyy')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      )}
    </>
  );

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: wp(90), marginBottom: hp(2) }}>
        <View style={[styles.statesSecOne, { height: hp(21) }]}>
          <PromiseStatusData />
        </View>
      </View>
      <View style={styles.mainContainer}>

        <View style={styles.SubContainter}>
          <View style={[styles.statesSecOne, { height: hp(21) }]}>
            <LeaderBoard />
          </View>
        </View>
      </View>
      <View style={styles.DataSection}>
        <View>
          <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", alignContent: "center", marginHorizontal: 10, marginVertical: 3 }}>
            <View style={styles.bar}>
              <Text style={styles.barText}>Ongoing Promises</Text>
            </View>
            <TouchableOpacity onPress={() => setrefresh(!refersh)}>
              <View style={{ marginRight: 15 }}>
                <FontAw5
                  name="sync"
                  size={15}
                  color="#6650A4"

                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={[
            ...promises.filter(item => item.status === 'AmountDue'),
            ...promisesToMe.filter(item => item.status === 'AmountDue'),
            ...promisesReq.filter(item => item.status === 'AmountDue'),
            ...promisesReqToMe.filter(item => item.status === 'AmountDue'),
          ]} 
          renderItem={renderItem}
          keyExtractor={(item, index) => item.promiseID.toString()}
          style={{ marginBottom: hp(.2) }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default HomePageDataSection;

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(90),
    // borderWidth: wp(0.3),
    // height: hp(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SubContainter: {
    width: wp(40),
    height: hp(20),
  },
  bar: {
    height: hp(3),
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  barText: {
    fontSize: hp(1.5),
    marginLeft: wp(1.5),
    marginRight: wp(1.4),
    color: '#652D90',
    fontWeight: 'bold',
    paddingLeft: wp(2),
    // paddingRight: wp(2)
  },
  DataSection: {
    width: wp(90),
    // borderWidth: wp(0.3),
    height: hp(30),
    // borderRadius: wp(4),
    backgroundColor: '#DDDFE2',
    borderRadius: wp(5),
    // borderTopLeftRadius: wp(5),
    // borderTopWidth: wp(.6),
    // borderColor:'#652D90',
    marginTop: hp(3),
  },

  states: {
    width: wp(39),
    // borderWidth: wp(0.3),
    height: hp(40),
    borderColor: 'red',
    flexDirection: 'colom',
    marginLeft: wp(1),
  },

  statesSecOne: {
    width: wp(90),
    // borderWidth: wp(0.3),
    height: hp(21),
    // borderColor: 'red',
    backgroundColor: '#DDDFE2',
    borderRadius: wp(5),
  },
  Card: {
    width: '95%',
    // borderWidth: wp(0.5),
    height: hp(6),
    // borderWidth: wp(0.5),
    marginTop: hp(0.7),
    // marginLeft: hp(0.8),
    borderRadius: wp(5),
  },
});


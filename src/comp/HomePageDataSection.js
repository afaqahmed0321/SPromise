import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
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
import { useIsFocused } from '@react-navigation/native';
import DetailCard from './Global/DetailCard';
import { onGoingPromisesListCard } from '../recoil/Dashboard/dashBoard';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import MyPromisesApi from '../Network/Dashboard/Promises/MyPromisesApi/MyPromisesApi';
import PromisesToMeApi from '../Network/Dashboard/Promises/PromisesToMeApi/PromisesToMeApi';
import GetPromiseRequestToUser from '../Network/Dashboard/PromiseReq/GetPromiseReqToUser';
import GetUserPromiseRequest from '../Network/Dashboard/PromiseReq/GetUserPromiseReq';
import RewardPoints from './RewardPoints';

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
    setIsLoading(true);
    await MyPromisesApi(userN)
      .then(data => {
        setPromises(data);
      })
      .catch(error => {
        console.error('Error fetching promises:', error);
        setIsLoading(false);
      });

    await PromisesToMeApi(userN)
      .then(data => {
        setpromisesToMe(data);
      })
      .catch(error => {
        console.error('Error fetching promises:', error);
        setIsLoading(false);
      });
    await GetPromiseRequestToUser(userN)
      .then(data => {
        setPromisesReq(data);
      })
      .catch(error => {
        console.error('Error fetching promises:', error);
        setIsLoading(false);
      });

    await GetUserPromiseRequest(userN)
      .then(data => {
        setpromisesReqToMe(data);
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
    fetchData();
  }, [focus, refersh]);

  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setTimer(false);
    }, 500)
  }, [timer]);
  const data = [
    ...promises.filter(item => item.status === 'AmountDue' || item.status === 'MarkedforCompletion' || item.status === 'Accepted' || item.status === 'Pending'),
    ...promisesToMe.filter(item => item.status === 'AmountDue' || item.status === 'MarkedforCompletion' || item.status === 'Accepted' || item.status === 'Pending'),
    ...promisesReq.filter(item => item.status === 'Pending') ,
    ...promisesReqToMe.filter(item =>  item.status === 'Pending'),
  ];

  const renderItem = ({ item, index }) => (
    <>
      {item.status == 'Pay' && setForName(true)}
      {showDetail == item.promiseID ? (
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center', }}
          onPress={() => {
            setshowDetail('');
          }}>
          <View style={{ flex: 1, marginHorizontal: hp(1), paddingHorizontal: 10 }} >
            <DetailCard
              promiseeProfileImageUrl={item?.promiseeProfileImageUrl}
              isTimeBound={item?.isTimeBound}
              displayStatus={item?.displayStatus}
              promisetype={item.promiseType}
              amount={item.paymentAmount}
              promiseeName={item?.promiseeName}
              promisorName={item.promisorName}
              date={item.expiryDate}
              promiseMediaURL={item?.promiseMediaURL ? item?.promiseMediaURL : null}
              promisor = {item?.promisor}
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
              status = {item?.status}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setshowDetail(item.promiseID)}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <LinearGradient
              colors={
                (item.promisor == userN ) ? ['#E4A936', '#EE8347']
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
                        item?.promiseeProfileImageUrl === ''
                          ? {
                            uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                          }
                          : { uri: item?.promiseeProfileImageUrl }
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
                      {item.promisor == userN ? item?.promiseeName : item?.promisorName}
                      { }
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

                      {item?.isTimeBound ? (
                        <>
                          <View>
                            <Entypo size={18} color="white" name="calendar" />
                          </View>

                          <View style={{ alignSelf: 'center', marginHorizontal: hp(0.2) }}>
                            <Text
                              style={[
                                Headings.Input6,
                                { color: 'white', textAlign: 'center' },
                              ]}>
                              {format(new Date(item.expiryDate), 'MM/dd/yyyy')}
                            </Text>
                          </View>
                        </>
                      ) : (
                        null
                      )}

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
        {data.length === 0 ? (
          <View style={{ width: "100%", height: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 16, textAlign: "center", color: "grey" }}>No Ongoing Promises</Text>
          </View>
        ) : (
          <FlatList
            data={data.sort((a, b) => new Date(a.promiseDate) - new Date(b.promiseDate))}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.promiseID.toString()}
            style={{ marginBottom: hp(.2) }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default HomePageDataSection;

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(90),
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
  },
  DataSection: {
    width: wp(90),
    height: hp(30),
    backgroundColor: '#DDDFE2',
    borderRadius: wp(5),
    marginTop: hp(3),
  },

  states: {
    width: wp(39),
    height: hp(40),
    borderColor: 'red',
    flexDirection: 'colom',
    marginLeft: wp(1),
  },

  statesSecOne: {
    width: wp(90),
    height: hp(21),
    backgroundColor: '#DDDFE2',
    borderRadius: wp(5),
  },
  Card: {
    width: '95%',
    height: hp(6),
    marginTop: hp(0.7),
    borderRadius: wp(5),
  },
});


import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {PlayerData} from '../Data/Data';
import {Headings} from '../Styling/Headings';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import PromiseStatusData from './PromiseStatusData';
import LeaderBoard from './LeaderBoard';
import {useRecoilState} from 'recoil';
import {UserNo} from '../recoil/AddPromise';
import {useFocusEffect} from '@react-navigation/native';
import fetchOnGoingPromises from '../Network/Users/GetOnGoingPromises';
import {useIsFocused} from '@react-navigation/native';

data = PlayerData;

const HomePageDataSection = () => {
  const [rating, setRating] = useState(0);
  const [promises, setPromises] = useState([]);
  const [userN, setUserN] = useRecoilState(UserNo);
  const focus = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    // setPromises();
    setIsLoading(true);
    await fetchOnGoingPromises(userN)
      .then(data => {
        setPromises(data);
        // setIsLoading(false);
        // console.log(data)
      })
      .catch(error => {
        console.error('Error fetching promises:', error);
        setIsLoading(false);
      });
    setIsLoading(true);
  };

  useEffect(() => {
    fetchData();
  }, [focus]);
  // useEffect(() => {
  //   fetchData()

  //  }, []);
  // useFocusEffect(

  //   React.useCallback(() => {
  //     fetchData();
  //   }, [])
  // );

  const renderItem = ({item, index}) => (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <LinearGradient
        colors={
          index % 2 === 0 ? ['#E4A936', '#EE8347'] : ['#73B6BF', '#2E888C']
        }
        style={styles.Card}>
        <View style={{margin: hp(0.8)}}>
          <View style={{flexDirection: 'row', marginLeft: wp(2)}}>
            <View
              style={{
                backgroundColor: '#888888',
                width: wp(8),
                height: hp(4),
                borderRadius: wp(4),
              }}>
              <Image
                source={
                  item.promisorProfileImageUrl === ''
                    ? {
                        uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                      }
                    : {uri: item.promisorProfileImageUrl}
                }
                style={{
                  width: wp(8),
                  height: hp(4),
                  borderRadius: wp(4), // Half of the width
                  // marginLeft: wp(2),
                  // marginTop: hp(1),
                }}
              />
            </View>
            <View style={{marginLeft: wp(2),justifyContent:'center',  width: wp(33)}}>
              <Text
                style={[
                  Headings.Input6,
                  {marginLeft: wp(0.7), color: 'white', marginTop: wp(1),},
                ]}>
                {item.promisorName}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginLeft: wp(17),
              }}>
              {/* <View style={{width: wp(14)}}>
                <Text
                  style={[
                    Headings.Input6,
                    {marginLeft: wp(0.7), color: 'white', marginTop: wp(1)},
                  ]}>
                  {item.promisorName}
                </Text>
              </View> */}
              <View style={{flexDirection: 'row'}}>
                <View >
                  <Entypo size={18} color="white" name="calendar" />
                </View>

                <View style={{alignSelf:'center',marginHorizontal:2}}>
                  <Text
                    style={[
                      Headings.Input6,
                      { color: 'white',textAlign:'center'},
                    ]}>
                    {format(new Date(item.expiryDate), 'dd/MM/yyyy')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                width: wp(42),
                marginVertical: hp(1),
                height: hp(5),
                // borderWidth: 1,
              }}>
              <Text
                style={[
                  Headings.Input6,
                  {
                    marginLeft: wp(0.7),
                    color: 'white',
                    marginTop: wp(1),
                    fontSize: hp(1.5),
                    textAlign: 'center',
                  },
                ]}>
                {item.promiseGoal}
              </Text>
            </View>
            <Text
              style={[
                Headings.Input6,

                {
                  marginLeft: wp(0.7),
                  color: 'white',
                  marginTop: wp(0.3),
                  fontSize: hp(1.5),
                  textAlign: 'center',
                  fontWeight: 'bold',
                },
              ]}>
              $ {item.paymentAmount}
            </Text>
          </View> */}
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={{ width:wp(90),marginBottom:hp(2)}}>
      {/* <View style={styles.SubContainter}> */}
      <View style={[styles.statesSecOne, {height: hp(21)}]}>

          <PromiseStatusData />
          </View>
        {/* </View> */}
      </View>
      <View style={styles.mainContainer}>
        
        <View style={styles.SubContainter}>
          {/* <LeaderBoard />
           */}

          <View style={[styles.statesSecOne, {height: hp(21)}]}>
            {/* <View style={styles.LeaderBoard}>             */}
              <LeaderBoard />
            {/* </View> */}
          </View>
        </View>
       

        {/* <View style={styles.states}>
        <View style={[styles.statesSecOne]}>
          <PromiseStatusData />
        </View>
   
        <View style={[styles.statesSecOne, { height: hp(18),}]}>
          <View style={styles.LeaderBoard}>
        <LeaderBoard />

          </View>
        </View>
        
      </View> */}
      </View>
      <View style={styles.DataSection}>
        <View>
          <View style={styles.bar}>
            <Text style={styles.barText}>Active Promises</Text>
            {/* <TouchableOpacity>
              <Text style={styles.barText}>View All</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <FlatList
          data={promises}
          renderItem={renderItem}
          // keyExtractor={(item, index) => index.toString()}
          keyExtractor={(item, index) => item.promiseID.toString()}
          style={{marginBottom:hp(.2)}}
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
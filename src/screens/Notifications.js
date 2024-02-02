import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {Headings} from '../Styling/Headings';
import {UserNo} from '../recoil/AddPromise';
import {useRecoilState} from 'recoil';
import {useFocusEffect} from '@react-navigation/native';
import fetchNotification from '../Network/Notifications/Notification';
import {useIsFocused} from '@react-navigation/native';
import {
  DetailsModalVi,
  NotificationData,
} from '../recoil/Notifications/NotificationsStates';
import NoticationCard from '../comp/Notifications/NotificationCard';
import LinearGradient from 'react-native-linear-gradient';
import { RefreshControl } from 'react-native';


const Notifications = ({navigation}) => {
  const [rating, setRating] = useState(0);
  const [notilist, setNotificationList] = useState([]);
  const [userN, setUserN] = useRecoilState(UserNo);
  const focus = useIsFocused();
  const [isModalV, setIsModalV] = useRecoilState(DetailsModalVi);
  const [noti, setNoti] = useRecoilState(NotificationData);
  const [isLoading, setIsLoading] = useState(true);
  const [refersh, setrefresh] = useState(false);

  const onRefresh = () => {
    setrefresh(!refersh);
  };

  const bgBtnmakeprms = ['#E4A936', '#EE8347'];
  const bgBtnrqstprms = ['#73B6BF', '#2E888C'];

  const renderItem = ({item}) => (

    <>

    <TouchableOpacity
      onPress={() => {
        setNoti(item);
        console.log(item, 'Noti');
        setIsModalV(true);
       
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp(1.5),
        width: wp(90),
      }}>
      <LinearGradient
        colors={
          item.notificationMethod === 'Promise'
            ? bgBtnmakeprms 
            : bgBtnrqstprms
        }
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            borderRadius: wp(50),
          },
        ]}>
        {/* <Text style={{color: 'white', textAlign: 'center'}}>Next</Text> */}

        {/* <Text>{item.userName}</Text> */}
        <View
          style={{
            width: wp(90),
            height: hp(7),
            // backgroundColor: '#FFE4BB',
            borderRadius: wp(9),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            // source={{uri:item.imageURL}}
            source={
              item.imageURL === ''
                ? {
                    uri: 'https://freesvg.org/img/abstract-user-flat-4.png',
                  }
                : {uri: item.imageURL}
            }
            style={{
              width: wp(13),
              height: hp(6),
              borderRadius: wp(12) / 2,
              borderColor: '#F99C68',
              // borderWidth: wp(.5),
              position: 'absolute',
              left: wp(0),
            }}
          />
          {/* </View> */}
          <Text style={{marginLeft: wp(11), color: 'black', width: wp(70)}}>
            {item.description}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
    </>
  );

  const fetchNoti = async () => {
    // setPromises();
    await fetchNotification(userN)
      .then(data => {
        setNotificationList(data);
        setIsLoading(false);
        console.log("i am notification data",data);
      })
      .catch(error => {
        console.error('Error fetching promises:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchNoti();
  }, [focus,refersh]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#E4EEE6',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(.2)
      }}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#E4EEE6',
            // borderTopWidth: hp(0.2),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={onRefresh}
                colors={['#E4A936', '#EE8347']} // Android
                tintColor="white" // iOS
                title="Refreshing..." // iOS
                titleColor="white" // iOS
              />
            }
            data={notilist}
            keyExtractor={item => item.serialNo.toString()}
            renderItem={renderItem}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalV}
            onRequestClose={isModalV}>
            <NoticationCard />
          </Modal>
        </View>
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(90),
    borderWidth: wp(0.3),
    height: hp(40),
    flexDirection: 'row',
  },
  bar: {
    height: hp(3),
    width: wp(100),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  barText: {
    fontSize: hp(1.5),
    marginRight: wp(5),
    color: '#652D90',
    fontWeight: 'bold',
  },
  DataSection: {
    width: wp(48),
    borderWidth: wp(0.3),
    height: hp(40),
    // borderRadius: wp(4),
    backgroundColor: '#DDDFE2',
  },

  states: {
    width: wp(39),
    borderWidth: wp(0.3),
    height: hp(40),
    borderColor: 'red',
    flexDirection: 'colom',
    marginLeft: wp(1),
  },

  statesSecOne: {
    width: wp(42),
    // borderWidth: wp(0.3),
    height: hp(20),
    // borderColor: 'red',
    backgroundColor: '#DDDFE2',
    borderRadius: wp(5),
  },
  Card: {
    width: wp(100),
    // borderWidth: wp(0.5),
    height: hp(15),
    // borderWidth: wp(0.5),
    marginTop: hp(0.7),
    // marginLeft: hp(0.8),
    borderRadius: wp(5),
  },
});

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { UserNo } from '../recoil/AddPromise';
import { useRecoilState } from 'recoil';
import fetchNotification from '../Network/Notifications/Notification';
import { useIsFocused } from '@react-navigation/native';
import {
  DetailsModalVi,
  NotificationData,
} from '../recoil/Notifications/NotificationsStates';
import NoticationCard from '../comp/Notifications/NotificationCard';
import LinearGradient from 'react-native-linear-gradient';
import { RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EvilIcon from 'react-native-vector-icons/FontAwesome5';

const Notifications = ({ navigation }) => {
  const [notilist, setNotificationList] = useState([]);
  const [userN, setUserN] = useRecoilState(UserNo);
  const focus = useIsFocused();
  const [isModalV, setIsModalV] = useRecoilState(DetailsModalVi);
  const [noti, setNoti] = useRecoilState(NotificationData);
  const [isLoading, setIsLoading] = useState(true);
  const [refersh, setrefresh] = useState(false);
  const [viewedNotifications, setViewedNotifications] = useState([]);
  
  useEffect(() => {
    AsyncStorage.getItem('viewedNotifications').then((value) => {
      if (value) {
        setViewedNotifications(JSON.parse(value));
      }
    });
  }, []);

  const handleViewNotification = async (item) => {
    setViewedNotifications([...viewedNotifications, item.docNo]);
    await AsyncStorage.setItem(
      'viewedNotifications',
      JSON.stringify([...viewedNotifications, item.docNo])
    );

    if (item.docNo) {
      if (item.notificationMethod === 'Promise' && item.notificationMethodAction === 'MakePromise') {
        navigation.navigate('Dashboard', { docNo: item.docNo });
      } else if (item.notificationMethod === 'RequestPromise' && item.notificationMethodAction === 'MakePromiseRequest') {
        navigation.navigate('Promise Request Dashboard', { docNo: item.docNo });
      }
    }
  };

  const filteredNotifications = notilist.filter(
    (item) => !viewedNotifications.includes(item.docNo)
  );

  const onRefresh = () => {
    setrefresh(!refersh);
  };

  const bgBtnmakeprms = ['#E4A936', '#EE8347'];
  const bgBtnrqstprms = ['#73B6BF', '#2E888C'];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleViewNotification(item)}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp(1),
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
        <View
          style={{
            width: wp(90),
            height: hp(7),
            borderRadius: wp(9),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{ uri: 'https://freesvg.org/img/abstract-user-flat-4.png' }}
            style={{
              width: wp(13),
              height: hp(6),
              borderRadius: wp(12) / 2,
              borderColor: '#F99C68',
              position: 'absolute',
              left: wp(1.2),
            }}
          />
          <Text style={{ marginLeft: wp(11), color: 'black', width: wp(70) }}>
            {item.description}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const fetchNoti = async () => {
    await fetchNotification(userN)
      .then(data => {
        setNotificationList(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching promises:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchNoti();
  }, [focus, refersh]);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#E4EEE6',
        marginTop: hp(0.2),
      }}>
      <View style={{ height: hp(7), flexDirection: 'row', alignItems: 'center' }}>
        {navigation.canGoBack() && (
          <TouchableOpacity onPress={handleBack} style={{ marginLeft: wp(6) }}>
            <EvilIcon name="arrow-alt-circle-left" size={30} color="#652D90" />
          </TouchableOpacity>
        )}
        <View style={{ marginLeft: wp(6) }}>
          <Text style={{ fontSize: hp(2.3), fontWeight: 'bold', color: '#652D90' }}>
            Notifications
          </Text>
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#E4EEE6',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={onRefresh}
                colors={['#E4A936', '#EE8347']}
                tintColor="white"
                title="Refreshing..."
                titleColor="white"
              />
            }
            data={filteredNotifications}
            renderItem={renderItem}
            keyExtractor={(item) => item.serialNo.toString()}
          />
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
    height: hp(20),
    backgroundColor: '#DDDFE2',
    borderRadius: wp(5),
  },
  Card: {
    width: wp(100),
    height: hp(15),
    marginTop: hp(0.7),
    borderRadius: wp(5),
  },
});

import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { PlayerData } from '../Data/Data';
import TopUsers from '../Network/Users/TopUsers';
import { UserNo } from '../recoil/AddPromise';
import { useRecoilState } from 'recoil';
import { ToastAndroid } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';

const LeaderBoard = () => {
  dataa = PlayerData;
  const [topUserList, setTopUserList] = useState([]);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [refresh, setRefresh] = useState(false);
  const focus = useIsFocused();

  const fetchTopUs = async () => {
    await TopUsers(userN)
      .then(data => {
        if (data && data.length > 0) {
          const uniqueUsers = Array.from(new Set(data.map(user => user.firstName.toLowerCase()))).map(name => {
            return data.find(user => user.firstName.toLowerCase() === name);
          });
          setTopUserList(uniqueUsers.slice(0, 4));
        }
      })
      .catch(error => {
        console.error('Error fetching top users:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchTopUs();
  }, [focus, refresh]);

  const renderItem = ({ item }) => (
    <LinearGradient
      colors={['#73B6BF', '#2E888C']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        width: '95%',
        height: hp(4.5),
        borderRadius: wp(4),
        marginTop: hp(0.5),
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
      }}>
      <View style={{ marginLeft: wp(1) }}>
        <Text style={{ color: 'white' }}>{item.id}</Text>
      </View>
      <View>
        <Image
          source={{ uri: 'https://freesvg.org/img/abstract-user-flat-4.png' }}
          style={{
            width: wp(6),
            height: hp(3),
            borderRadius: wp(5),
            marginLeft: wp(2),
          }}
        />
      </View>
      <View style={{ marginLeft: wp(2) }}>
        <Text style={{ color: 'black' }}>
          {item.firstName} {item.lastName}
        </Text>
      </View>
      <View style={{ position: 'absolute', right: wp(1.5) }}>
        <LinearGradient
          colors={['#E4A936', '#EE8347']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ backgroundColor: '#EE8347', borderRadius: 50, paddingVertical: 3, paddingHorizontal: 5 }}
        >
          <Text style={{ color: 'black', fontSize: hp(1.5) }}>{item.promisability}%</Text>
        </LinearGradient>
      </View>
    </LinearGradient>
  );

  return (
    <View style={{ height: hp(20), }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center", marginVertical: 3 }}>
        <Text style={styles.barText}>Rating Board</Text>
        <TouchableOpacity onPress={() => setRefresh(!refresh)}>
          <View style={{ marginRight: 15 }}>
            <FontAw5
              name="sync"
              size={15}
              color="#6650A4"
            />
          </View>
        </TouchableOpacity>
      </View>
      {topUserList.length === 0 ? (
        <View style={{ width: "100%", height: "70%", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: hp(1.8), textAlign: "center", color: 'grey' }}>No Top Users</Text>
        </View>
      ) : (
        <FlatList
          data={topUserList}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.userNo.toString()}
        />
      )}
    </View>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({

  bar: {
    height: hp(4),
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  barText: {
    fontSize: hp(1.5),
    marginRight: wp(1.4),
    color: '#652D90',
    fontWeight: 'bold',
    marginLeft: wp(1.5),
    marginVertical: 5,
    paddingLeft: wp(2),
    paddingVertical: hp(.2)
  },

});
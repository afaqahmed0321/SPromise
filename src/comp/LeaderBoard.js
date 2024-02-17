import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { PlayerData } from '../Data/Data';
import { useFocusEffect } from '@react-navigation/native';
import TopUsers from '../Network/Users/TopUsers';
import { UserNo } from '../recoil/AddPromise';
import { useRecoilState } from 'recoil';
import { ToastAndroid } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { defaultImageURL } from '../source/UserProfile';
import LinearGradient from 'react-native-linear-gradient';
import Pie from 'react-native-pie';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';


const LeaderBoard = () => {
  dataa = PlayerData;
  const [topUserList, setTopUserList] = useState([]);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [refresh, setRefresh] = useState(false);

  const focus = useIsFocused();

  const fetchTopUs = async () => {
    // setPromises();
    await TopUsers(userN)
      .then(data => {
        // setNotificationList(data);
        // setIsLoading(false);
        setTopUserList(data);
        console.log(data)
        // console.log(data.description,"data.description");
        if (data.description === 'No data found.') {
          ToastAndroid.showWithGravityAndOffset(
            'There is no top user',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      })
      .catch(error => {
        console.error('Error fetching promises:', error);
        setIsLoading(false);
      });
  };

  // useFocusEffect(

  //   React.useCallback(() => {

  //     fetchTopUs();
  //   }, [])
  // );
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
        // backgroundColor: '#3c6bf5',
        opacity: 0.7,
        borderRadius: wp(4),
        marginTop: hp(0.5),
        flexDirection: 'row',
        alignSelf: 'center',
        // justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >

      <View style={{ marginLeft: wp(1) }}>
        <Text style={{ color: 'white' }}>{item.id}</Text>
      </View>
      <View>
        <Image
          // source={{uri:item.imageURL}}
          source={
            item.imageURL === ''
              ? {
                uri: 'https://th.bing.com/th/id/OIP.aWYpRbe6Tbsr_1W42rUwVAAAAA?rs=1&pid=ImgDetMain',
              }
              : { uri: item.imageURL }
          }
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
        {/* <Pie
          radius={10}
          innerRadius={7}
          backgroundColor='#fff'
          sections={[
            
            {
              percentage: item.promisability,
              color: '#ee8347',
            },
          ]}
          dividerSize={2}
          strokeCap={'butt'}
        /> */}
        <LinearGradient
          colors={['#E4A936', '#EE8347']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          // style={TextInP.lognBtn}
          style={{ backgroundColor: '#EE8347', borderRadius: 50, paddingVertical: 3, paddingHorizontal: 5 }}
        >
          <Text style={{ color: 'black', fontSize: 11 }}>{item.promisability}%</Text>
        </LinearGradient>
      </View>
    </LinearGradient>
  );

  return (
    <View style={{ height: hp(20), }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center", marginVertical: 3 }}>
        <Text style={styles.barText}>Leader Board</Text>
        <TouchableOpacity onPress={() => setRefresh(!refresh)}>
            <View style={{ marginRight:15}}>
              <FontAw5
                name="sync"
                size={15}
                color="#6650A4"
                
              />
            </View>
          </TouchableOpacity>
          </View>

        <FlatList
          data={topUserList}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.userNo.toString()}
        // style={styles.Container}
        // style={{height: hp(10) }}
        />
      </View>
      );
};

      export default LeaderBoard;

      const styles = StyleSheet.create({
        // mainContainer: {
        //   width: wp(90),
        //   borderWidth: wp(0.3),
        //   height: hp(40),
        //   flexDirection: 'row',
        //   borderTopWidth: wp(0.6),
        // },
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
// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Feather from 'react-native-vector-icons/Feather';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import fetchUserData from '../../Network/Users/GetUsers';

// import {
//     selectedPromisee, isSelectModalVisible, UserNo
//    } from '../../recoil/AddPromise';
//    import {useRecoilState} from 'recoil';

// const SelectPromise = () => {
//   const [rating, setRating] = useState(0);
//   const [userData, setUserData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isFavorited, setIsFavorited] = useState(false);
//   const [promisee, setPromisee] = useRecoilState(selectedPromisee)
//   const [modalVisible, setModalVisible] = useRecoilState(isSelectModalVisible);
//   const [userN,setUserN]= useRecoilState(UserNo)
//   const [iviteUsermodalVisible, setIviteUsermodalVisible] = useState(false);

// const handelInviteUser = async () => {
//   if (email == '') {
//     ToastAndroid.show('Please enter email address', ToastAndroid.LONG);
//   } else {
//   const res = await InviteUser(email)
//     .then(data => {
//       ToastAndroid.showWithGravityAndOffset(
//         'An invite has been sent to ' + email,
//         ToastAndroid.LONG,
//         ToastAndroid.BOTTOM,
//         25,
//         50,
//       );
//     })
// };
// }
//   const toggleFavorite = () => {
//     setIsFavorited(!isFavorited);
//   };

//   const handleRating = ratedValue => {
//     setRating(ratedValue);
//   };

//   const renderStars = maxRating => {
//     const stars = [];
//     for (let i = 1; i <= maxRating; i++) {
//       stars.push(
//         <TouchableOpacity key={i} onPress={() => handleRating(i) }>
//           <MaterialIcons
//             name={i <= rating ? 'star' : 'star-border'}
//             size={15}
//             color={i <= rating ? '#652D90' : '#A9A9A9'}
//           />
//         </TouchableOpacity>
//       );
//     }
//     return stars;
//   };

//   useEffect(() => {
//     fetchUserData(userN)
//       .then(data => {
//         setUserData(data);
//         setIsLoading(false);
//       });

//   }, []);

//   return (
//     <View style={{ backgroundColor: '#E4EEE6', flex: 1 }}>
//        <View
//         style={{
//           height: hp(4),

//           flexDirection: 'row',
//           alignItems: 'center',
//           marginLeft: wp(3),
//         }}>
//         <Feather name="filter" size={23} color="black" />
//         <TouchableOpacity
//           style={{
//             height: hp(4),
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginLeft: wp(3),
//           }}>
//           <Text style={{color: 'black', fontWeight: 'bold', fontSize: hp(1.4)}}>
//             Show All
//           </Text>
//           <Feather name="chevron-down" size={23} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity
//         // onPress={}
//           style={{
//             height: hp(4),
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginLeft: wp(40),
//           }}>
//           <Ionicons name="person-add-outline" size={23} color="black" />
//           <Text style={{color: 'black', fontWeight: 'bold', fontSize: hp(1.4)}}>
//             {' '}
//             Invite User
//           </Text>
//         </TouchableOpacity>
//       </View>
//       {isLoading ? (
//         <Text>Loading data...</Text>
//       ) : (
//       <FlatList
//         data={userData}
//         keyExtractor={item => item.userNo.toString()}
//         renderItem={({ item }) => (
//           <View style={{ flexDirection: 'row', marginVertical: hp(1), alignItems: 'center', marginLeft: wp(3) }}>
//             <View>
//               <View style={styles.CiBox}></View>
//             </View>
//             <TouchableOpacity onPress={()=> {setPromisee(item), setModalVisible(false)}} style={{ width: wp(24), marginLeft: wp(3) }}>
//               {item.name !== '' ? (
//                 <Text>
//                   {item.firstName} {item.lastName}
//                 </Text>
//               ) : null}
//             </TouchableOpacity>
//             <View style={styles.container}>{renderStars(5)}</View>
//             <View style={{ marginLeft: wp(20) }}>
//               <TouchableOpacity onPress={toggleFavorite}>
//                 <View style={{ padding: 0.2, borderRadius: 50 }}>
//                   {isFavorited ? (
//                     <Ionicons name="heart" size={15} color="#652D90" />
//                   ) : (
//                     <Feather name="heart" size={15} color="#652D90" />
//                   )}
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       />)}
//      {/* <Modal
//           animationType="slide"
//           transparent={true}
//           visible={iviteUsermodalVisible}
//           onRequestClose={iviteUsermodalVisible}>
//           <SelectPromise />
//         </Modal> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: wp(26),
//   },
//   CiBox: {
//     backgroundColor: 'grey',
//     width: wp(12),
//     height: hp(6),
//     borderRadius: wp(12) / 2,
//     marginTop: wp(0.5),
//   },
// });

// export default SelectPromise;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import fetchUserData from '../Network/Users/GetUsers';
import {TextInP} from '../Styling/TextInput';
// import { UserNo } from '../recoil/AddPromise';
import {useRecoilState} from 'recoil';
// import { ismodalVisible } from '../recoil/Globel';
// import AddToMyNetwork from '../comp/MyNetwork/AddToMyNetwork';
import {useFocusEffect} from '@react-navigation/native';
import {
  isSelectModalVisible,
  selectedPromisee,
  UserNo,
} from '../../recoil/AddPromise';
import {ismodalVisible, refreshPromiseNetwork} from '../../recoil/Globel';
import AddToMyNetwork from '../MyNetwork/AddToMyNetwork';
import fetchUser from '../../Network/Users/GetUser';
import fetchUserData from '../../Network/Users/GetUsers';
import {useIsFocused} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Font from 'react-native-vector-icons/Fontisto';
import { RefreshControl } from 'react-native';

// {ismodalVisible}
// // {AddToMyNetwork}
// {UserNo}
const SelectPromise = () => {
  const [rating, setRating] = useState(0);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [modalVisible, setMmodalVisible] = useRecoilState(ismodalVisible);
  const [promisee, setPromisee] = useRecoilState(selectedPromisee);
  const [modalV, setModalV] = useRecoilState(isSelectModalVisible);
  const focus = useIsFocused();
  const [refreshnetwork, setrefreshnetwork] = useRecoilState(
    refreshPromiseNetwork,
  );
  const [refersh, setrefresh] = useState(false);
  const onRefresh = () => {
    setrefresh(!refersh);
  };
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleRating = ratedValue => {
    setRating(ratedValue);
  };

  const uniqueUserData = userData.filter(
    (user, index, self) =>
      index === self.findIndex(u => u.emailID === user.emailID),
  );

  const renderStars = maxRating => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleRating(i)}>
          <MaterialIcons
            name={i <= rating ? 'star' : 'star-border'}
            size={15}
            color={i <= rating ? '#652D90' : '#A9A9A9'}
          />
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  const fetchData = () => {
    fetchUserData(userN).then(data => {
      console.log(data);
      setUserData(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [focus, refreshnetwork, refersh]);
  // useEffect(() => {
  //   fetchUserData(userN)
  //     .then(data => {
  //       console.log(data)
  //       setUserData(data);
  //       setIsLoading(false);
  //     });

  // }, []);

  return (
    <View style={styles.main}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: hp(2),
          flexDirection: 'row',
        }}>
        <Text style={{fontSize: hp(2), fontWeight: 'bold',color: '#652D90'}}>My Promise Network</Text>
        {/* <TouchableOpacity
          onPress={() => setModalV(false)}
          style={{position: 'absolute', right: 10}}>
          <Entypo size={18} color="black" name="cross" />
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => setIsDrawerV(false)}
          style={{marginLeft: wp(20)}}>
          <Font color="red" name="close" size={30} />
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          height: hp(4),

          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: wp(3),
        }}>
        {/* // Show All filter */}
        {/* <Feather name="filter" size={23} color="black" />
        <TouchableOpacity
          style={{
            height: hp(4),
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(3),
          }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: hp(1.4)}}>
            Show All
          </Text>
          <Feather name="chevron-down" size={23} color="black" />
        </TouchableOpacity> */}

        <View style={{width: wp(79)}}>
          <TextInput
            style={styles.SearchInpF}
            placeholder="Search User" placeholderTextColor="#652D90"></TextInput>
          <TouchableOpacity
            style={{position: 'absolute', right: hp(1.8), top: hp(0.8)}}>
            <Feather name="search" size={20} color="#8250A6" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => setMmodalVisible(true)}
          style={{
            height: hp(4),
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(6),
          }}>
          <Ionicons name="person-add-outline" size={23} color="#652D90" />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={modalVisible}>
            <AddToMyNetwork />
          </Modal>

          {/* <Text style={{color: 'black', fontWeight: 'bold', fontSize: hp(1.4)}}>
            {' '}
            Invite User
          </Text> */}
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          // data={userData}
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
          data={uniqueUserData}
          keyExtractor={item => item.emailID.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setPromisee(item), setModalV(false);
              }}
              style={{
                flexDirection: 'row',
                marginVertical: hp(1),
                alignItems: 'center',
                marginLeft: wp(3),
              }}>
              <View>
                <Image
                  // source={{uri:item.imageURL}}
                  source={
                    item.imageURL === ''
                      ? {
                          uri: 'https://th.bing.com/th/id/OIP.aWYpRbe6Tbsr_1W42rUwVAAAAA?rs=1&pid=ImgDetMain',
                        }
                      : {uri: item.imageURL}
                  }
                  style={{
                    width: wp(12),
                    height: hp(6),
                    borderRadius: wp(12) / 2,
                    marginLeft: wp(4),
                  }}
                />
              </View>
              <View style={{width: wp(48), marginLeft: wp(3)}}>
                {item.name !== '' ? (
                  <Text style={{color: 'grey', fontWeight: 'bold'}}>
                    {item.firstName} {item.lastName}
                  </Text>
                ) : null}
              </View>
              {/* <View style={styles.container}>{renderStars(5)}</View> */}
              <View style={{marginLeft: wp(20)}}>
                <TouchableOpacity onPress={toggleFavorite}>
                  <View style={{padding: 0.2, borderRadius: 50}}>
                    {isFavorited ? (
                      <Ionicons name="heart" size={15} color="#652D90" />
                    ) : (
                      <Feather name="heart" size={15} color="#652D90" />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {backgroundColor: '#E4EEE6', flex: 1},
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(26),
  },
  CiBox: {
    backgroundColor: 'grey',
    width: wp(13),
    height: hp(6),
    borderRadius: wp(12) / 2,
    marginTop: wp(0.5),
  },
  SearchInpF: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp(5),
    fontSize: hp(1.4),
    color: '#652D90',
    fontWeight: 'bold',
    paddingLeft: wp(4),
  },
});

export default SelectPromise;

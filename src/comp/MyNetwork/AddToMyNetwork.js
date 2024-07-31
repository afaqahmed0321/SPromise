import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Font from 'react-native-vector-icons/Fontisto';
import fetchUser from '../../Network/Users/GetUser';
import InviteUser from '../../Network/Users/InviteUser';
import AddUserNetwork from '../../Network/Users/AddToNetwork';
import { emailID, UserNo } from '../../recoil/AddPromise';
import { useRecoilState } from 'recoil';
import { ismodalVisible, refreshPromiseNetwork } from '../../recoil/Globel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { uemail } from '../../recoil/Users/GetUsers';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';
const AddToMyNetwork = () => {
  const [userFound, setUserFound] = useState(null);
  const [searching, setSearching] = useState(false);
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [modalVisible, setModalVisible] = useRecoilState(ismodalVisible);
  const [refreshnetwork, setRefreshNetwork] = useRecoilState(refreshPromiseNetwork);
  const [emailId, setEmailId] = useRecoilState(uemail);


  const SearchUser = async () => {
    if (email === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter an email address',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 70,
        bottomOffset: 40,
      });
      return;
    }
    if (emailId === email) {
      Toast.show({
        type: 'error',
        text1: 'You cannot add yourself',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 70,
        bottomOffset: 40,
      });
      return;
    }
  
    setIsLoading(true);
    setSearching(true);
    const mail = email.toLowerCase();
  
    try {
      const data = await fetchUser(mail);
      setIsLoading(false);
  
      if (data === 'User Does not Exist') {
        setUserFound(false);
        handelInviteUser();
      } else {
        setUserFound(true);
        setUserData(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Toast.show({
        type: 'error',
        text1: 'Error fetching user data.',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 70,
        bottomOffset: 40,
      });
      setIsLoading(false);
      setSearching(false);
    }
  };
  

  const handelInviteUser = async () => {
    if (email === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter an email address',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 70,
        bottomOffset: 40,
      });
    } else {
      await InviteUser(email);
      Toast.show({
        type: 'success',
        text1: 'User does not exist! Invite has been sent',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 70,
        bottomOffset: 40,
      });
    }
  };
  
 

  const handelAddtoNetwork = async () => {
    console.log("email from recoil", emailID, "typed email", email);
  
    if (!userData.userNo) {
      Toast.show({
        type: 'error',
        text1: 'No user found to add to network.',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 70,
        bottomOffset: 40,
      });
      return;
    }
    if (emailId === email) {
      Toast.show({
        type: 'error',
        text1: 'You cannot add yourself',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 70,
        bottomOffset: 40,
      });
      return;
    }
    const AddUserN = userData.userNo;
  
    try {
     const result= await AddUserNetwork(AddUserN, userN);
     if(result === 100){
      Toast.show({
        type: 'success',
        text1: 'User has been added ',
        text2: 'to the network.',
        text1Style: {
          fontSize: 14,
          color: 'black',
          flexWrap: 'wrap',
          textAlign: 'center',
        },
        text2Style: {
          fontSize: 14,
          color: 'black',
          flexWrap: 'wrap',
          textAlign: 'center',
        },
        swipeable: true,
        text1NumberOfLines: 0,
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 70,
        bottomOffset: 40,
      });
     }
      
      setRefreshNetwork(!refreshnetwork);
    } catch (error) {
      console.error('Error adding user to network:', error);
      Toast.show({
        type: 'error',
        text1: 'Error adding user to network.',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 50,
        bottomOffset: 40,
      });
    }
  };
  
  useEffect(() => {
  }, [ refreshnetwork]);
  return (

    
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeading}>Add to Network</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
           
            <FontAw5 name="times" color="#652D90" size={30} light />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search User"
              onChangeText={(text) => {
                setEmail(text);
                setUserData([]);
              }}
              placeholderTextColor='grey'
              autoFocus={true}
            />

            <TouchableOpacity
              onPress={SearchUser}
              style={styles.searchButton}
            >
              <Feather name="search" size={30} color="#8250A6" />
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : !searching ? null : userFound ? (
            
            <>
            <View style={styles.userDataContainer}>
              <Text style={styles.userDataText}>Email: {userData.emailID}</Text>
              <Text style={styles.userDataText}>Name: {userData.firstName} {userData.lastName}</Text>
              <Text style={styles.userDataText}>Promisibility: {userData.promisibility}</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handelAddtoNetwork}
            >
              <Text style={{ color: 'white' }}>Add to network</Text>
            </TouchableOpacity>
            </>
          ) : null}

        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
      </View>
  );
};

export default AddToMyNetwork;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#E4EEE6',
    alignItems: 'center',
    borderWidth: 0.5,
    width: wp(90),
    borderRadius: wp(2),
    borderColor: '#652D90',
    paddingVertical: hp(2),
  },
  modalHeading: {
    fontSize: hp(2),
    fontWeight: 'bold',
    marginBottom: hp(2),
    color: '#652D90',
  },
  closeButton: {
    position: 'absolute',
    top: hp(1),
    right: wp(3),
  },
  searchContainer: {
    width: wp(80),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
    marginTop: hp(2)
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp(5),
    color: '#652D90',
    fontWeight: 'bold',
    paddingLeft: wp(4),
    fontSize: hp(1.8),
    flex: 1,
    height:hp(5)
  },
  searchButton: {
    marginLeft: wp(2),
  },
  addButton: {
    width: wp(60),
    backgroundColor: '#2E888C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(50),
    height: hp(5),
    marginTop: hp(2),
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  userDataContainer: {
    alignItems: 'center',
  },
  userDataText: {
    color: 'black',
    marginBottom: hp(1),
  },
});

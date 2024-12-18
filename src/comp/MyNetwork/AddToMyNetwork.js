import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Font from 'react-native-vector-icons/Fontisto';
import fetchUser from '../../Network/Users/GetUser';
import InviteUser from '../../Network/Users/InviteUser';
import AddUserNetwork from '../../Network/Users/AddToNetwork';
import {emailID, UserNo} from '../../recoil/AddPromise';
import {useRecoilState} from 'recoil';
import {ismodalVisible, refreshPromiseNetwork} from '../../recoil/Globel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {uemail} from '../../recoil/Users/GetUsers';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';
import Contacts from 'react-native-contacts'; // Import the library for accessing contacts

const AddToMyNetwork = () => {
  const [userFound, setUserFound] = useState(null);
  const [searching, setSearching] = useState(false);
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [modalVisible, setModalVisible] = useRecoilState(ismodalVisible);
  const [refreshnetwork, setRefreshNetwork] = useRecoilState(
    refreshPromiseNetwork,
  );
  const [emailId, setEmailId] = useRecoilState(uemail);
  const [number, setNumber] = useState();
  const [contacts, setContacts] = useState([]); // State to hold contacts

  // Function to search user by email
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
      console.log('user data', data);
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
    console.log('email from recoil', emailID, 'typed email', email);

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
      const result = await AddUserNetwork(AddUserN, userN);
      if (result === 100) {
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

  // Function to fetch contacts
  const fetchContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        {
          console.log('contactssssssssssssssss', contacts);
        }
        setContacts(contacts); // Set contacts to state
      })
      .catch(e => {
        console.log('Error fetching contacts: ', e);
      });
  };

  const handleShowContacts = () => {
    fetchContacts(); // Fetch contacts when button is pressed
  };

  useEffect(() => {}, [refreshnetwork]);

  const handleContactClick = contact => {
    // Perform your desired action with the contact data
    console.log('Contact clicked:', contact);
    setEmail(contact.phoneNumbers[0].number);
    if(email != null && email != ''){
      SearchUser();
    }

  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalHeading}>Add to Network</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}>
          <FontAw5 name="times" color="#652D90" size={30} light />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search User"
            onChangeText={text => {
              setEmail(text);
              setUserData([]);
            }}
            placeholderTextColor="grey"
            autoFocus={true}
            value={email}
          />

          <TouchableOpacity onPress={SearchUser} style={styles.searchButton}>
            <Feather name="search" size={30} color="#8250A6" />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : !searching ? null : userFound ? (
          <>
            <View style={styles.userDataContainer}>
              <Text style={styles.userDataText}>Email: {userData.emailID}</Text>
              <Text style={styles.userDataText}>
                Name: {userData.firstName} {userData.lastName}
              </Text>
              <Text style={styles.userDataText}>
                Promisibility:{' '}
                {userData.promisibility == 0 ? '0%' : userData.promisibility}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handelAddtoNetwork}>
              <Text style={{color: 'white'}}>Add to network</Text>
            </TouchableOpacity>
          </>
        ) : null}
        {console.log('contactsss', contacts)}

        <TouchableOpacity onPress={handleShowContacts} style={styles.showButton}>
          <Text style={{color: 'white'}}>Show Contacts</Text>
        </TouchableOpacity>

        {/* Display Contacts in Modal */}
        {contacts.length > 0 && (
          <View style={styles.contactsContainer}>
            <ScrollView style={styles.contactsContainer}>
              {contacts.map((contact, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleContactClick(contact)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}>
                  <Text style={{color: 'black', fontSize: 16}}>
                    {contact.givenName}
                  </Text>
                  <Text style={{color: 'black', fontSize: 16}}>
                    {contact.phoneNumbers[0]?.number || 'N/A'}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: wp('80%'),
    maxHeight: hp('80%'), // Limit height to make scrolling work
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderColor: '#8250A6',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    height: 40,
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  userDataContainer: {
    marginBottom: 20,
  },
  userDataText: {
    fontSize: 16,
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: '#8250A6',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showButton: {
    marginTop: 20,
    backgroundColor: '#8250A6',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactsContainer: {
    marginTop: 20,
  },
  contactText: {
    fontSize: 16,
    color: 'black',
  },
});
export default AddToMyNetwork;

import ToggleSwitch from 'toggle-switch-react-native';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ToastAndroid } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import GetUserData from '../Network/Users/GetUserData';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserNo } from '../recoil/AddPromise';
import { useRecoilState } from 'recoil';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Font from 'react-native-vector-icons/Fontisto';
// import Font from 'react-native-vector-icons/Fontisto';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { commonStyles } from '../Styling/buttons';
import { useIsFocused } from '@react-navigation/native';
import { TextInP } from '../Styling/TextInput';
import { Headings } from '../Styling/Headings';
import { UpdateProfileApi } from '../Network/Users/modifyUser';
import UpdatePasswordModal from '../comp/UpdatePasswordModal';
import {
  CurrentPassword,
  DobDate,
  RemoveSoicalLinkApprovalState,
  RemoveTwitterApicall,
  isChangePasswordModalV,
  isDOBModalV,
} from '../recoil/Users/GetUsers';
import EvilIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import DOBModal from '../comp/SelectDOBCalender';
import TwitterWebView from '../comp/Profile/WebView/TwitterWebView';
import TwitterApiCall from '../Network/Users/TwitterApiCallToCheckData';
import TwitterApiCallLogin from '../Network/Users/TwitterApiCallToLogin';
import TwitterApiCallToCheckData from '../Network/Users/TwitterApiCallToCheckData';
import LinkDinApiCallToCheckData from '../Network/Users/LinkdinApiCallToCheckData';
import LinkDinApiCallLogin from '../Network/Users/LinkdinApiCallToLogin';
import RemoveSoicalLinkApproval from '../comp/Profile/RemoveSoicalLinkApproval';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import { BlurView } from '@react-native-community/blur';

const UserProfile = () => {
  const [istwitterRemoveAccount, setIstwitterRemoveAccount] =
    useRecoilState(RemoveTwitterApicall);
  const [removeSLAModal, setRemoveSLAModal] = useRecoilState(
    RemoveSoicalLinkApprovalState,
  );

  const [startDateMV, setStartDateMV] = useRecoilState(isDOBModalV);
  const [selectStartDate, setselectStartDate] = useState(true);
  // const [endDateMV, setEndDateMV] = useRecoilState(isEndDateModalV)
  // const [deadlinedate, setDeadLinedate] = useRecoilState(deadline);
  const [startDa, setStartDate] = useRecoilState(DobDate);

  const [isDrawerV, setIsDrawerV] = useRecoilState(isChangePasswordModalV);

  const [userData, setUserData] = useState(null);
  const [socialLogin, setSocialLogin] = useState(false);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [editProfile, setEditProfile] = useState(false);
  // const [changePassword, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useRecoilState(CurrentPassword);
  const focus = useIsFocused();

  const [emailId, setEmailId] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [phonNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [xtoggle, setXTogel] = useState(false);
  const [linkedInToggle, setLinkedInToggle] = useState(false);

  const [isWebView, setIsWebView] = useState(false);
  const [twitterResponse, setTwitterResponse] = useState('');
  const [linkDinResponse, setLinkDinResponse] = useState('');
  const [isTwitterApiCall, setIsTwitterApiCall] = useState(false);

  console.log(isWebView, 'isWebView');

  const fetchUserData = async () => {
    try {
      const response = await GetUserData(userN);
      const data = await response;
      console.log(data, 'askdmkanskfnaskmc');
      setUserData(data);
      setEmailId(data.emailID);
      setFName(data.firstName);
      setLName(data.lastName);
      setPhoneNo(data.phoneNo);
      setAddress(data.address1);
      setCity(data.city);
      setState(data.state);
      setPinCode(data.zip);
      setCountry(data.country);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const UpdateProfile = async () => {
    console.log(userData.phonNo, "inside updated profile");
    const useN = userN;
    const email = emailId === '' ? userData.email : emailId;
    const password = userData.password;
    const fNam = fName === '' ? userData.firstName : fName;
    const lNam = lName === '' ? userData.lastName : lName;
    const gende = gender;
    const phoneN = phonNo;
    // const phoneN = phonNo === ''|| "string"? userData.phoneNo : phonNo
    const addres = address === '' ? userData.address1 : address;
    const cit = city;
    const stat = state;
    const pinCod = pinCode;
    const countr = country;
    const dom = startDa === '' ? userData.dob : startDa;
    const socialLogi = socialLogin;

    console.log(
      'Test',
      useN,
      email,
      password,
      fNam,
      lNam,
      gende,
      dom,
      countr,
      pinCod,
      stat,
      cit,
      addres,
      phoneN,
      socialLogi,
    );
    const modifyApiRequest = await UpdateProfileApi(
      useN,
      email,
      password,
      fNam,
      lNam,
      gende,
      dom,
      countr,
      pinCod,
      stat,
      cit,
      addres,
      phoneN,
      socialLogi,
    );

    if (modifyApiRequest.code == 200) {
      setEditProfile(false);
      ToastAndroid.showWithGravityAndOffset(
        'Data Successfully Updated',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  };

  const LinkDinallHandel = async () => {
    setLinkDinResponse('');
    const LinkDinApiRes = await LinkDinApiCallLogin(userN);
    console.log('LinkDinApiRes: ' + LinkDinApiRes);
    setLinkDinResponse(LinkDinApiRes);
    if (LinkDinApiRes !== '') {
      setIsWebView(true);
    } else {
      console.log('Error');
    }
  };
  const TwitterCallHandel = async () => {
    console.log(
      'User is already logged in, Automatically calling call handlers',
    );
    const twriterApiRes = await TwitterApiCallLogin(userN);
    console.log(twriterApiRes, 'api call success');
    setTwitterResponse(twriterApiRes);
    if (twriterApiRes !== '') {
      setIsWebView(true);
    } else {
      console.log('Error');
    }
   
  };

  const apiCallChceckRes = async () => {
    const response = await TwitterApiCallToCheckData(userN);
    if (response == '400') {
      setXTogel(false);
      console.log('xtoggle is true');
    } else {
      setXTogel(true);
      console.log('xtoggle is False');
    }
  };
  const apiCallLinkChceckRes = async () => {
    const response = await LinkDinApiCallToCheckData(userN);
    if (response == '400') {
      // setXTogel(false)
      setLinkedInToggle(false);

      console.log('xtoggle is true');
    } else {
      // setXTogel(true)
      setLinkedInToggle(true);
      console.log('xtoggle is False');
    }
  };

  useEffect(() => {
    fetchUserData();
    apiCallChceckRes();
    apiCallLinkChceckRes();
  }, [focus]);

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      {!editProfile && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginLeft: wp(5),
            // borderWidth: 1,
            height: hp(5),
            marginTop: hp(1),
          }}>
          {/* <EvilIcon name="arrow-left-circle" size={30} color="black" /> */}
          <FontAw5 name="arrow-alt-circle-left" size={30} color="#6650A4" />
        </TouchableOpacity>
      )}
      {editProfile ? (
        <>
          <View>
            {isWebView == false ? (
              <View
                style={[
                  styles.container,
                  {
                    borderWidth: 0.5,
                    width: wp(90),
                    alignSelf: 'center',
                    borderRadius: wp(2),
                    borderColor: '#652D90',
                    // marginHorizontal:wp(3),
                    // height: hp(58),
                    // marginTop: hp(20),
                    backgroundColor: 'white',
                  },
                ]}>
                <View>
                  <Text style={Headings.Input3}>Email</Text>
                  <TextInput
                    style={[TextInP.Fileds, { width: wp(82), }]}
                    // placeholder={userData.emailID}
                    value={userData.emailID}
                    placeholderTextColor="#000"
                    onChangeText={text => setEmailId(text)}
                  />
                </View>

                <View style={[styles.Box,{paddingHorizontal:0}]}>
                  <View styles={styles.InnerBox}>
                    <Text style={Headings.Input3}>First Name</Text>
                    <TextInput
                      style={[TextInP.Fileds, { width: wp(38) }]}
                      placeholder="First Name"
                      value={fName}
                      placeholderTextColor="grey"
                      onChangeText={text => setFName(text)}
                    />
                  </View>
                  <View styles={styles.InnerBox}>
                    <Text style={Headings.Input3}>Last Name</Text>
                    <TextInput
                      style={[TextInP.Fileds, { width: wp(38) }]}
                      placeholder="Last Name"
                      placeholderTextColor="grey"
                      value={lName}
                      onChangeText={text => setLName(text)}
                    />
                  </View>
                </View>

                <View style={styles.Box}>
                  <View styles={styles.InnerBox}>
                    <Text style={Headings.Input3}>Gender</Text>
                    <TextInput
                      style={[TextInP.Fileds, { width: wp(38), }]}
                      placeholder={
                        userData.gender == '' ? 'N/A' : userData.gender
                      }
                      placeholderTextColor="grey"
                      // value={lName}
                      onChangeText={text => setGender(text)}
                    />
                  </View>
                  <View styles={styles.InnerBox}>
                    <Text style={[Headings.Input3]}>Select Date Of Birth</Text>
                  
                    <TouchableOpacity
                      // onPress={() => (selectStartDate ? setselectStartDate(false) : setselectStartDate(true))}
                      onPress={() => setStartDateMV(true)}
                      style={[
                        TextInP.Fileds,
                        {
                          width: wp(38),
                          height: hp(5.5),
                          justifyContent: 'center',
                          // alignItems: 'center',
                          paddingLeft: 0,
                          color:"#000"
                        },
                      ]}>
                      {userData.dob == '' ? (
                        <Text>N/A</Text>
                      ) : (
                        <Text style={{color:"#000"}}>{startDa}</Text>
                      )}
                      {/* {startDateMV ? () : ()} */}
                    </TouchableOpacity>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      style={{ height: hp(50), backgroundColor: 'red' }}
                      visible={startDateMV}
                      onRequestClose={() => setStartDateMV(false)}>
                      <DOBModal />
                    </Modal>
                    {/* </View> */}
                  </View>
                </View>

                <View styles={styles.InnerBox}>
                  <Text style={Headings.Input3}>Phone</Text>
                  <TextInput
                    style={[TextInP.Fileds, { width: wp(82) }]}
                    placeholder={userData.phoneNo == '' ? 'N/A' : userData.phone}
                    placeholderTextColor="grey"
                    value={userData.phone}
                    onChangeText={text => setPhoneNo(text)}
                  />
                </View>

                <View>
                  <Text style={Headings.Input3}>Address</Text>
                  <TextInput
                    style={[TextInP.Fileds, { width: wp(82) }]}
                    placeholder={
                      userData.address1 == '' ? 'N/A' : userData.address1
                    }
                    placeholderTextColor="grey"
                    // value={lName}
                    onChangeText={text => setAddress(text)}
                  />
                </View>

                <View style={styles.Box}>
                  <View styles={styles.InnerBox}>
                    <Text style={Headings.Input3}>City</Text>
                    <TextInput
                      style={[TextInP.Fileds, { width: wp(38) }]}
                      placeholder={userData.city == '' ? 'N/A' : userData.city}
                      placeholderTextColor="grey"
                      // value={lName}
                      onChangeText={text => setCity(text)}
                    />
                  </View>

                  <View styles={styles.InnerBox}>
                    <Text style={Headings.Input3}>Zip Code</Text>
                    <TextInput
                      style={[TextInP.Fileds, { width: wp(38) }]}
                      placeholder={userData.zip == '' ? 'N/A' : userData.zip}
                      placeholderTextColor="grey"
                      // value={lName}
                      onChangeText={text => setPinCode(text)}
                    />
                  </View>
                </View>

                <View style={styles.Box}>
                  <View styles={styles.InnerBox}>
                    <Text style={Headings.Input3}>State</Text>
                    <TextInput
                      style={[TextInP.Fileds, { width: wp(38) }]}
                      placeholder={userData.state == '' ? 'N/A' : userData.state}
                      placeholderTextColor="grey"
                      // value={lName}
                      onChangeText={text => setState(text)}
                    />
                  </View>
                  <View styles={styles.InnerBox}>
                    <Text style={Headings.Input3}>Country</Text>
                    <TextInput
                      style={[TextInP.Fileds, { width: wp(38) }]}
                      placeholder={
                        userData.country == '' ? 'N/A' : userData.country
                      }
                      placeholderTextColor="grey"
                      // value={lName}
                      onChangeText={text => setCountry(text)}
                    />
                  </View>
                </View>

                <View style={styles.Social}>
                  <Text style={[{ marginLeft: wp(5) }, Headings.Input5]}>
                    Twitter
                  </Text>
                  <ToggleSwitch
                    isOn={xtoggle}
                    style={{ marginRight: wp(5) }}
                    onColor="green"
                    offColor="#FFFFFF"
                    thumbOffStyle={{ backgroundColor: '#E4E4E4' }}
                    thumbOnStyle={{ backgroundColor: '#652D90' }}
                    size="small"
                    onToggle={() => {
                     
                      xtoggle
                        ? (setRemoveSLAModal(true),
                          setIstwitterRemoveAccount(true),
                          setXTogel(false))
                        : // setRemoveSLAModal(true)
                        (setIsTwitterApiCall(true), TwitterCallHandel());
                     
                    }}
                  />
                </View>
                
                <View style={styles.Social}>
                  <Text style={[{ marginLeft: wp(5) }, Headings.Input5]}>
                    LinkedIn
                  </Text>
                  <ToggleSwitch
                    isOn={linkedInToggle}
                    style={{ marginRight: wp(5) }}
                    onColor="green"
                    offColor="#FFFFFF"
                    thumbOffStyle={{ backgroundColor: '#E4E4E4' }}
                    thumbOnStyle={{ backgroundColor: '#652D90' }}
                    size="small"
                    onToggle={() => {
                      setIsTwitterApiCall(false);
                      setLinkedInToggle(!linkedInToggle);
                      LinkDinallHandel();
                      linkedInToggle
                        ? (setRemoveSLAModal(true),
                          setIstwitterRemoveAccount(true))
                        : (setIsTwitterApiCall(false),  LinkDinallHandel());
                    }}
                  />
                </View>
                {/* //RemoveSoicalLinkApproval /> */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  style={{ height: hp(50), backgroundColor: 'red' }}
                  visible={removeSLAModal}
                  onRequestClose={removeSLAModal}>
                  <BlurView
                    style={{ flex: 1 }}
                    blurType="light"
                    blurAmount={10}
                  ></BlurView>
                
                  <RemoveSoicalLinkApproval />
                 
                  <BlurView
                    style={{ flex: 1 }}
                    blurType="light" // You can customize the blurType as needed
                    blurAmount={10} // You can adjust the blurAmount as needed
                  ></BlurView>
                </Modal>

              
              </View>
            ) : (
              <SafeAreaView style={{ height: '100%' }}>
                <TouchableOpacity
                  onPress={() => setIsWebView(false)}
                  style={{
                    marginLeft: wp(2),
                    // borderWidth: 1,
                    height: hp(5),
                    marginTop: hp(1),
                  }}>
                  {/* <EvilIcon name="arrow-left-circle" size={30} color="black" /> */}
                  <FontAw5
                    name="arrow-alt-circle-left"
                    size={30}
                    color="#6650A4"
                  />
                </TouchableOpacity>
                <WebView
                  source={{
                    uri: isTwitterApiCall ? twitterResponse : linkDinResponse,
                  }}
              
                />
              </SafeAreaView>
            )}
          </View>
        </>
      ) : (
        // </View>
        <>
          <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
              <Text style={Headings.InputCustom}>Email:</Text>
              <TextInput
                style={[TextInP.Fileds, { width: wp(65), }]}
                // placeholder={userData.emailID}
                value={userData.emailID}
                placeholderTextColor="#000"
                onChangeText={text => setEmailId(text)}
                editable={false}              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={Headings.InputCustom}>Name:</Text>
              <TextInput
                style={[TextInP.Fileds, { width: wp(65), }]}
                // placeholder={userData.emailID}
                value={`${userData.firstName} ${userData.lastName}`}
                placeholderTextColor="#000"
                onChangeText={text => setEmailId(text)}
                editable={false}              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={Headings.InputCustom}>Phone Number:</Text>
              <TextInput
                style={[TextInP.Fileds, { width: wp(49)}]}
                // placeholder={userData.emailID}
                value={userData.phoneNo == '' ? 'N/A' : userData.phoneNo}
                placeholderTextColor="#000"
                onChangeText={text => setEmailId(text)}
                editable={false}              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={Headings.InputCustom}>Address:</Text>
              <TextInput
                style={[TextInP.Fileds, { width: wp(61), }]}
                // placeholder={userData.emailID}
                value={userData.address1 == '' ? 'N/A' : userData.address1}
                placeholderTextColor="#000"
                onChangeText={text => setEmailId(text)}
                editable={false}              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={Headings.InputCustom}>Gender:</Text>
              <TextInput
                style={[TextInP.Fileds, { width: wp(62), }]}
                // placeholder={userData.emailID}
                value= {userData.gender == '' ? 'N/A' : userData.gender}
                placeholderTextColor="#000"
                onChangeText={text => setEmailId(text)}
                editable={false}              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={Headings.InputCustom}>City:</Text>
              <TextInput
                style={[TextInP.Fileds, { width: wp(68), }]}
                // placeholder={userData.emailID}
                value={userData.city == '' ? 'N/A' : userData.city}
                placeholderTextColor="#000"
                onChangeText={text => setEmailId(text)}
                editable={false}              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={Headings.InputCustom}>Country:</Text>
              <TextInput
                style={[TextInP.Fileds, { width: wp(61), }]}
                // placeholder={userData.emailID}
                value={userData.country == '' ? 'N/A' : userData.country}
                placeholderTextColor="#000"
                onChangeText={text => setEmailId(text)}
                editable={false}              />
            </View>          
          </View>
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isDrawerV}
        onRequestClose={() => setIsDrawerV(false)}>
        <BlurView
          style={{ height: hp(20) }}
          blurType="light" // You can customize the blurType as needed
          blurAmount={10} // You can adjust the blurAmount as needed
        ></BlurView>
        <View style={{ flexDirection: 'row' }}>
          <BlurView
            style={{ flex: 1 }}
            blurType="light" // You can customize the blurType as needed
            blurAmount={10} // You can adjust the blurAmount as needed
          ></BlurView>
          <UpdatePasswordModal />
          <BlurView
            style={{ flex: 1 }}
            blurType="light" // You can customize the blurType as needed
            blurAmount={10} // You can adjust the blurAmount as needed
          ></BlurView>
        </View>
        <BlurView
          style={{ flex: 1 }}
          blurType="light" // You can customize the blurType as needed
          blurAmount={10} // You can adjust the blurAmount as needed
        ></BlurView>
      </Modal>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: wp(100),
          // borderWidth: wp(1),
          height: hp(8),
        }}>
        {editProfile ? (
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', gap: 50, marginTop: 10 }}>
            <TouchableOpacity
              onPress={UpdateProfile}
              style={{ marginLeft: wp(0) }}>
              <Font color="green" name="check" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEditProfile(false);
                setStartDate('');
              }}
              style={{ marginLeft: wp(0) }}>
              <Font color="#652D90" name="close" size={30} />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              width: wp(100),
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={[commonStyles.ActionBtn, { width: wp(35) }]}
              onPress={() => setEditProfile(true)}>
              <Text style={{color:"white"}}> Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                commonStyles.ActionBtn,
                { width: wp(35), backgroundColor: '#1C819E' },
              ]}
              onPress={() => {
                setCurrentPassword(userData.password);
                console.log(currentPassword, 'current password');
                setIsDrawerV(true);
              }}>
              <Text  style={{color:"white"}}> Change Password</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(1),
    // backgroundColor: '#ffffff',
    padding: wp(4),
    // borderRadius: wp(10),
    // shadowColor: '#000',
    borderWidth: 0.5,
    width: wp(90),
    alignSelf: 'center',
    borderRadius: wp(2),
    borderColor: '#652D90',
    marginHorizontal: wp(3),
    height: hp(45),
    // marginTop: hp(20),
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: hp(2) },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "auto"
    // marginBottom: hp(10)
  },
  DateCB: {},
  Box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  InnerBox: { with: wp(40) },
  InputConD: {
    flexDirection: 'row',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: wp(4),
    fontWeight: 'bold',
    marginTop: hp(2),
    textAlign: 'start',
    color: "black"
  },
  data: {
    fontSize: wp(4),
    // fontWeight: 'bold',
    fontWeight: 'normal',
    marginTop: hp(2),
  },
  InputContainer: {
    flexDirection: 'row',
    // justifyContent:'space-between',
    alignItems: 'center',
    width: wp(90),
    height: hp(8),
    marginTop: hp(1),
    marginBottom: hp(1),
    // borderRadius: wp(5),
    // borderColor: '#652D90',
    // borderWidth: wp(1),
  },
  editableText: {
    width: wp(70),
    height: hp(5),
    paddingLeft: wp(4),
    borderWidth: wp(0.1),
  },
  Social: {
    flexDirection: 'row',
    width: wp(84),
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
});

export default UserProfile;

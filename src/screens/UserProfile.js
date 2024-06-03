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
import DropDownPicker from 'react-native-dropdown-picker';
import AccountRemovedApiCall from '../Network/Users/RemoveUserSocialAccounts/TwitterAccountRemoveApiCall';


const UserProfile = () => {
  const [istwitterRemoveAccount, setIstwitterRemoveAccount] =
    useRecoilState(RemoveTwitterApicall);
  const [removeSLAModal, setRemoveSLAModal] = useRecoilState(
    RemoveSoicalLinkApprovalState,
  );

  const [startDa, setStartDate] = useRecoilState(DobDate);

  const [isDrawerV, setIsDrawerV] = useRecoilState(isChangePasswordModalV);

  const [userData, setUserData] = useState(null);
  const [socialLogin, setSocialLogin] = useState(false);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [editProfile, setEditProfile] = useState(false);
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
  const [dob, setDob] = useState('');
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [xtoggle, setXTogel] = useState(false);
  const [linkedInToggle, setLinkedInToggle] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
    if (linkedInToggle) {
      AccountRemovedApiCall(userN, "LinkedIn")
    }
    else {
      setLinkDinResponse('');
      setIsTwitterApiCall(false)
      const LinkDinApiRes = await LinkDinApiCallLogin(userN);
      console.log('LinkDinApiRessssss: ' + LinkDinApiRes);
      setLinkDinResponse(LinkDinApiRes);
      if (LinkDinApiRes !== '') {
        setIsWebView(true);
      } else {
        console.log('Error');
      }
    }
  };
  const TwitterCallHandel = async () => {
    if (xtoggle) {
      AccountRemovedApiCall(userN, "Twitter")
    }
    else {
      const twriterApiRes = await TwitterApiCallLogin(userN);
      console.log(twriterApiRes, 'api call success to twitter');
      setTwitterResponse(twriterApiRes);
      setIsTwitterApiCall(true)
      if (twriterApiRes !== '') {
        setIsWebView(true);
      } else {
        console.log('Error');
      }
    }

  };


  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState('');
  const [items, setItems] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ]);
  const handleDropdownSelect = (item) => {
    setValue(item.value);
    setOpen(false);
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
    console.log("linkedin check response", response);
    if (response == 400) {
      setRefresh(!refresh);
      setLinkedInToggle(false);
      console.log('xtoggle is true');
    } else {
      setLinkedInToggle(true);
      setRefresh(!refresh);
      console.log('xtoggle is False');
    }
  };

  useEffect(() => {
    fetchUserData();
    apiCallChceckRes();
    apiCallLinkChceckRes();
  }, [focus, refresh]);


  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView>
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

                  <View style={[styles.Box, { paddingHorizontal: 0 }]}>
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
                  <View>
                    <Text style={Headings.Input3}>Gender</Text>
                    <DropDownPicker
                      open={open}
                      value={
                        userData.gender != '' || userData.gender != null ? userData.gender : "Gender"
                      } 
                      // value={gender}
                      items={items}
                      setOpen={setOpen}
                      setValue={setGender}
                      setItems={setItems}
                      style={[TextInP.Fileds1, { borderRadius: open ? wp(6) : wp(50) }]}
                      placeholder="Select Gender"
                      placeholderStyle={{ color: 'grey' }}
                      dropDownContainerStyle={{ backgroundColor: '#F6E2FF', borderRadius: open ? wp(6) : wp(50), height: hp(12), borderColor: 'transparent', paddingLeft: 8, }}
                      textStyle={{ color: 'black' }}
                    />
                  </View>

                  <View styles={styles.InnerBox}>
                    <Text style={Headings.Input3}>Phone</Text>
                    <TextInput
                      style={[TextInP.Fileds, { width: wp(82) }]}
                      value={userData.phoneNo == '' ? 'Phone' : userData.phoneNo}
                      placeholderTextColor="grey"
                      placeholder={userData.phone}
                      onChangeText={text => setPhoneNo(text)}
                    />
                  </View>

                  <View>
                    <Text style={Headings.Input3}>Address</Text>
                    <TextInput
                      style={[TextInP.Fileds, { width: wp(82) }]}
                      value={
                        userData.address1 == '' ? 'Address' : userData.address1
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
                        value={userData.city == '' ? 'City' : userData.city}
                        placeholderTextColor="grey"
                        // value={lName}
                        onChangeText={text => setCity(text)}
                      />
                    </View>
                    <View styles={styles.InnerBox}>
                      <Text style={Headings.Input3}>Country</Text>
                      <TextInput
                        style={[TextInP.Fileds, { width: wp(38) }]}
                        value={
                          userData.country == '' ? 'Country' : userData.country
                        }
                        placeholderTextColor="grey"
                        // value={lName}
                        onChangeText={text => setCountry(text)}
                      />
                    </View>
                  </View>

                  <View style={styles.Box}>
                    <View styles={styles.InnerBox}>
                      <Text style={Headings.Input3}>State</Text>
                      <TextInput
                        style={[TextInP.Fileds, { width: wp(82) }]}
                        value={userData.state == '' ? 'State' : userData.state}
                        placeholderTextColor="grey"
                        // value={lName}
                        onChangeText={text => setState(text)}
                      />
                    </View>
                  </View>

                  <View style={styles.Social}>
                    <View style={{ flexDirection: 'row', alignItems: "center", gap: 10 }}>
                      <Text style={[{ marginLeft: wp(5) }, Headings.Input5]}>
                        Twitter
                      </Text>
                      <ToggleSwitch
                        disabled={true}
                        isOn={xtoggle}
                        style={{ marginRight: wp(5) }}
                        onColor="#652D90"
                        offColor="#FFFFFF"
                        thumbOffStyle={{ backgroundColor: '#E4E4E4' }}
                        thumbOnStyle={{ backgroundColor: '#fff' }}
                        size="small"
                        onToggle={() => {
                          setXTogel(!xtoggle)
                          xtoggle
                            ? (AccountRemovedApiCall(userN, 'Twitter'),
                              setIstwitterRemoveAccount(true),
                              setRefresh(!refresh)
                            )
                            : // setRemoveSLAModal(true)
                            (setIsTwitterApiCall(true));

                        }}
                      />

                    </View>
                    <TouchableOpacity onPress={TwitterCallHandel} style={[styles.button, { backgroundColor: '#652D90' }]}>
                      <Text style={styles.buttonText}>{xtoggle ? 'Disconnect' : 'Connect'}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.Social}>
                    <View style={{ flexDirection: 'row', alignItems: "center", gap: 10 }}>
                      <Text style={[{ marginLeft: wp(5) }, Headings.Input5]}>
                        LinkedIn
                      </Text>
                      <ToggleSwitch
                        isOn={linkedInToggle}
                        style={{ marginRight: wp(5) }}
                        onColor="#652D90"
                        offColor="#FFFFFF"
                        disabled={true}
                        thumbOffStyle={{ backgroundColor: '#E4E4E4' }}
                        thumbOnStyle={{ backgroundColor: '#fff' }}
                        size="small"
                        onToggle={() => {
                          setIsTwitterApiCall(false);
                          setLinkedInToggle(!linkedInToggle);
                          // LinkDinallHandel();
                          linkedInToggle
                            ? (AccountRemovedApiCall(userN, 'LinkedIn'),
                              setIstwitterRemoveAccount(true),
                              setRefresh(!refresh)
                            )
                            : (setIsTwitterApiCall(false));
                        }}
                      />
                    </View>
                    <TouchableOpacity onPress={LinkDinallHandel} style={[styles.button, { backgroundColor: '#652D90' }]}>
                      <Text style={styles.buttonText}>{linkedInToggle ? 'Disconnect' : 'Connect'}</Text>
                    </TouchableOpacity>


                  </View>
                  {/* //RemoveSoicalLinkApproval /> */}
                  {/* <Modal
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
                </Modal> */}


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
                    style={{ height: hp(90) }}

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
                  editable={false} />
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={Headings.InputCustom}>Name:</Text>
                <TextInput
                  style={[TextInP.Fileds, { width: wp(65), }]}
                  // placeholder={userData.emailID}
                  value={`${userData.firstName} ${userData.lastName}`}
                  placeholderTextColor="grey"
                  onChangeText={text => setEmailId(text)}
                  editable={false} />
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={Headings.InputCustom}>Phone Number:</Text>
                <TextInput
                  style={[TextInP.Fileds, { width: wp(49) }]}
                  // placeholder={userData.emailID}
                  value={userData.phoneNo == '' ? 'N/A' : userData.phoneNo}
                  placeholderTextColor="grey"
                  onChangeText={text => setEmailId(text)}
                  editable={false} />
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={Headings.InputCustom}>Address:</Text>
                <TextInput
                  style={[TextInP.Fileds, { width: wp(61), }]}
                  // placeholder={userData.emailID}
                  value={userData.address1 == '' ? 'N/A' : userData.address1}
                  placeholderTextColor="grey"
                  onChangeText={text => setEmailId(text)}
                  editable={false} />
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={Headings.InputCustom}>Gender:</Text>
                <TextInput
                  style={[TextInP.Fileds, { width: wp(62), }]}
                  // placeholder={userData.emailID}
                  value={userData.gender == '' ? 'N/A' : userData.gender}
                  placeholderTextColor="grey"
                  onChangeText={text => setEmailId(text)}
                  editable={false} />
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={Headings.InputCustom}>City:</Text>
                <TextInput
                  style={[TextInP.Fileds, { width: wp(68), }]}
                  // placeholder={userData.emailID}
                  value={userData.city == '' ? 'N/A' : userData.city}
                  placeholderTextColor="grey"
                  onChangeText={text => setEmailId(text)}
                  editable={false} />
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={Headings.InputCustom}>Country:</Text>
                <TextInput
                  style={[TextInP.Fileds, { width: wp(61), }]}
                  // placeholder={userData.emailID}
                  value={userData.country == '' ? 'N/A' : userData.country}
                  placeholderTextColor="grey"
                  onChangeText={text => setEmailId(text)}
                  editable={false} />
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
            blurType="light"
            blurAmount={10}
          ></BlurView>
          <View style={{ flexDirection: 'row' }}>
            <BlurView
              style={{ flex: 1 }}
              blurType="light"
              blurAmount={10}
            ></BlurView>
            <UpdatePasswordModal />
            <BlurView
              style={{ flex: 1 }}
              blurType="light"
              blurAmount={10}
            ></BlurView>
          </View>
          <BlurView
            style={{ flex: 1 }}
            blurType="light"
            blurAmount={10}
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
                <Text style={{ color: "white" }}> Edit Profile</Text>
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
                <Text style={{ color: "white" }}> Change Password</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(1),
    // backgroundColor: '#ffffff',
    padding: wp(4),
    // borderRadius: wp(10),
    // shadowColor: 'grey',
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
  button: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
  },
});

export default UserProfile;

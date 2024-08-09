import ToggleSwitch from 'toggle-switch-react-native';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import GetUserData from '../Network/Users/GetUserData';
import {UserNo} from '../recoil/AddPromise';
import {useRecoilState} from 'recoil';
import {TouchableOpacity} from 'react-native';
import Font from 'react-native-vector-icons/Fontisto';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useIsFocused} from '@react-navigation/native';
import {TextInP} from '../Styling/TextInput';
import {Headings} from '../Styling/Headings';
import {UpdateProfileApi} from '../Network/Users/modifyUser';
import UpdatePasswordModal from '../comp/UpdatePasswordModal';
import {
  CurrentPassword,
  DobDate,
  Firstname,
  Lastname,
  RemoveSoicalLinkApprovalState,
  RemoveTwitterApicall,
  adresss,
  cityy,
  countryy,
  isChangePasswordModalV,
  phonenumber,
  statee,
} from '../recoil/Users/GetUsers';
import {useNavigation} from '@react-navigation/native';
import TwitterApiCallLogin from '../Network/Users/TwitterApiCallToLogin';
import TwitterApiCallToCheckData from '../Network/Users/TwitterApiCallToCheckData';
import LinkDinApiCallToCheckData from '../Network/Users/LinkdinApiCallToCheckData';
import LinkDinApiCallLogin from '../Network/Users/LinkdinApiCallToLogin';
import {BlurView} from '@react-native-community/blur';
import DropDownPicker from 'react-native-dropdown-picker';
import AccountRemovedApiCall from '../Network/Users/RemoveUserSocialAccounts/TwitterAccountRemoveApiCall';
import RNPickerSelect from 'react-native-picker-select';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';

const EditProfile = () => {
  const [istwitterRemoveAccount, setIstwitterRemoveAccount] =
    useRecoilState(RemoveTwitterApicall);

  const [startDa, setStartDate] = useRecoilState(DobDate);

  const [isDrawerV, setIsDrawerV] = useRecoilState(isChangePasswordModalV);

  const [userData, setUserData] = useState(null);
  const [socialLogin, setSocialLogin] = useState(false);
  const [userN, setUserN] = useRecoilState(UserNo);
  const [editProfile, setEditProfile] = useState(false);
  const focus = useIsFocused();

  const [emailId, setEmailId] = useState('');
  const [fName, setFName] = useRecoilState(Firstname);
  const [lName, setLName] = useRecoilState(Lastname);
  const [phonNo, setPhoneNo] = useRecoilState(phonenumber);
  const [address, setAddress] = useRecoilState(adresss);
  const [city, setCity] = useRecoilState(cityy);
  const [state, setState] = useRecoilState(statee);
  const [open1, setOpen1] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [country, setCountry] = useRecoilState(countryy);
  const navigation = useNavigation();

  const [xtoggle, setXTogel] = useState(false);
  const [linkedInToggle, setLinkedInToggle] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [twitterResponse, setTwitterResponse] = useState('');
  const [linkDinResponse, setLinkDinResponse] = useState('');
  const [isTwitterApiCall, setIsTwitterApiCall] = useState(false);
  const usStates = [
    {label: 'Alabama', value: 'AL'},
    {label: 'Alaska', value: 'AK'},
    {label: 'Arizona', value: 'AZ'},
    {label: 'Arkansas', value: 'AR'},
    {label: 'California', value: 'CA'},
    {label: 'Colorado', value: 'CO'},
    {label: 'Connecticut', value: 'CT'},
    {label: 'Delaware', value: 'DE'},
    {label: 'Florida', value: 'FL'},
    {label: 'Georgia', value: 'GA'},
    {label: 'Hawaii', value: 'HI'},
    {label: 'Idaho', value: 'ID'},
    {label: 'Illinois', value: 'IL'},
    {label: 'Indiana', value: 'IN'},
    {label: 'Iowa', value: 'IA'},
    {label: 'Kansas', value: 'KS'},
    {label: 'Kentucky', value: 'KY'},
    {label: 'Louisiana', value: 'LA'},
    {label: 'Maine', value: 'ME'},
    {label: 'Maryland', value: 'MD'},
    {label: 'Massachusetts', value: 'MA'},
    {label: 'Michigan', value: 'MI'},
    {label: 'Minnesota', value: 'MN'},
    {label: 'Mississippi', value: 'MS'},
    {label: 'Missouri', value: 'MO'},
    {label: 'Montana', value: 'MT'},
    {label: 'Nebraska', value: 'NE'},
    {label: 'Nevada', value: 'NV'},
    {label: 'New Hampshire', value: 'NH'},
    {label: 'New Jersey', value: 'NJ'},
    {label: 'New Mexico', value: 'NM'},
    {label: 'New York', value: 'NY'},
    {label: 'North Carolina', value: 'NC'},
    {label: 'North Dakota', value: 'ND'},
    {label: 'Ohio', value: 'OH'},
    {label: 'Oklahoma', value: 'OK'},
    {label: 'Oregon', value: 'OR'},
    {label: 'Pennsylvania', value: 'PA'},
    {label: 'Rhode Island', value: 'RI'},
    {label: 'South Carolina', value: 'SC'},
    {label: 'South Dakota', value: 'SD'},
    {label: 'Tennessee', value: 'TN'},
    {label: 'Texas', value: 'TX'},
    {label: 'Utah', value: 'UT'},
    {label: 'Vermont', value: 'VT'},
    {label: 'Virginia', value: 'VA'},
    {label: 'Washington', value: 'WA'},
    {label: 'West Virginia', value: 'WV'},
    {label: 'Wisconsin', value: 'WI'},
    {label: 'Wyoming', value: 'WY'},
  ];

  const fetchUserData = async () => {
    try {
      const response = await GetUserData(userN);
      const data = await response;
      setUserData(data);
      setEmailId(data.emailID);
      setFName(data.firstName);
      setLName(data.lastName);
      setGender(data.gender);
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
    const useN = userN;
    const email = emailId === '' ? userData.email : emailId;
    const password = userData.password;
    const fNam = fName === '' ? userData.firstName : fName;
    const lNam = lName === '' ? userData.lastName : lName;
    const gende = gender;
    const phoneN = phonNo;
    const addres = address === '' ? userData.address1 : address;
    const cit = city;
    const stat = state;
    const pinCod = pinCode;
    const countr = country;
    const dom = startDa === '' ? userData.dob : startDa;
    const socialLogi = socialLogin;
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
    setRefresh(!refresh);
    setEmailId(email);
    setFName(fNam);
    setLName(lNam);
    setGender(gende);
    setPhoneNo(phoneN);
    setAddress(addres);
    setCity(cit);
    setState(stat);
    // setPinCode(data.zip);
    setCountry(countr);
    console.log(modifyApiRequest);
    if (modifyApiRequest.code === 200) {
      setEditProfile(false);
      console.log('code running');
      Toast.show({
        type: 'success',
        text1: 'Data successfully updated',
        swipeable: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      navigation.navigate('UserProfile');
    }
  };

  const LinkDinallHandel = async () => {
    if (linkedInToggle) {
      AccountRemovedApiCall(userN, 'LinkedIn');
    } else {
      setLinkDinResponse('');
      setIsTwitterApiCall(false);
      const LinkDinApiRes = await LinkDinApiCallLogin(userN);
      setLinkDinResponse(LinkDinApiRes);
      if (LinkDinApiRes !== '') {
        navigation.navigate('SocialWeb', {
          isTwitterApiCall: false,
          twitterResponse: '',
          linkDinResponse: LinkDinApiRes,
        });
      } else {
        console.log('Error');
      }
    }
  };

  const TwitterCallHandel = async () => {
    if (xtoggle) {
      AccountRemovedApiCall(userN, 'Twitter');
    } else {
      setLinkDinResponse(''); // Clear LinkedIn response when calling Twitter API
      const twitterApiRes = await TwitterApiCallLogin(userN);
      setTwitterResponse(twitterApiRes);
      setIsTwitterApiCall(true);
      if (twitterApiRes !== '') {
        navigation.navigate('SocialWeb', {
          isTwitterApiCall: true,
          twitterResponse: twitterApiRes,
          linkDinResponse: '',
        });
      } else {
        console.log('Error');
      }
    }
  };

  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState('');
  const [items, setItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ]);

  const apiCallChceckRes = async () => {
    const response = await TwitterApiCallToCheckData(userN);
    if (response == '400') {
      setXTogel(false);
    } else {
      setXTogel(true);
    }
  };
  const apiCallLinkChceckRes = async () => {
    const response = await LinkDinApiCallToCheckData(userN);
    if (response == 400) {
      setRefresh(!refresh);
      setLinkedInToggle(false);
    } else {
      setLinkedInToggle(true);
      setRefresh(!refresh);
    }
  };
  const [showStateDropdown, setShowStateDropdown] = useState(false);

  useEffect(() => {
    apiCallChceckRes();
    apiCallLinkChceckRes();
  }, [refresh]);

  useEffect(() => {
    fetchUserData();
  }, [focus]);

  useEffect(() => {
    const lowercaseCountry = country.toLowerCase();
    if (
      lowercaseCountry === 'us' ||
      lowercaseCountry === 'usa' ||
      lowercaseCountry === 'america' ||
      lowercaseCountry === 'united states of america' ||
      lowercaseCountry === 'united states'
    ) {
      setShowStateDropdown(true);
    } else {
      setShowStateDropdown(false);
    }
  }, [country, refresh]);
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
        <View>
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
            <ScrollView>
              <View>
                <Text style={Headings.Input3}>Email</Text>
                <TextInput
                  style={[TextInP.Fileds, {width: wp(82)}]}
                  value={userData.emailID}
                  placeholderTextColor="#000"
                  onChangeText={text => setEmailId(text)}
                />
              </View>

              <View style={[styles.Box, {paddingHorizontal: 0}]}>
                <View styles={styles.InnerBox}>
                  <Text style={Headings.Input3}>First Name</Text>
                  <TextInput
                    style={[TextInP.Fileds, {width: wp(38)}]}
                    placeholder="First Name"
                    value={fName}
                    placeholderTextColor="grey"
                    onChangeText={text => setFName(text)}
                  />
                </View>
                <View styles={styles.InnerBox}>
                  <Text style={Headings.Input3}>Last Name</Text>
                  <TextInput
                    style={[TextInP.Fileds, {width: wp(38)}]}
                    placeholder="Last Name"
                    placeholderTextColor="grey"
                    value={lName}
                    onChangeText={text => setLName(text)}
                  />
                </View>
              </View>

              <View style={{zIndex: 100}}>
                <Text style={Headings.Input3}>Gender</Text>
                <DropDownPicker
                  open={open}
                  value={gender}
                  items={items}
                  setOpen={setOpen}
                  setValue={setGender}
                  setItems={setItems}
                  style={[
                    TextInP.Fileds1,
                    {borderRadius: open ? wp(6) : wp(50)},
                  ]}
                  placeholder="Select Gender"
                  placeholderStyle={{color: 'grey'}}
                  dropDownContainerStyle={{
                    backgroundColor: '#F6E2FF',
                    borderRadius: open ? wp(6) : wp(50),
                    height: hp(12),
                    borderColor: 'transparent',
                    paddingLeft: 8,
                  }}
                  textStyle={{color: 'black'}}
                />
              </View>

              <View styles={styles.InnerBox}>
                <Text style={Headings.Input3}>Phone</Text>
                <TextInput
                  style={[TextInP.Fileds, {width: wp(82)}]}
                  value={phonNo}
                  placeholderTextColor="grey"
                  placeholder={userData.phone}
                  keyboardType="numeric"
                  // maxLength={10}
                  onChangeText={text => {
                    const numericText = text.replace(/[^0-9]/g, '');
                    setPhoneNo(numericText);
                  }}
                />
              </View>

              <View>
                <Text style={Headings.Input3}>Address</Text>
                <TextInput
                  style={[TextInP.Fileds, {width: wp(82)}]}
                  value={address}
                  placeholderTextColor="grey"
                  onChangeText={text => setAddress(text)}
                />
              </View>

              <View style={styles.Box}>
                <View styles={styles.InnerBox}>
                  <Text style={Headings.Input3}>City</Text>
                  <TextInput
                    style={[TextInP.Fileds, {width: wp(82)}]}
                    value={city}
                    placeholderTextColor="grey"
                    onChangeText={text => setCity(text)}
                  />
                </View>
              </View>

              <View styles={styles.InnerBox}>
                <Text style={Headings.Input3}>Country</Text>
                <TextInput
                  style={[TextInP.Fileds, {width: wp(82)}]}
                  value={country}
                  placeholderTextColor="grey"
                  onChangeText={text => setCountry(text)}
                />
              </View>

              {showStateDropdown ? (
                <View style={styles.Box}>
                  <View style={styles.InnerBox}>
                    <Text style={Headings.Input3}>State</Text>
                    <RNPickerSelect
                      onValueChange={value => setState(value)}
                      items={usStates}
                      style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                          top: 10,
                          right: 12,
                        },
                        placeholder: {
                          color: 'black', // Set the placeholder color to black
                        },
                      }}
                      useNativeAndroidPickerStyle={false}
                      placeholder={{label: 'Select a state', value: null}}
                      value={state}
                    />
                  </View>
                </View>
              ) : (
                <View styles={styles.Box}>
                  <Text style={Headings.Input3}>State</Text>
                  <TextInput
                    style={[TextInP.Fileds, {width: wp(82)}]}
                    value={state}
                    placeholderTextColor="grey"
                    onChangeText={text => setState(text)}
                  />
                </View>
              )}
            </ScrollView>
            <View style={styles.Social}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Text style={[{marginLeft: wp(5)}, Headings.Input5]}>
                  Twitter
                </Text>
                <ToggleSwitch
                  disabled={true}
                  isOn={xtoggle}
                  style={{marginRight: wp(5)}}
                  onColor="#652D90"
                  offColor="#FFFFFF"
                  thumbOffStyle={{backgroundColor: '#E4E4E4'}}
                  thumbOnStyle={{backgroundColor: '#fff'}}
                  size="small"
                  onToggle={() => {
                    setXTogel(!xtoggle);
                    xtoggle
                      ? (AccountRemovedApiCall(userN, 'Twitter'),
                        setIstwitterRemoveAccount(true),
                        setRefresh(!refresh))
                      : setIsTwitterApiCall(true);
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={TwitterCallHandel}
                style={[styles.button, {backgroundColor: '#652D90'}]}>
                <Text style={styles.buttonText}>
                  {xtoggle ? 'Disconnect' : 'Connect'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.Social}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Text style={[{marginLeft: wp(5)}, Headings.Input5]}>
                  LinkedIn
                </Text>
                <ToggleSwitch
                  isOn={linkedInToggle}
                  style={{marginRight: wp(5)}}
                  onColor="#652D90"
                  offColor="#FFFFFF"
                  disabled={true}
                  thumbOffStyle={{backgroundColor: '#E4E4E4'}}
                  thumbOnStyle={{backgroundColor: '#fff'}}
                  size="small"
                  onToggle={() => {
                    setIsTwitterApiCall(false);
                    setLinkedInToggle(!linkedInToggle);
                    linkedInToggle
                      ? (AccountRemovedApiCall(userN, 'LinkedIn'),
                        setIstwitterRemoveAccount(true),
                        setRefresh(!refresh))
                      : setIsTwitterApiCall(false);
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={LinkDinallHandel}
                style={[styles.button, {backgroundColor: '#652D90'}]}>
                <Text style={styles.buttonText}>
                  {linkedInToggle ? 'Disconnect' : 'Connect'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isDrawerV}
          onRequestClose={() => setIsDrawerV(false)}>
          <BlurView
            style={{height: hp(20)}}
            blurType="light"
            blurAmount={10}></BlurView>
          <View style={{flexDirection: 'row'}}>
            <BlurView
              style={{flex: 1}}
              blurType="light"
              blurAmount={10}></BlurView>
            <UpdatePasswordModal />
            <BlurView
              style={{flex: 1}}
              blurType="light"
              blurAmount={10}></BlurView>
          </View>
          <BlurView
            style={{flex: 1}}
            blurType="light"
            blurAmount={10}></BlurView>
        </Modal>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: wp(100),
            height: hp(8),
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              gap: 50,
              marginTop: 10,
              zIndex: -10,
            }}>
            <TouchableOpacity
              onPress={() => UpdateProfile()} // Ensure function is called only on press
              style={{marginLeft: wp(0)}}>
              <FontAw5 color="green" name="check" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEditProfile(false);
                setStartDate('');
                navigation.navigate('UserProfile');
              }}
              style={{marginLeft: wp(0)}}>
              <FontAw5 color="#652D90" name="times" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  dropdownContainer: {
    borderRadius: 5,
    padding: 10,
  },

  container: {
    marginVertical: hp(1),
    padding: wp(4),
    borderWidth: 0.5,
    width: wp(90),
    alignSelf: 'center',
    borderRadius: wp(2),
    marginHorizontal: wp(3),
    height: hp(45),
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: hp(2)},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 'auto',
  },
  DateCB: {},
  Box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  InnerBox: {with: wp(40)},
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
    color: 'black',
  },
  data: {
    fontSize: wp(4),
    fontWeight: 'normal',
    marginTop: hp(2),
  },
  InputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(90),
    height: hp(8),
    marginTop: hp(1),
    marginBottom: hp(1),
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
  dropDownContainer: {
    backgroundColor: '#F6E2FF',
    borderRadius: wp(2),
    minHeight: hp(25),
    overflow: 'scroll',
    paddingLeft: 8,
  },
  listItemContainer: {
    height: hp(3),
    overflow: 'scroll',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  InputCustom: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: hp(1.8),
    marginHorizontal: 10,
    alignContent: 'center',
    width: wp(18),
    lineHeight: 25,
  },
  Fileds: {
    backgroundColor: '#F6E2FF',
    borderRadius: wp(50),
    alignItems: 'center',
    height: hp(6),
    paddingLeft: 20,
    borderColor: 'transparent',
    color: 'black',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginTop: hp(1.3),
    fontSize: 16,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
    borderWidth: 0,
    borderRadius: wp(20),
    color: 'black',
    paddingRight: wp(8), // to ensure the text is never behind the icon
    backgroundColor: '#F6E2FF',
    alignItems: 'center',
    width: wp(82),
    height: hp(6),
    paddingLeft: wp(5),
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderColor: 'transparent',
    borderRadius: wp(20),
    color: 'black',
    paddingRight: wp(8), // to ensure the text is never behind the icon
    backgroundColor: '#F6E2FF',
    alignItems: 'center',
    width: wp(82),
    height: hp(6),
    paddingLeft: wp(5),
  },
});
export default EditProfile;

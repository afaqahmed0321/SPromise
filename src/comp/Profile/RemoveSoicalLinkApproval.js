import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  RemoveSoicalLinkApprovalState,
  RemoveTwitterApicall,
} from '../../recoil/Users/GetUsers';
import {useRecoilState} from 'recoil';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {commonStyles} from '../../Styling/buttons';
import {UserNo} from '../../recoil/AddPromise';
import AccountRemovedApiCall from '../../Network/Users/RemoveUserSocialAccounts/TwitterAccountRemoveApiCall';

const RemoveSoicalLinkApproval = () => {
  // const [isModalVisible, setModalVisible] = useState(false);
  const [istwitterRemoveAccount, setIstwitterRemoveAccount] =
    useRecoilState(RemoveTwitterApicall);
  const [removeSLAModal, setRemoveSLAModal] = useRecoilState(
    RemoveSoicalLinkApprovalState,
  );
  const [userN, setUserN] = useRecoilState(UserNo);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleYes = async () => {
    const Platform = istwitterRemoveAccount ? 'Twitter' : 'LinkedIn';
    const res = await AccountRemovedApiCall(userN, Platform);
    setRemoveSLAModal(false);
  };

  const handleNo = () => {
    // Handle the 'No' option
    // toggleModal();

    setRemoveSLAModal(false);
  };
  return (
    <View
      style={{
      
        height: heightPercentageToDP(25),
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 0.5,
        width: widthPercentageToDP(90),
        alignSelf: 'center',
        // borderRadius: widthPercentageToDP(8),
        borderColor: '#652D90',
        backgroundColor: 'white',
      }}>
      <Text style={{fontSize: heightPercentageToDP(3), color:"black"}}>
        Do you want to proceed?
      </Text>
      <View
        style={{
          flexDirection: 'row',
          width: widthPercentageToDP(90),
          justifyContent: 'space-evenly',
          alignItems: 'center',
          paddingBottom:20
        }}>
        <TouchableOpacity
          onPress={handleYes}
          style={[commonStyles.SignUpBtn, {width: widthPercentageToDP(38)}]}>
          <Text style={{color:"white",fontSize:15, fontWeight:"600"}}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNo}
          style={[
            commonStyles.SignUpBtn,
            {width: widthPercentageToDP(38), backgroundColor: 'red'},
          ]}>
          <Text  style={{color:"white",fontSize:15, fontWeight:"600"}}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RemoveSoicalLinkApproval;

const styles = StyleSheet.create({});

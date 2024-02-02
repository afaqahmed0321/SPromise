import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Pie from 'react-native-pie';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {UserNo} from '../recoil/AddPromise';
import {useRecoilState} from 'recoil';
import getUserPromisbility from '../Network/GetPromisibility';

const PromiseStatusData = () => {
  const [userN, setUserN] = useRecoilState(UserNo);
  const [userPromisbility, setUserPromisbility] = useState(null);

  const fetchData = async () => {
    const res = await getUserPromisbility(userN);
    const userPromisbil = res ? Number(res) : 0
    console.log(userPromisbil, 'j')
    setUserPromisbility(userPromisbil)
   
  };

  useEffect(() => {
    fetchData();
  }, [userPromisbility]);

  return (
    <View style={styles.PromiseStatus}>
      <View>
        <View style={styles.bar}>
          <Text style={styles.barText}>User Promisibility</Text>
        </View>
        <View style={styles.container}>
          <View
            style={{
              paddingHorizontal: 15,
              flexDirection: 'row',
              width: wp(90),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <View>
              <View style={{}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      backgroundColor: '#73B6BF',
                      height: hp(1.5),
                      width: wp(3),
                    }}></View>
                  <Text
                    style={{
                      marginLeft: wp(2),
                      fontWeight: 'bold',
                      fontSize: hp(1.5),
                      color:'#652D90',
                    }}>
                    Promisbility
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical:hp(2)}}>
              <View
                style={{
                  backgroundColor: '#ee8347',
                  height: hp(1.5),
                  width: wp(3),
                }}>

                </View>
              <Text
                style={{
                  marginLeft: wp(2),
                  fontWeight: 'bold',
                  fontSize: wp(3),
                  color:'#652D90',

                }}>
                Failed
              </Text>
            </View>
              </View>
            </View> */}
            <View 
            // style={{marginLeft: wp(-1), marginBottom:-40}}
            style={{flex: 1 , justifyContent:'center',alignItems: 'center'}}

            >
              <Pie
                radius={60}
                innerRadius={50}
                backgroundColor='ee8347'
                sections={[
                  // {
                  //   percentage: userPromisbility ,
                  //   color: '#ee8347',
                  // },
                  {
                    percentage: userPromisbility  ,
                    color: '#73B6BF',
                  },
                ]}
                dividerSize={2}
                strokeCap={'butt'}
              />
              <View
               style={{position: 'absolute',
               bottom: '43%',
               left: '46%',
              }}
               >
                {userPromisbility ? (
                  <Text style={{fontSize: hp(2), color:'#652D90'}}>{userPromisbility}%</Text>
                ) : (
                  <Text style={{fontSize: hp(2), marginLeft: wp(1), color:'#652D90'}}>
                    {userPromisbility}%
                  </Text>
                )}
              </View>
            </View>
          </View>

          {/* <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  backgroundColor: '#FFE4BB',
                  height: hp(1.5),
                  width: wp(3),
                }}></View>
              <Text
                style={{
                  marginLeft: wp(2),
                  fontWeight: 'bold',
                  fontSize: wp(2.5),
                }}>
                Pending
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginLeft: wp(4)}}>
              <View
                style={{
                  backgroundColor: '#CCF3FF',
                  height: hp(1.5),
                  width: wp(3),
                }}></View>
              <Text
                style={{
                  marginLeft: wp(2),
                  fontWeight: 'bold',
                  fontSize: wp(2.5),
                }}>
                Active
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: hp(1)}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  backgroundColor: '#DAFFD0',
                  height: hp(1.5),
                  width: wp(3),
                }}></View>
              <Text
                style={{
                  marginLeft: wp(2),
                  fontWeight: 'bold',
                  fontSize: wp(2.5),
                }}>
                Complete
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginLeft: wp(4)}}>
              <View
                style={{
                  backgroundColor: '#FFBEBE',
                  height: hp(1.5),
                  width: wp(3),
                }}></View>
              <Text
                style={{
                  marginLeft: wp(2),
                  fontWeight: 'bold',
                  fontSize: wp(2.5),
                }}>
                Failed
              </Text>
            </View>
          </View> */}
        </View>
      </View>
    </View>
  );
};

export default PromiseStatusData;

const styles = StyleSheet.create({
  PromiseStatus: {
    width: wp(90),
    // borderWidth: wp(0.3),
    height: hp(21),
    // borderColor: 'red',
    // backgroundColor: '#DDDFE2',
    borderRadius: wp(5),
    // borderWidth: 1,
  },
  bar: {
    height: hp(3),
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
    paddingLeft: wp(2),
  },
  container: {
    alignItems: 'center',
  },
});

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Pie from 'react-native-pie';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { UserNo } from '../recoil/AddPromise';
import { useRecoilState } from 'recoil';
import getUserPromisbility from '../Network/GetPromisibility';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';

const PromiseStatusData = () => {
  const [userN, setUserN] = useRecoilState(UserNo);
  console.log("this is userNO", userN)
  const [userPromisbility, setUserPromisbility] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    console.log("fetch data is called")
    const res = await getUserPromisbility(userN);
    const userPromisbil = res ? Number(res) : 0
    console.log(userPromisbil, 'jjjjjjjjjjjj')
    setUserPromisbility(userPromisbil)

  };

  useEffect(() => {
    fetchData();
  }, [userPromisbility, refresh]);

  return (
    <View style={styles.PromiseStatus}>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", alignContent: "center", marginHorizontal: 10, marginVertical: 3 }}>
          <View style={styles.bar}>
            <Text style={styles.barText}>Your Promisibility</Text>
          </View>
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
        <View style={styles.container}>
          <View
            style={{
              paddingHorizontal: 15,
              flexDirection: 'row',
              width: wp(90),
              justifyContent: 'center',
              alignItems: 'center',
            }}>

            <View
              // style={{marginLeft: wp(-1), marginBottom:-40}}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}

            >
              {
                console.log("this is promisibility", userPromisbility)
              }
              <Pie
                radius={60}
                innerRadius={50}
                backgroundColor='#ee8347'
                sections={[

                  {
                    percentage: userPromisbility,
                    color: '#73B6BF',
                  },
                ]}
                dividerSize={2}
                strokeCap={'butt'}
              />
              <View
                style={{ justifyContent: 'center', alignItems: 'center', marginVertical:"auto" }}
              >
                {userPromisbility ? (
                  <Text style={{ fontSize: hp(2), color: '#652D90' }}> {parseInt(userPromisbility)}%</Text>
                ) : (
                  <Text style={{ fontSize: hp(2), marginLeft: wp(1), color: '#652D90' }}>
                    {parseInt(userPromisbility)}%
                  </Text>
                )}
              </View>
            </View>
          </View>


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

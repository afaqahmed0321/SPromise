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
import LinearGradient from 'react-native-linear-gradient';

const PromiseStatusData = () => {
  const [userN, setUserN] = useRecoilState(UserNo);
  console.log("This is userNO", userN);
  const [userPromisbility, setUserPromisbility] = useState(null);
  const [userReward, setUserReward] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    console.log("Fetch data is called");
    const res = await getUserPromisbility(userN);
    const resp = res.promisibility
    const userPromisbil = resp ? Number(resp) : 0;
    console.log(userPromisbil, 'jjjjjjjjjjjj');
    setUserPromisbility(userPromisbil);
    setUserReward(res.rewardPoints)
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <View style={styles.PromiseStatus}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.barText}>Your Promisibility</Text>
        <TouchableOpacity onPress={() => setRefresh(!refresh)}>
          <View style={styles.refreshIcon}>
            <FontAw5
              name="sync"
              size={15}
              color="#6650A4"
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.pieChartsContainer}>
          <View style={styles.pieChartWrapper}>
            <Pie
              radius={60}
              innerRadius={50}
              backgroundColor="#ee8347"
              sections={[
                {
                  percentage: userPromisbility,
                  color: '#73B6BF',
                },
              ]}
              dividerSize={2}
              strokeCap={'butt'}
            />
            <View style={styles.pieChartLabel}>
              <Text style={styles.pieChartText}>
                {parseInt(userPromisbility)}%
              </Text>
            </View>
          </View>

          <View style={styles.pieChartWrapper}>
            <View style={styles.pieChartLabel2}>
              <Text style={styles.barText}>Reward Points</Text>
            </View>
            <LinearGradient
              colors={['#73B6BF', '#2E888C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{
                width: '66%',
                height: hp(14),
                opacity: 1,
                borderRadius: wp(50),
                marginTop: hp(0.5),
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
              }}
            >
             <View style={styles.pieChartLabel1}>
              <Text style={styles.pieChartText1}>
                {parseInt(userReward)} pts
              </Text>
            </View>
            </LinearGradient>
            {/* Add a second pie chart here */}
           
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
    height: hp(21),
    borderRadius: wp(5),
    padding: wp(3),
    backgroundColor: 'rgba(101, 45, 144, 0.01)',
    
  },
  barText: {
    fontSize: hp(1.5),
    color: '#652D90',
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  refreshIcon: {
    marginRight: wp(2),
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieChartsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  pieChartWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  pieChartLabel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',

  },
  // pieChartLabel1: {
  //   position: 'absolute',
  //   top: 25,
  //   bottom: 0,
  //   left: 25,
  //   right: 0,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: "#652D90",
  //   padding: 0,
  //   borderRadius: 40,
  //   zIndex: -1,
  //   height: 50,
  //   width: 100
  // },
  pieChartLabel2: {
    position: 'absolute',
    top: -55,
    bottom: 100,
    left: 0,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    color: "#652D90"
  },
  pieChartText: {
    fontSize: hp(2),
    color: '#652D90',
  },
  pieChartText1: {
    fontSize: hp(2),
    color: '#fff',
    textAlign:"center",
    marginHorizontal:34
  },
});

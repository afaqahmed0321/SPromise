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
import { Positions } from 'react-native-calendars/src/expandableCalendar';

const PromiseStatusData = () => {
  const [userN, setUserN] = useRecoilState(UserNo);
  const [userPromisbility, setUserPromisbility] = useState(null);
  const [userReward, setUserReward] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    const res = await getUserPromisbility(userN);
    const resp = res.promisibility;
    const userPromisbil = resp ? Number(resp) : 0;
    setUserPromisbility(userPromisbil);
    setUserReward(res.rewardPoints);
  };

  useEffect(() => {
    fetchData();

    const timer = setTimeout(() => {
      setRefresh(!refresh);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (refresh) {
      fetchData();
    }
  }, [refresh]);

  return (
    <View style={styles.PromiseStatus}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.barText}>Your Promisibility</Text>
        </View>
        <View>
          <Text style={[styles.barText, styles.rewardText]}>Reward Points</Text>

        </View>
        <View>
          <TouchableOpacity onPress={() => setRefresh(!refresh)}>
            <View style={styles.refreshIcon}>
              <FontAw5 name="sync" size={15} color="#6650A4" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.pieChartsContainer}>
          <View style={styles.pieChartWrapper}>
            <Pie
              radius={hp(6)}
              innerRadius={hp(5)}
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
            <Pie
              radius={hp(6)}
              innerRadius={hp(5)}
              backgroundColor="#652D90"
              sections={[
                {
                  percentage: userReward,
                  // color: '#73B6BF',
                },
              ]}
              dividerSize={1}
              strokeCap={'butt'}
            />
            <View style={styles.pieChartLabel}>
              <Text style={styles.pieChartText}>
                {parseInt(userReward)} pts
              </Text>
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
    height: hp(25),
    borderRadius: wp(5),
    padding: wp(3),
    backgroundColor: 'rgba(101, 45, 144, 0.01)',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barText: {
    fontSize: hp(1.6),
    color: '#652D90',
    fontWeight: 'bold',
  },
  // refreshIcon: {
  //   marginRight: wp(2),
  // },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieChartsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(2),
    alignItems: 'center'
  },
  pieChartWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pieChartLabel: {
    flexDirection: "row",
    justifyContent: 'start',
    alignItems: 'center',
    position: 'absolute',
    
  },

  pieChartText: {
    fontSize: hp(1.6),
    color: '#652D90',
    textAlign: 'center',
  },
  pieChartText1: {
    fontSize: hp(1.6),
    textAlign: 'center',
  },
  linearGradient: {
    width: wp(23),
    height: hp(11.5),
    borderRadius: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },

});

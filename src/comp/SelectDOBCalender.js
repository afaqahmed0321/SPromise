import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars'; // for Date
import React, {useState} from 'react';
import Font from 'react-native-vector-icons/Fontisto';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useRecoilState} from 'recoil';
import {
  promiseType,
  promiseAmounnt,
  deadline,
  MakeaPromise,
  startDate,
  isStartDateModalV,
  isEndDateModalV,
} from '../../../recoil/AddPromise';
import { DobDate, isDOBModalV } from '../recoil/Users/GetUsers';
const DOBModal = () => {
  const [startDateMV, setStartDateMV] = useRecoilState(isDOBModalV);
  const [selectStartDate, setselectStartDate] = useState(true);
  // const [endDateMV, setEndDateMV] = useRecoilState(isEndDateModalV)
  // const [deadlinedate, setDeadLinedate] = useRecoilState(deadline);
  const [startDa, setStartDate] = useRecoilState(DobDate);
  return (
    <View
      style={{
        marginTop: hp(35),
        alignItems: 'center',
        height: hp(53),
        backgroundColor: 'white',
        borderWidth: 1
      }}>
         <TouchableOpacity
                onPress={() => setStartDateMV(false)}
                style={{marginLeft: wp(60), marginTop: hp(1)}}>
                <Font color="red" name="close" size={30} />
              </TouchableOpacity>
      {selectStartDate ? (
        <Calendar
          style={styles.keyB}
          onDayPress={day => {
            setStartDate(day.dateString);
            setStartDateMV(false);
            setselectStartDate(false);
          }}
          markedDates={{
            [startDa]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: 'white',
            },
          }}
        />
      ) : null}
    </View>
  );
};

export default DOBModal;

const styles = StyleSheet.create({});

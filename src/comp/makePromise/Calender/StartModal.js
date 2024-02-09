import { StyleSheet, Text, View } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars'; // for Date
import React, { useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useRecoilState } from 'recoil';
import {
  promiseType,
  promiseAmounnt,
  deadline,
  MakeaPromise,
  startDate,
  isStartDateModalV,
  isEndDateModalV
} from '../../../recoil/AddPromise';
const StartModal = () => {
  const [startDateMV, setStartDateMV] = useRecoilState(isStartDateModalV)
  const [selectStartDate, setselectStartDate] = useState(true);
  // const [endDateMV, setEndDateMV] = useRecoilState(isEndDateModalV)
  // const [deadlinedate, setDeadLinedate] = useRecoilState(deadline);
  const [startDa, setStartDate] = useRecoilState(startDate);
  return (
    <View style={{ marginTop: hp(38), alignItems: 'center', height: hp(45), backgroundColor: 'white' }}>

      {selectStartDate ? (<Calendar
        style={styles.keyB}
        onDayPress={day => {
          setStartDate(day.dateString);
          setStartDateMV(false)
          setselectStartDate(false)
        }}
        markedDates={{
          [startDa]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: 'white',
          },
        }}
      />) : null}

    </View>
  )
}

export default StartModal

const styles = StyleSheet.create({})
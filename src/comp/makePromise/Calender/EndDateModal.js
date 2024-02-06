import { StyleSheet, Text, View } from 'react-native'
import {Calendar, LocaleConfig} from 'react-native-calendars'; // for Date
import React,{useState} from 'react'
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
    isEndDateModalV
  } from '../../../recoil/AddPromise';
const EndDateModal = () => {
    const [selectEndDate, setSelectEndDate] = useState(false);
    const [deadlinedate, setDeadLinedate] = useRecoilState(deadline);
    const [endDateMV, setEndDateMV] = useRecoilState(isEndDateModalV)
  return (
    <View style={{marginTop: hp(40), alignItems: 'center',height: hp(40), backgroundColor: 'white'  }}>
    
    <Calendar
  style={styles.keyB}
  onDayPress={day => {
    console.log('Clicked'); // Corrected the string closing quote
    setDeadLinedate(day.dateString);
    setEndDateMV(false);
  }}
  markedDates={{
    [deadlinedate]: {
      selected: true,
      disableTouchEvent: true,
      selectedDotColor: 'white',
    },
  }}
/>
</View>
  )
}

export default EndDateModal

const styles = StyleSheet.create({})
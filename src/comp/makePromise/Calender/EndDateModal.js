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
  onDayPress={days => {
    console.log('Clicked',days); // Corrected the string closing quote
    const year = days.year;
const month = days.month - 1; // Month is 0-indexed in JavaScript Date
const day = days.day;
// Create a Date object from the extracted date components
const dateObj = new Date(Date.UTC(year, month, day));
// Set the time to 10:25:57.880
dateObj.setUTCHours(10, 25, 57, 880);
// Convert the Date object to ISO 8601 format with UTC timezone
const formattedDate = dateObj.toISOString();
console.log(formattedDate,"dataaaa")
    setDeadLinedate(formattedDate);
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
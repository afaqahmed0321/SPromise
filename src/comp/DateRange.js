import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DateRangePicker } from 'react-native-dates';

const DateRange = () => {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [focusedInput, setFocusedInput] = useState(null);

  const onDatesChange = ({ startDate, endDate }) => {
    setDateRange({ startDate, endDate });
  };

  return (
    <View style={styles.container}>
      <DateRangePicker
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        focusedInput={focusedInput}
        onDatesChange={onDatesChange}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
      />
      <View style={styles.resultContainer}>
        <Text>Start Date: {dateRange.startDate ? dateRange.startDate.format('YYYY-MM-DD') : 'Select a date'}</Text>
        <Text>End Date: {dateRange.endDate ? dateRange.endDate.format('YYYY-MM-DD') : 'Select a date'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultContainer: {
    marginTop: widthPercentageToDP(2),
  },
});

export default DateRange; // Export the component as default
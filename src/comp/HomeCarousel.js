import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const dummyData = [
  {
    title: 'Item 1',
    imageUri:
      'https://images.pexels.com/photos/889545/pexels-photo-889545.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', // Dummy image URL
  },
  {
    title: 'Item 2',
    imageUri:
      'https://images.pexels.com/photos/699459/pexels-photo-699459.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', // Dummy image URL
  },
  {
    title: 'Item 3',
    imageUri:
      'https://images.pexels.com/photos/1245055/pexels-photo-1245055.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', // Dummy image URL
  },
  {
    title: 'Item 3',
    imageUri:
      'https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', // Dummy image URL
  },
  {
    title: 'Item 3',
    imageUri:
      'https://images.pexels.com/photos/1472334/pexels-photo-1472334.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', // Dummy image URL
  },
  {
    title: 'Item 3',
    imageUri:
      'https://images.pexels.com/photos/240561/pexels-photo-240561.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', // Dummy image URL
  },
];

const HomeCarousel = () => {
  const sliderWidth = wp(90);
  const itemWidth = wp(90);

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Image style={styles.image} source={{uri: item.imageUri}} />
      </View>
    );
  };

  return (
    <View style={{borderWidth: wp(.5)}}>
      <Carousel
        ref={c => {
          this._carousel = c;
        }}
        data={dummyData}
        renderItem={_renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: wp(90),
    borderWidth: hp(.5)
   
  },
  title: {
    fontSize: 16,
    marginTop: 10,
  },
  image: {
   
    height: hp(40),
    width: wp(90),
  },
});

export default HomeCarousel;

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';


import Home, { Bgcolor, HEIGHT } from './Home';
import { useDispatch } from 'react-redux';
import { FetchData } from './src/Store/slices/UserSlices';

const App = () => {
  useEffect(() => {
    
    dispatch(FetchData())
  },[]);
  const dispatch=useDispatch();
    


  return (

    <View style={styles.container}>
     
        <Home />
     
   
    </View>

  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    height:HEIGHT,
    backgroundColor: 'white',
  },
  bottomNav: {
    width: '100%',
    height: verticalScale(70),
    backgroundColor: Bgcolor,
    position: 'absolute',
    bottom: 0,
  },
  bottomNav2: {
    width: '100%',
    height: verticalScale(0),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor:'blue',
    flexDirection: 'row',
  },
  bottomTab: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:20

  },
  tabIcon: {
    width: scale(25),
    height: scale(25),
    borderRadius: 50


  },
  tabIconBg: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

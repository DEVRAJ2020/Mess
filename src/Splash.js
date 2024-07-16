import { View, Text, ActivityIndicator,Image, ImageBackground } from 'react-native'
import React, { useEffect, useState, } from 'react'
import App from '../App';
import { Provider, useDispatch } from 'react-redux';
import STORE from './Store';
import { HEIGHT, WIDTH } from '../Home';
// import { Image } from 'react-native-svg';


export default function Splash() {
   const [page,setPage]=useState(0)
  useEffect(() => {
    setTimeout(() => {
      setPage(1)
    }, 200);
   
  },[]);

  const LoadingPage=()=>{
    return(
      <>
      <ImageBackground style={{height:HEIGHT,width:WIDTH,justifyContent:'center',alignItems:'center',zIndex:1}}
      source={require('./images/cook.jpg')}
      >
        <View style={{height:WIDTH,width:WIDTH,zIndex:2,marginBottom:200}}>
        <ActivityIndicator animatin={true} size={80}  color={'lightgreen'} />
        


        </View>
       <Image  style={{height:WIDTH,width:WIDTH,position:'absolute',top:200,}}
      source={require('./images/LOGO002.png')}
/> 
      </ImageBackground>
      </>
    )
  }
  return (
  <Provider store={STORE}>
    {page == 0 ? <LoadingPage/> : <App/> }
    
    
    
      
      

    </Provider>)
}
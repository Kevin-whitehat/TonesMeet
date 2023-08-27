import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Colors from '../constants/Colors'




const CustomDrawer = props => {


  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#1c0f24'}}>
        <ImageBackground
          source={require('../assets/drawer.png')}
          style={{padding: 20}}>
     
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
             
              marginBottom: 5,
            }}>
          Musicians Meet
          </Text>
       
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />  
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
  
     
      </View>
    </View>
  );
};


export default CustomDrawer;

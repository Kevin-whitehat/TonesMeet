import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
  StatusBar,
  SafeAreaView
} from 'react-native';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default class FlashScreen extends Component {
  render(){
  return(
    <View style={styles.container}>
    <SafeAreaView style={styles.droidSafeArea} />
    <ImageBackground style={{ flex: 1, resizeMode: 'cover', width: screenWidth, height: screenHeight }}
        source={require('../assets/bg3.png')}>
        <View style={{marginTop:RFValue(450),}}>
        <Text style={styles.flashText}>Musician meet</Text>
        <Text style={styles.flashText2}>An app where musicians share their talents and have fun </Text>
        <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('LoginScreen'); 
            }}
            style={{ alignSelf: 'center', marginTop: 20,marginRight:20, backgroundColor: '#ffffff',
    borderRadius: 10,height:50,width:250, borderRadius:30    }}>
            <Text style={{color:'black',fortSize:RFValue(25),alignSelf:'center',marginTop:15}}>Get Started</Text>
        </TouchableOpacity>
        </View>
    </ImageBackground >
    </View>
   )
  } 
} 

const styles=StyleSheet.create({
  container:{
    flex:1
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
   flashText: {
    color: 'white',
    fontSize: RFValue(35),
    padding:10,
    alignSelf:'center',
    textAlign:'center', 
  },
   flashText2: {
    color: 'white',
    fontSize: RFValue(15),
    padding:10,
    textAlign:'center',  
    
   
    
    
  },
 
})











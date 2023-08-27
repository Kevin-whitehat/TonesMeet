import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class LoginScreen extends Component {
  render() {
    return (
      <ImageBackground
        style={{ flex: 1, resizeMode: 'cover', width: '100%', height: '100%' }}
        source={require('../assets/bg.png')}>
        <View
          style={{
            flex: 1,
            marginTop: 100,
            backgroundColor: '#ffffffbb',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
           
          <Text
            style={{
              position: 'absolute',
              top: 50,
              alignSelf: 'center',
              fontSize: 30,
              //fontFamily: 'Georgia',
            }}>
            Enter new password
          </Text>

          <TextInput
            style={styles.textInput}
            placeholder="  Please Enter New Password"
            placeholderTextColor="black"
          />


          <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("LoginScreen")}}>
            <Text style={{ alignSelf: 'center', marginTop: 5 }}>Enter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.back} onPress={()=>{this.props.navigation.navigate("LoginScreen")}}>
            <Text style={{ alignSelf: 'center', marginTop: 5 }}>Go back</Text>
            </TouchableOpacity>
          
        </View>
        <Image
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            position: 'absolute',
            top: 65,
            alignSelf: 'center',
            borderColor: '#ffffff99',
            borderWidth: 7,
            padding: 2,
          }}
          source={require('../assets/snack-icon.png')}
        />
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  back:{
    width:100,
    height:30,
    marginTop:20,
  },
  textInput: {
    marginTop: 130,
    marginLeft: 20,
    width: 300,
    height: 40,
    borderWidth: 2,
    borderColor: '#00000077',
    borderRadius: 15,
  },
  textInput2: {
    marginTop: 20,
    marginLeft: 20,
    width: 300,
    height: 40,
    borderWidth: 2,
    borderColor: '#00000077',
    borderRadius: 15,
  },
  button: {
    width: 100,
    height: 30,
    marginTop: 30,
    marginLeft: 120,
    backgroundColor: '#00c4cc33',
    borderRadius: 10,
  },
});

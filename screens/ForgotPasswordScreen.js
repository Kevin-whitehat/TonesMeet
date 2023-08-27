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
import firebase from "firebase"
import { AntDesign } from '@expo/vector-icons'; 
export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
     
    };
  }

  emailSend = (email) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent!
        // ..
        alert("Password reset email sent! (Make sure to check your spam!)");
        this.props.navigation.navigate("LoginScreen")
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        alert(errorMessage)
      });
  };
  render() {
    return (
      <ImageBackground
        style={{ flex: 1, resizeMode: 'cover', width: '100%', height: '100%' }}
        source={require('../assets/guitar.jpg')}>
        <View style={{
            flex: 1,
            
            backgroundColor: '#000000aa'}}>
            <TouchableOpacity
            style={styles.back}
            onPress={() => {
              this.props.navigation.navigate('LoginScreen');
            }}>
            <AntDesign name="leftcircleo" size={30} color="white" /> 
          </TouchableOpacity> 
        <View
          style={{
            flex: 1,
            marginTop: 100,
            
          }}>
          <Text
            style={{
              position: 'absolute',
              top: 50,
              alignSelf: 'center',
              fontSize: 30,
              color:'white',
              //fontFamily: 'Georgia',
            }}>
            Forgot Password?
          </Text>

          <TextInput
            style={styles.textInput}
            placeholder="  Please Enter Email Address"
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({ email: text })}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.emailSend(this.state.email);
            }}>
            <Text style={{ alignSelf: 'center', marginTop: 5,color:'black' }}>Enter</Text> 
          </TouchableOpacity>
          
        </View>
        </View> 
        <Image
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            position: 'absolute',
            top: 65,
            alignSelf: 'center',
            
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
  textInput: {
    marginTop: 130,
    
    width: 250,
    height: 40,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 15,
    padding:10,
    alignSelf:'center'
  },
  textInput2: {
    marginTop: 20,
    marginLeft: 20,
    width: 300,
    height: 40,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
  },
  button: {
    width: 100,
    height: 30,
    marginTop: 30,
    marginLeft: 120,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  back: {
    width: 100,
    height: 30,
    marginTop: 40,
    marginLeft:10
  },
});

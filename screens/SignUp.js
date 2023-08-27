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
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      contact: '',
      userDescription:'',
      image:"../assets/profile.png"
    };
  }
  handleSignUp = (email, password, confirmPassword) => {
    if(/^[A-Z]/.test(this.state.email)){
      Alert.alert('Please use lower case in email');
    if (password !== confirmPassword) {
      Alert.alert('Passwords dont match');
      alert('Passwords dont match');
    }} else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          db.collection('users').add({
            email: this.state.email,
            name: this.state.name,
            contact: this.state.contact,
            image: this.state.image,
            userDescription: this.state.userDescription,
          });
          this.props.navigation.navigate('LoginScreen');
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          alert(errorMessage);
          // ..
        });
    }
  };
  render() {
    return (
      <ImageBackground
        style={{ flex: 1, resizeMode: 'cover', width: '100%', height: '100%' }}
        source={require('../assets/guitar.jpg')}>      
         <View style={{
            flex: 1,
            
            backgroundColor: '#000000aa'}}>  
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
              //fontFamily: 'Georgia',
              color:'white'
            }}>
            Sign Up
          </Text>

          <TextInput
            style={[styles.textInput, { marginTop: 100 }]}
            placeholder="  Please Enter Email Address"
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({ email: text })}
          />

          <TextInput
            style={styles.textInput}
            placeholder="  Please Enter Name"
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({ name: text })}
          />

          <TextInput
            style={styles.textInput}
            placeholder="  Please Enter contact"
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({ contact: text })} 
          />

          <TextInput
            style={styles.textInput}
            placeholder="  Please Enter Password"
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({ password: text })}
            secureTextEntry={true}
          />

          <TextInput
            style={styles.textInput}
            placeholder="  Please Re Enter Passsword "
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({ confirmPassword: text })}
            secureTextEntry={true}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.handleSignUp(
                this.state.email,
                this.state.password,
                this.state.confirmPassword
              );
            }}>
            <Text style={{ alignSelf: 'center', marginTop: 5}}>Enter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              this.props.navigation.navigate('LoginScreen');
            }}>
            <Text style={{ alignSelf: 'center', marginTop: 5,color:'white' }}>
              Already a member? Log in here
            </Text>
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
    marginTop: 30,
    alignSelf: 'center',
    width: 250,
    height: 40,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 30,
    padding:10,
    alignSelf:'center'
  },
  button: { 
    width: 100,
    height: 30,
    marginTop: 30,
    alignSelf:'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  back: {
    width: '80%',
    height: 30,
    marginTop: 20,
    alignSelf: 'center',
  },
}); 

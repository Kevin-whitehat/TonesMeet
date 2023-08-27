import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import firebase from 'firebase';
import { Entypo } from '@expo/vector-icons'; 

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      secureTextEntry: true,
    };
  }

  handleLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('DashBoardScreen');
      })
      .catch((error) => {
        Alert.alert(error.message);
        console.log(error.message);
      });
  };
  changeSecureText = ()=> {
    this.setState({secureTextEntry:!this.state.secureTextEntry})  
  }
  render() {
    return (
      <ImageBackground
        style={{ flex: 1, resizeMode: 'cover', width: '100%', height: '100%' }}
        source={require('../assets/guitar.jpg')}>
        <View
          style={{
            flex: 1,
            
            backgroundColor: '#000000aa',
          }}>
          <Text
            style={{
              position: 'absolute',
              top: 100,
              alignSelf: 'center',
              fontSize: 30,
              color:'white',  
              //fontFamily: 'Georgia',
            }}>
            Log In
          </Text>

          <TextInput
            style={styles.textInput}
            placeholder="  Please Enter Email Address"
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
          />
          <View style={{
            flexDirection:'row'
          }}>
          <TextInput
            style={styles.textInput2}
            placeholder="  Please Enter Passsword "
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({ password: text })}
            secureTextEntry={this.state.secureTextEntry}
            value={this.state.password}
          />
          <TouchableOpacity style={styles.eyeButton} onPress={this.changeSecureText}>  
          {this.state.secureTextEntry?<Entypo name="eye-with-line" size={24} color="white" />:<Entypo name="eye" size={24} color="white" />}
           </TouchableOpacity>
          </View>


          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ForgotPasswordScreen');
            }}
            style={{ alignSelf: 'flex-end', marginRight: 65, marginTop:5,}}>
            <Text style={{color:'white'}}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.handleLogin(this.state.email, this.state.password);
            }}>
            <Text style={{ alignSelf: 'center', marginTop: 5 }}>Enter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('SignUpScreen');
            }}
            style={{ alignSelf: 'center', marginTop: 20 }}>
            <Text style={{color:'white'}}>Dont have an account? Sign up here</Text>
          </TouchableOpacity>
        </View>
        <Image  
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            position: 'absolute',
            top: 30,
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
    marginTop: 180,
    marginLeft: 20,
    width: 250, 
    height: 40,
    borderWidth: 2,
    borderColor: '#ffffff77',
    borderRadius: 15,
    color:'white',
    padding:10,
    alignSelf:'center'
  },
  textInput2: {
    marginTop: 30,
    marginLeft: 65,
    width: 250,
    height: 40,
    borderWidth: 2,
    borderColor: '#ffffff77',
    borderRadius: 15,   
    color:'white',
    padding:10,
    alignSelf:'center'
  },
  button: {
    width: 100,
    height: 30,
    marginTop: 50,  
    alignSelf:'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  eyeButton:{
    height: 30,
    width:30,
    marginTop:36, 
    marginLeft:10
  }
});

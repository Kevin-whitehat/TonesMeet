import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import * as ImagePicker from 'expo-image-picker';
export default class Customize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: firebase.auth().currentUser.email,
      name: '',
      contact: '',
      image: '..\assets\profile.png',
      docId: '',
      userDescription: '',
    };
  }
  componentDidMount = () => {
    db.collection('users')
      .where('email', '==', this.state.email)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          var user = doc.data();
          this.setState({
            name: user.name,
            contact: user.contact,
            image: user.image,
            docId: doc.id,
            userDescription: user.userDescription
          });
        });
      });
  };

  pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      console.log(result.uri);
      this.uploadImage(result.uri);
    }
  };

  uploadImage = async (imageUri) => {
    var blobOb = await fetch(imageUri);
    var blob = await blobOb.blob();
    var storageRef = firebase
      .storage()
      .ref('users/' + this.state.email)
      .put(blob)
      .then(() => {
        this.fetchImage();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  fetchImage = async () => {
    await firebase
      .storage()
      .ref('users/' + this.state.email)
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  render() {
    return (
      <ImageBackground
        style={{ flex: 1, resizeMode: 'cover', width: '100%', height: '100%' }}
        source={require('../assets/also_good.jpg')}> 
        <SafeAreaView style={styles.droidSafeArea} /> 
        <View style={styles.container}>
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/snack-icon.png')}
                style={styles.iconImage}></Image>
            </View>
           
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              justifyContent:'center',marginLeft:20,   
              opacity: 1,
              padding: 10,
            }}> 
             
            <Avatar
              rounded
              source={{ uri: this.state.image }}
              size={200}
              containerStyle={styles.profile}
              onPress={() => {
                this.pickImage();
              }}
            />
          </View>
        </View>
         <TouchableOpacity
            style={styles.update}
            onPress={async () => {
              try {
                await db.collection('users').doc(this.state.docId).update({
                  name: this.state.name,
                  contact: this.state.contact,
                  image: this.state.image,
                  userDescription: this.state.userDescription
                });
              } catch (e) {
                console.log(e);
              }
            }}>
            <Text style={{ alignSelf: 'center', marginTop: 5,color:'black' }}>Update</Text> 
          </TouchableOpacity>
        <View style={styles.cardContainer}>
          <TextInput style={styles.textInput}
            onChangeText={(text) => this.setState({name: text })}
            placeholder=" Name "
            placeholderTextColor="white">
            {this.state.name}
          </TextInput>
          <TextInput style={styles.textInput2}
            onChangeText={(text) => this.setState({contact: text })}
            placeholder=" Mobile Number "
            placeholderTextColor="white">
            {this.state.contact}
          </TextInput>
          <TextInput
            style={styles.textInput2}
            onChangeText={(text) => this.setState({userDescription: text })}
            placeholder=" Description "
            placeholderTextColor="white">
            {this.state.userDescription}
          </TextInput>
         
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 0.4
  },
   textInput: {
    marginTop: 20,
    marginLeft: 85,
    width: 200,
    height: 40,
    borderWidth: 2,
    borderColor: '#ffffff',
    color:'white',
    borderRadius: 15,
    padding:10
  },
   textInput2: {
    marginTop: 10,
    marginLeft: 85,
    width: 200,
    height: 40,
    borderWidth: 2,
    borderColor: '#ffffff', 
    color:'white',   
    borderRadius: 15,
    padding:10
  },
  cardContainer: {
    flex: 0.6,
    marginTop: 50,
    backgroundColor: '#00000077',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  profile: {
    marginTop: 60,

    marginRight: 20,
  },
 
  connect: {
    width: 100,
    height: 30,

    marginRight: 20,
    marginTop: 60,
    alignSelf: 'center',
    backgroundColor: '#7236e599',
    borderRadius: 10,
  },
   update: {
    width: 100,
    height: 30,

    marginRight: 20,
    marginTop: 160,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
   appTitle: {
         

    backgroundColor: '#000000bb',  
  },
  appIcon: {
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    marginTop:5,
    marginBottom:5,
    width: 40,
    height: 40,
    resizeMode: 'contain',
    alignSelf:"center",
  },


});


import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';

import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';

import db from '../config';

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: firebase.auth().currentUser.email,
      name: '',
      docId: '',
      caption: '',
      image: '',
      title: '',
      dropDownHeight:40,
      postType:''
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
            docId: doc.id,
            image: user.image,
          });
        });
      });
  };
  async addPost() {
    if (this.state.caption && this.state.title) {
      db.collection('posts').add({
        userId: this.state.email,
        name: this.state.name,
        title: this.state.title,
        details: this.state.caption,
        image: this.state.image,
        postId: Math.random().toString(36).slice(2),
        date: new Date().toDateString(),
        postType:this.state.postType,
        likes:0,
      });
      alert("Posted succesfully")
      this.props.navigation.navigate("Feed")
    } else {
      Alert.alert(
        'Error',
        'All fields are required!',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  }

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

          <View style={styles.fieldsContainer}>
            <ScrollView>
              <Text
                style={{ alignSelf: 'center', fontSize: 30, marginTop: 40 }}>
                New Post
              </Text>
              <View style={{ height: RFValue(this.state.dropDownHeight) }}>
                            <DropDownPicker
                                items={[
                                    { label: "Create Band", value: "createBand" },
                                    { label: "New Upload", value: "newUpload" },
                                    { label: "Jamming Session", value: "jammingSession" },
                                    { label: "Generic", value: "generic" },
                                    
                                ]}
                               
                                containerStyle={{
                                    height: 60,
                                    borderRadius: 40,
                                    marginBottom: 30
                                }}
                                onOpen={() => {
                                    this.setState({ dropdownHeight: 170 });
                                }}
                                onClose={() => {
                                    this.setState({ dropdownHeight: 40 });
                                }}
                                style={{ backgroundColor: "transparent",borderColor:'blackl',marginTop:10 }}
                                itemStyle={{
                                    justifyContent: "flex-start"
                                }}
                                dropDownStyle={{ backgroundColor: "#eee"  }}
                                labelStyle={{
                                    color:"black"
                                }}
                                arrowStyle={{
                                    color:"black"
                                }}
                                onChangeItem={item =>
                                    this.setState({
                                        postType: item.value
                                    })
                                }
                            />
                        </View>
              <TextInput
                style={styles.inputFont}
                onChangeText={(title) => this.setState({ title })}
                placeholder={'Enter Post Title'}
                placeholderTextColor="black"
              />

              <TextInput
                style={styles.inputFont2}
                onChangeText={(caption) => this.setState({ caption })}
                placeholder={'Please Enter Post Details'}
                placeholderTextColor="black"
              />

              <TouchableOpacity
                style={styles.submit}
                onPress={() => this.addPost()}>
                <Text style={{ alignSelf: 'center', marginTop: 5 ,color:'black'}}>
                  Submit
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      </ImageBackground>
    );
  }
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

   appTitle: {
    flex:0.07,

    backgroundColor: '#000000bb', 
  },
  appIcon: {
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    marginTop:5,
    width: 40,
    height: 40,
    resizeMode: 'contain',
    alignSelf:"center",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  submit: {
    width: 100,
    height: 30,
    alignSelf: 'center',
    marginTop: 40,

    backgroundColor: '#fff',
    borderRadius: 10,
  },

  fieldsContainer: {
    flex: 0.85,
    marginLeft: 20,
    marginRight: 20,
  },

  inputFont: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5, 
    padding: 10,
    color: 'black', 
    marginTop: 40,
    
    
  },
  inputFont2: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5, 
    padding: 10,
    color: 'black', 
    marginTop: 20,
    
    
  },
});


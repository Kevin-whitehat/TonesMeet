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
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import * as ImagePicker from 'expo-image-picker';
export default class PosterProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: firebase.auth().currentUser.email,
      name: '',
      contact: '',
      image: '',
      docId: '',
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
        source={require('../assets/bg2.png')}>
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
              marginLeft: 20,
              opacity: 1,
              padding: 10,
            }}>
            <TouchableOpacity style={styles.connect}>
              <Text style={{ alignSelf: 'center', marginTop: 5 }}>
                Connect
              </Text>
            </TouchableOpacity>
            <Image
              source={require('../assets/pp.jpg')}
              style={styles.profile}
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
              });
            } catch (e) {
              console.log(e);
            }
          }}>
          <Text style={{ alignSelf: 'center', marginTop: 5 }}>Update</Text>
        </TouchableOpacity>
        <View style={styles.cardContainer}>
          <Text style={{ alignSelf: 'center', fontSize: 30, marginTop: 20 }}>
            {this.state.name}
          </Text>
          <Text style={{ alignSelf: 'center', fontSize: 15, marginTop: 1 }}>
            {this.state.contact}
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              margin: 35,
              fontSize: 20,
              marginTop: 15,
            }}>
            User description
            ndsjgndjsgndjisnfijudsnfjdsnbgjdnbsjgibdsjgbdjhsbfjdesbidjbfgijrbgjirbegjbfsjbg
            fjsbgjhdsbgdjsbgdjsbgjsbgjfsbgjdfsb sbgjdsbgjdbsgjsbgjsbgjks
          </Text>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 0.4,
  },
  cardContainer: {
    flex: 0.6,
    marginTop: 50,
    backgroundColor: '#a4f5f077',
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  profile: {
    marginTop: 60,
    borderRadius: 100,
    width: 200,
    height: 200,
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
    marginTop: 200,
    alignSelf: 'center',
    backgroundColor: '#7236e599',
    borderRadius: 10,
  },
  appTitle: {
    backgroundColor: '#a2b4f599',
  },
  appIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    marginTop: 5,
    marginBottom: 5,
    width: 40,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

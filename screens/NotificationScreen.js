import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image, 
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import PostCard from './GenericCard';
import { FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase';            
import db from '../config';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      userId: firebase.auth().currentUser.email, 
    };
  }
  renderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.cardContainer}>
        <Text style={styles.captionText}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  fetchNotifications = () => {
    db.collection('notifications')
      .where('to', '==', this.state.userId)
      .onSnapshot((snapshot) => {
        var allNot = [];
        snapshot.docs.map((doc) => {
          var not = doc.data();
          not['notDocId'] = doc.id;
          allNot.push(not);
        });
        this.setState({ notifications: allNot });
      });
  };

  componentDidMount() {
    this.fetchNotifications();
  }
  keyExtractor = (item, index) => index.toString();
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
          <View style={{marginBottom:130}}>
          <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.notifications}
              renderItem={this.renderItem}
              
            />
          </View>
          </View>
           
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  cardContainer: {
    margin:13,
    marginTop:20,
    backgroundColor: '#fff', 
    borderRadius: RFValue(20), 
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
    width: 40,
    height: 40,
    resizeMode: 'contain',
    alignSelf:"center",
  },
  captionText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  likeButton: {
    marginTop: 20,
    marginBottom: 40,
    width: RFValue(200),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: RFValue(30),
  },
});

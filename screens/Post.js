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
  ImageBackground,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';
 
import db from '../config';
 
export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTitle: this.props.route.params.details['title'],
      postDetails: this.props.route.params.details['details'],
      userName: this.props.route.params.details['name'],
      postDate: this.props.route.params.details['date'],
      userImage: this.props.route.params.details['image'],
      postUserId: this.props.route.params.details['userId'],
      userId: firebase.auth().currentUser.email, 
      likes:'',
      post_likes:this.props.route.params.details['likes'],  
      doc_id:this.props.route.params.details['postId']
    };
  }
  updateLike() { 
    db.collection('posts')
      .doc(this.state.doc_id)
      .update({
        likes: this.state.post_likes + 1,
      });
  }
  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate('Home');
    } else {
      return (
       <View
        style={{ flex: 1, resizeMode: 'cover', width: '100%', height: '100%',backgroundColor:'black' }}
        > 
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.container}>
            <View style={styles.appTitle}>
              <View style={styles.appIcon}>
                <Image
                  source={require('../assets/snack-icon.png')}
                  style={styles.iconImage}></Image>
              </View>
            </View>
            <View style={styles.postContainer}>
              <ScrollView style={styles.postCard}>
                <View style={styles.authorContainer}>
                  <View style={styles.authorImageContainer}>
                    <Image
                      source={{ uri: this.state.userImage }}
                      style={styles.profileImage}></Image>
                  </View>
                  <View style={styles.authorNameContainer}>
                    <Text style={styles.authorNameText}>
                      {this.state.userName}
                    </Text>
                  </View>
                </View> 
                <View style={styles.captionContainer}>
                  <Text style={styles.captionText}>{this.state.postTitle}</Text>
                </View>
                <View style={styles.captionContainer}>
                  <Text style={styles.captionText}>
                    {this.state.postDetails}
                  </Text>
                </View>
                <View style={styles.captionContainer}>
                  <Text style={styles.captionText}>{this.state.postDate}</Text>
                </View>
                <View style={styles.actionContainer}>
                  <TouchableOpacity style={styles.likeButton} onPress={() => {this.updateLike()}}> 
                    <Ionicons
                      name={'heart'}
                      size={RFValue(30)}
                      color={'white'}
                    />
                    <Text style={styles.likeText}>{this.state.likes}</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
          </View>
            
      );
    }
  }   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black'
  },

  appTitle: {
    flex: 0.07,

    backgroundColor: '#000000bb',
  },
  appIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    marginTop: 5,
    width: 40,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  postContainer: {
    flex: 1,
  },
  postCard: {
    margin: RFValue(20),
    backgroundColor: '#fff',
    borderRadius: RFValue(20),
  },
 
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: RFValue(10),
  },
  likeButton: {
    marginTop: 150,
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(30),
  },
  likeText: {
    color: 'black',
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  authorContainer: {
    height: RFPercentage(10),
    padding: RFValue(10),
    flexDirection: 'row',
  },
  authorImageContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,

    borderRadius: 40,
  },
  authorNameContainer: {
    flex: 0.85,
    marginLeft: 10,
    justifyContent: 'center',
  },
  authorNameText: {
    color: 'black',
    fontSize: RFValue(30),
  },

  captionContainer: {
    padding: RFValue(10),
  },
  captionText: {
    fontSize: 20,
    color: 'black',
    paddingTop: RFValue(10),
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
});

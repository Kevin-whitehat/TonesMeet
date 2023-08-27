import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import db from '../config';
export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post_data: this.props.post,
      userId: firebase.auth().currentUser.email,
      post_likes:this.props.post.likes,
      isLiked:false,
    };
    console.log(this.props.post);
    console.log(this.state.userId);
  }
  
  fetchPosts = () => {
    db.collection('posts').onSnapshot((snapshot) => {
      var allPosts = [];

      snapshot.docs.map((doc) => {
        var post = doc.data();
        console.log("Posts Data"+doc.data());
        post['postDocId'] = doc.id;
        allPosts.push(post);
      });
      this.setState({ posts: allPosts });
    });
  };
  sendNotification = () => {
    var message =
      this.state.userId +
      ' finds your post ' +
      this.props.post.title +
      ' interesting';
    db.collection('notifications').add({
      to: this.props.post.userId,
      from: this.state.userId,
      date: new Date().toDateString(),
      message: message,
      status: 'unread',
    });
    alert('Notification sent!');
  };

  updateLike() {
    db.collection('posts')
      .doc(this.state.post_data.postDocId)
      .update({
        likes: this.state.post_data.likes + 1,
      });
    this.setState({
      post_likes: this.state.post_likes + 1,
      isLiked:true,
  })

    this.sendNotification();
    this.fetchPosts();
  }
  render() {
    let post = this.state.post_data;
    return (
      <View
        style={styles.container}
        >
        <View style={styles.cardContainer}>
          <View style={styles.authorContainer}>
            <View style={styles.authorImageContainer}>
              <Image
                source={{ uri: post.image }}
                style={styles.profileImage}></Image>
            </View>

            <View style={styles.authorNameContainer}>
              <Text style={styles.authorNameText}>{post.name}</Text>
            </View>
          </View>
          <Text style={{ marginLeft: 55,color:'white' }}>Band Invite
          </Text> 
          <View style={styles.captionContainer}>
            <Text style={styles.captionText}>Title: {post.title}</Text>
          </View>
          <View><Text style={{fontSize:RFValue(10),color:'white',marginLeft:55,marginTop:10}}>Details: {post.details}</Text></View>

          <View style={styles.captionContainer}>
            <Text style={styles.dateText}>{post.date}</Text>
          </View>

          {this.state.userId !== post.userId ? (
            <View style={{ flex: 1, width: '100%' }}>
              <View style={styles.actionContainer}>
              <TouchableOpacity style={styles.likeButton} onPress={() => {
                    this.state.isLiked?this.updateLike():alert('Already Liked');
                  }}>
                  <AntDesign
                      name={'like1'}
                      size={RFValue(20)}
                      color={'black'}
                    />
                  <Text style={styles.likeText}>{this.state.post_likes}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: '#000000dd',  
    borderRadius: RFValue(20),
    padding: RFValue(20),
  },

  authorContainer: {
    flex: 0.1,
    flexDirection: 'row',
  },
  profileImage: {
    width: 50,
    height: 50,

    borderRadius: RFValue(100),
  },
  authorImageContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  authorNameContainer: {
    flex: 0.85,
    marginLeft: 10,
    justifyContent: 'center',
  },
  authorNameText: {
    color: 'white',
    fontSize: RFValue(20),
  },

  captionContainer: {
  },
  captionText: {
    marginTop: 10,
    fontSize: RFValue(20),
    color: 'white',
    paddingTop: RFValue(10),
    marginLeft:55,
  },
  dateText: {
    marginTop: 10,
    fontSize: 15,
    color: 'white',
    paddingTop: RFValue(10),
    alignSelf:'flex-end',
  },

  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
  },
  likeButton: {
    marginTop: 10,
    width: RFValue(70),
    height: RFValue(30),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: RFValue(30),
  },
  interestButton: {
    marginTop: 20,
    marginLeft: 20,
    width: RFValue(60),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  likeText: {
    color: 'black',
    fontSize: RFValue(15),
    marginLeft: RFValue(5),
  },
});

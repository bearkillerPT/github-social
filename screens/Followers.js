import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback} from 'react-native';
import { not } from 'react-native-reanimated';

export default  function followers({navigation}) {
    const [followers, setFollowers] = useState([]);
    const [loadS, setLoadS] = useState("Loading");
    const user = navigation.state.params.user
    useEffect(() => {
      loadData().catch(console.log)
    },[]);
    if(loadS === "NotFound") {
      return(
        <View style={{backgroundColor:'white'}}>
            <Text style={styles.username}>User not Found!</Text>
        </View>
    );
    }
    else if(loadS === "NoFriends") {
      return(
        <View style={{backgroundColor:'white'}}>
            <Text style={styles.username}>User has no friends! :(</Text>
        </View>
      )
    }
    else if(loadS === "Loading") {
      return(
        <ActivityIndicator size="large" color="red"/>
      )
    }
    return (
      <View style={{flex: 1}}>
        
        <ScrollView style={styles.container}>{
          followers.map((follower) => {
            return(
                <TouchableWithoutFeedback  key={follower.id}  onPress={() => navigation.push('followers', {user : follower.login})}>
                  <View style={{flexDirection: 'row', backgroundColor: 'ghostwhite'}}>
                  <Image source={{uri: follower.avatar_url}} style={styles.image}/>
                  <View style={{flex : 1, flexDirection : 'column', justifyContent : 'flex-start', alignItems:'center'}}>
                    <Text style={styles.username}>{follower.login}</Text>
                    <Text style={styles.bio}>{follower.bio}</Text>
                  </View>
                  </View>
                </TouchableWithoutFeedback>
            )
          })
        }</ScrollView>
      </View>
    );
  
    async function loadData() {
      const data = await fetch("https://api.github.com/users/" + user + "/followers").then(res=>res.json()).catch(function(){
        throw error;
      });
      if("message" in data) {
          setLoadS("NotFound");
      }
      else if(data.length == 0) {
        setLoadS("NoFriends");
      }
      else {
        for(let follower of data) {
          follower.bio = await fetch(follower.url).then(data => data.json()).then(data=>data.bio)
        }
        setFollowers(data);
        setLoadS("Done");
      }
    }
  }
  
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
    },
    username: {
      fontSize: 20,
      textAlign: 'center',
    },
    bio : {
      justifyContent:'flex-start',
    },
    image: {
      width: 100,
      height: 100,
    }
  });
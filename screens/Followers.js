import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback} from 'react-native';

export default  function followers(screenProps) {
    const [followers, setFollowers] = useState([]);
    const user = screenProps.navigation.state.params.user
    useEffect(() => {
      loadData()
    },[]);
    return (
      <View style={{flex: 1}}>
        
        <ScrollView style={styles.container}>{
          followers.map((follower) => {
            return(
                <TouchableWithoutFeedback  key={follower.id}  onPress={() => screenProps.navigation.push('Home', {user : follower.login})}>
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
      const data = await fetch("https://api.github.com/users/" + user + "/followers")
            .then(res=>res.json())
      for(let follower of data) {
        follower.bio = await fetch(follower.url).then(data => data.json()).then(data=>data.bio)
      }
      setFollowers(data)
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
import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';

export default function search({navigation}) {
    const [user, setUser] = useState('');
    return(
    <View style={styles.container}>
        <Text>Search for a user: </Text>
        <View>
            <TextInput style={styles.search} onChangeText={setUser}/>
            <Button onPress={() => navigation.push('followers', {user})} title='Search!'/>
        </View>
    </View>);
}

const styles = StyleSheet.create({
    search: {
        borderColor: 'black',
        borderWidth: 1,
        width: 200,
        height: 30
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },

})
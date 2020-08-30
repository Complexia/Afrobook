import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ListTitles = () => {

    let myLoop = [];
    for(let i = 0; i < 10; i++) {
        myLoop.push(
    
            <Text key={i}>Book {i + 1}</Text>
        );
  
    }
    return myLoop;
}

const TitlesScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Book titles here</Text>
            {ListTitles()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }
})

export default TitlesScreen;
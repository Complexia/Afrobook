import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage } from "react-native";


const displayData = async() => {
    try{
        let someBook = await AsyncStorage.getItem("provident vel ut sit ratione est");
        let parsed = JSON.parse(someBook);
        alert(parsed.title);
    }
    catch(error){
        alert(error);
    }
}

const LibraryScreen = () => {

    return (
        <View style={styles.container}>
            <Text>Library books here</Text>

            <Button 
                style={styles.button} 
                title="Display Data"
                onPress={() => displayData()}
            >

            </Button>
        </View>
    );
}

export default LibraryScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
        
    }
})
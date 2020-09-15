import React from 'react';
import { View, Text, StyleSheet, Button } from "react-native";




const DescriptionScreen = ({ route, navigation }) => {

    const { title } = route.params;
    const { body } = route.params;

    return (
        <View style={styles.container}>
            <Text>Description of the book</Text>
            <Text>{title}</Text>
            <Text>{body}</Text>
            <Button title="Read book" onPress={() => console.log("Pressed")}>
                
            </Button>
        </View>
    );
}

export default DescriptionScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "2%"
        
    }
})
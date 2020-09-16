import React from 'react';
import { View, Text, StyleSheet, Button } from "react-native";




const DescriptionScreen = ({ route, navigation }) => {

    const { title } = route.params;
    const { content } = route.params;
    const { id } = route.params;
    
    return (
        <View style={styles.container}>
            <Text>Description of the book</Text>
            <Text>{title}</Text>
            
            <Button title="Read book" onPress={() => navigation.navigate("Reader",
            {   
                id: id,
                content: content
            })}>
                
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
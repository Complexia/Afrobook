import React from 'react';
import { View, Text, StyleSheet } from "react-native";

const LibraryScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Library books here</Text>
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
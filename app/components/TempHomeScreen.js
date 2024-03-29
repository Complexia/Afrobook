import React, { useEffect, useState } from 'react';
import { Dimensions, Image, SafeAreaView, View, Text, StyleSheet, Button, ActivityIndicator, AsyncStorage, TouchableOpacity } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const TempHomeScreen = ({ navigation }) => {
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                
                <Image 
                style={styles.logo} source={require("../assets/transparentLogo.png")}
                resizeMode="contain" />
                <Text style={styles.sloganText}>Write your own story</Text>
                
            </ScrollView>

            <AppButton title="Library" onPress={() => navigation.navigate("Home")} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    titleText: {
        fontWeight: "bold",
        fontSize: 40,
        color: "#FFFFFF",
        paddingBottom: 10,
        alignSelf: "center"
        
    },
    sloganText: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#FFFFFF",
        textTransform: "uppercase",
        fontStyle: "italic",
        paddingBottom: 10,
        paddingTop: 10
    
    },
    borderLine: {
        borderBottomColor: "#FFFFFF",
        borderBottomWidth: 1,
        padding: 10,
        paddingBottom: 10,
        marginBottom: 20
    },
    descriptionText: {
        color: "#C0C0C0",
        fontSize: 15
    },
    disclaimerText: {
        color: "#C0C0C0",
        fontSize: 15
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "black"
        
    },

    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#ee5535",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 10
   
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    logo: {
        width: Dimensions.get('screen').width - 30,
        height: 50
    }
    
})
export default TempHomeScreen;
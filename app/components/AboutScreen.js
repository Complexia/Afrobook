import React, { useEffect, useState } from 'react';
import { Dimensions, Image, SafeAreaView, View, Text, StyleSheet, Button, ActivityIndicator, AsyncStorage, TouchableOpacity } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const AboutScreen = ({ navigation}) => {
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.titleText}>About AfroStory</Text>
                <View style={styles.borderLine}></View>
                <Image 
                style={styles.logo} source={require("../assets/transparentLogo.png")}
                resizeMode="contain" />
                
                <Text style={styles.descriptionText}>
                    We are inspired to put a billion books in African households where there were none or few before, and 
                    a small black author focused library in every home. 
                    We are an African business. We are an Ethical business. We are launching our first product that will 
                    change millions of lives, providing a unique set of literature with easy access to African history, 
                    heritage and stories to inspire, educate and entertain us all. This is important now more than ever 
                    with the number of people spending large amounts of time indoors during COVID-19 with little or no 
                    access to literature. Our high volume, low price business model, with capped profits, marketing focus, 
                    and prices that only fall with time, is also a big part of our values and what we believe in.
                    We treat all our staff that helped establish the business (all shareholders) with kindness and respect.
                    ave caps on our profits in order to transition into a non-profit organization as soon as we can.
                </Text>
                <View style={styles.borderLine}></View>
                <Text style={styles.sloganText}>Write your own story</Text>
                <Text style={styles.disclaimerText}>
                    DISCLAIMER: This is to our knowledge (and following our own desktop research) a 
                    public domain book and thus we are free to distribute it in this form and format. 
                    Please direct any queries to us at www.afrostory.org and we will attend to them as 
                    quickly as we can. Sincerely, Team AfroStory (: Let's get Africa reading more 
                    together and as one! The contents are free to enjoy. The lists of literature, 
                    sub-lists of literature, and App itself including design, function and concept 
                    are copyrighted Intellectual Property owned by: 
                    AfroStory (Pty) Ltd. 2020. Registered in South Africa. All rights reserved.

                </Text>
            </ScrollView>

            <AppButton title="Library" onPress={() => navigation.navigate("Home")} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    titleText: {
        fontWeight: "bold",
        fontSize: 40,
        color: "#FFFFFF"
        
    },
    sloganText: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#FFFFFF",
        textTransform: "uppercase",
        fontStyle: "italic"
    
    },
    borderLine: {
        borderBottomColor: "#FFFFFF",
        borderBottomWidth: 1,
        padding: 10,
        marginBottom: 10
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
export default AboutScreen;
import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

const image = { uri: "https://assets.entrepreneur.com/content/3x2/2000/20190102161219-GettyImages-904000456.jpeg" };

const WelcomeScreen = ({ navigation }) => {
    return (
        <ImageBackground 
            style={styles.background} 
            source={image}>
            
            <Image style={styles.logo} source={require("../assets/logo-red.png")} />

            <TouchableOpacity 
                style={styles.enterButton} 
                onPress={() => navigation.navigate('Home')}>

                <View style={styles.enterButton}>
                    <Text style={styles.enterButtonText}>Afrobook</Text> 
                </View>
            </TouchableOpacity>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"

    },
    enterButton: {
        width: "100%",
        height: 70,
        backgroundColor: "goldenrod",
        alignItems: "center"
    },
    logo: {
       width: 100,
       height: 100,
       position: "absolute",
       top: 80 
    },
    enterButtonText: {
        fontSize: 30,
        fontWeight: "bold",
        fontStyle: "normal",
        top: 10
    }
})

export default WelcomeScreen;
import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

const image = { uri: "https://assets.entrepreneur.com/content/3x2/2000/20190102161219-GettyImages-904000456.jpeg" };

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const WelcomeScreen = ({ navigation }) => {
    return (
        <ImageBackground 
            style={styles.background} 
            source={require("../assets/AfroStory_Stacked_Purple_R.jpg")}>
            
            {/* <Image style={styles.logo} source={require("../assets/logo-red.png")} /> */}
            <View style={styles.screenContainer}>

                <AppButton title="Login" onPress={() => navigation.navigate('Home')} />
                <AppButton title="Register" onPress={() => navigation.navigate('Home')} />
            </View>
            {/* <TouchableOpacity 
                style={styles.enterButton} 
                onPress={() => navigation.navigate('Home')}>

                <View>
                    <Text style={styles.enterButtonText}>Afrostory</Text> 
                </View>
            </TouchableOpacity> */}

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
    
    enterButtonText: {
        fontSize: 30,
        fontWeight: "bold",
        fontStyle: "normal",
        top: 10
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "goldenrod",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        margin: 20,
        
        
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    screenContainer: {
        flex: 1,
        justifyContent: "flex-end",
        padding: 16,
        alignSelf: "stretch"

    },
})

export default WelcomeScreen;
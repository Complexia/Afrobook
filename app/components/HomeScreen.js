import React from 'react';
import { SafeAreaView, Image, ImageBackground, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';



const libraryBooksImage = require("../assets/libraryBooks.png");
const newBooksImage = require("../assets/newBooks.jpeg");


const returnScreen = (navigation) => {

    return (

        <View style={styles.enterButton}>

            <TouchableOpacity 
                    style={styles.enterButton} 
                    onPress={() => navigation.navigate('Library')}
            >

                <ImageBackground 
                    source={libraryBooksImage}
                    style={styles.background}
                    imageStyle={{ resizeMode: 'stretch' }}

                >
                    
                </ImageBackground>

            </TouchableOpacity>

            <TouchableOpacity 
                    style={styles.enterButton} 
                    onPress={() => navigation.navigate('Titles')}
            >

                <ImageBackground 
                    source={newBooksImage}
                    style={styles.background}
                    imageStyle={{ resizeMode: 'stretch' }}

                >
                    
                </ImageBackground>

            </TouchableOpacity>

        </View>

        
            
            
                
    
                    
    
    );
}







const HomeScreen = ({ navigation }) => {


    return (
   
        returnScreen(navigation)
        
    );
}

const styles = StyleSheet.create({
    
    background: {
        width: "100%",
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        

    },
    enterButton: {
        width: "100%",
        flex: 1,
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

export default HomeScreen;
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
const HomeScreen = ({ navigation }) => {
    return (
        
        <View style={styles.container}>

            <View style={styles.topContent}>
               <Text>Image goes here</Text> 
            </View>

            <View style={styles.midContent}>

                <View style={styles.buttons}>

                    <Button                        
                        title="Browse books" 
                        onPress={() => navigation.navigate("Titles")} />

                </View>
                <View style={styles.buttons}>

                    <Button 
                        title="View library" 
                        onPress={() => navigation.navigate("FlatListScreen")} />
                </View>
            </View>

            <View style={styles.bottomContent}>
                <Text>Random promo titles go here</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {             
        flex: 1
    },
    topContent: {
        flex: 1,
        backgroundColor: "dodgerblue",
        justifyContent: "center",
        alignItems: "center"

        
    },
    midContent: {
        flex: 1,
        backgroundColor: "goldenrod",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        
    },
    bottomContent: {
        flex: 1,
        backgroundColor: "tomato",
        justifyContent: "center",
        alignItems: "center"
    },
    buttons: {
        flex: 0.3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        

    }


})

export default HomeScreen;
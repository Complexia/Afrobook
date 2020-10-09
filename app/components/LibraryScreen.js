import React from 'react';
import {TouchableOpacity, FlatList, View, Text, StyleSheet, AsyncStorage, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

let titlesArr = [];


function assignTitles(title, id) {
    

    titlesArr.push (
        {
            id: id,
            title: title,
        }
    )
    
}
const displayData = (navigation) => {

    
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    
    async function getData() {
        await getDataFromStorage();   
    }
    
    useEffect(() => {
        getData()
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
    
    
    
    //console.log("Array length", titlesArr.length);
    return (

        <SafeAreaView style={styles.container}>
            
            
                
                {titlesArr.length > 0 && !isLoading ? (
                    renderFlatList(titlesArr, navigation)
                )
                :
                (
                    <View  style={styles.emptyContainer}>

                        <Text>Wow, such empty. Click New Books to browse new books</Text>
                        <AppButton title="New books" onPress={() => navigation.navigate('Titles')} />
                    </View>
                )}
            
            
        </SafeAreaView>
    )
}

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const renderFlatList = (data, navigation) => {
    return (
        <SafeAreaView>
            {data.length == 0 ? (
                <View  style={styles.emptyContainer}>

                    <Text>Wow, such empty. Click New Books to browse new books</Text>
                    <AppButton title="New books" onPress={() => navigation.navigate('Titles')} />
                </View>
            )
            :
            (

                <FlatList
                    data={data}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => (
                        
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('DescriptionAsync',
                        {
                            id: item.id,
                            title: item.title,
                            
                        } 
                        )}>

                            <Text style={styles.text}>{item.title}</Text>
                        </TouchableWithoutFeedback>
                    )}
                />
            )}
        </SafeAreaView>
    );
}


const getDataFromStorage = async() => {
    try {
        let newKeys = [];
        const keys = await AsyncStorage.getAllKeys();
        
        //every 12th value in the DB is id
        for(let i=0;i<keys.length;i++) {
           if (i % 12 == 0) {
               newKeys.push(keys[i]);
           }
        }
        
        
        const result = await AsyncStorage.multiGet(newKeys);
        titlesArr = [];
        for(let i=0;i<newKeys.length;i++) {
            let id = newKeys[i];
            let titleAsync = await AsyncStorage.getItem(id + "title");
            let title = JSON.parse(titleAsync);
            
            assignTitles(title, id);
        }
        
      
    }
    catch(error) {
        alert(error);
    }
}

const LibraryScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            
            {displayData(navigation)}
            
        </View>
    );
}

export default LibraryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "5%",
        bottom: 25
        
    },
    text: {
        fontWeight: "bold",
        fontSize: 20,
        padding: "2%"

    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
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
})
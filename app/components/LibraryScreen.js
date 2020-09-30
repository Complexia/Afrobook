import React from 'react';
import { FlatList, View, Text, StyleSheet, AsyncStorage, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

let titlesArr = [];


function assignTitles(title, id, checker) {
    

    titlesArr.push (
        {
            id: id,
            title: title,
        }
    )
    
}
const displayData = (navigation) => {

    const [isLoading, setLoading] = useState(true);
    
    async function getData() {
        await getDataFromStorage();
    }
    useEffect(() => {
        getData()
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
    
    
    
    console.log("Array length", titlesArr.length);
    return (

        <SafeAreaView>
            
            {isLoading ? <ActivityIndicator /> : (

                titlesArr.length > 0 ? (
                    renderFlatList(titlesArr, navigation)
                )
                :
                (
                    <Text>Looks like your library is empty. Click Brows Titles to browse new books</Text>
                )
            )}
            
        </SafeAreaView>
    )
}

const renderFlatList = (data, navigation) => {
    return (
        <SafeAreaView>
            <FlatList
                data={data}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                    
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Description',
                    {
                        id: item.id,
                        title: item.title,
                        
                    } 
                    )}>

                        <Text style={styles.text}>{item.title}</Text>
                    </TouchableWithoutFeedback>
                )}
            />
        </SafeAreaView>
    );
}


const getDataFromStorage = async() => {
    try {

        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        
        if(result.length > 0) {
            
            return result.forEach(function (doc) {
                
                assignTitles(JSON.parse(doc[1]).title, JSON.parse(doc[1]).id);
            });
    
            //return result.map(req => assignTitles(JSON.parse(req[1]).title));
            
        }
        else {
            return null;
        }

        
        
    }
    catch(error) {
        alert(error);
    }
}

const LibraryScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text>Library books here</Text>
            {displayData(navigation)}
            
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
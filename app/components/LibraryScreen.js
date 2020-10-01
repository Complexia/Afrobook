import React from 'react';
import { FlatList, View, Text, StyleSheet, AsyncStorage, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
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

        <SafeAreaView>
            
            
                
                {titlesArr.length > 0 && !isLoading ? (
                    renderFlatList(titlesArr, navigation)
                )
                :
                (
                    <Text>Looks like your library is empty. Click Brows Titles to browse new books</Text>
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
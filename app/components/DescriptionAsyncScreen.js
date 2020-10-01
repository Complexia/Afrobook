import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, ActivityIndicator, AsyncStorage } from "react-native";

let descriptionArr = [];

function assignTitles(description, id) {
    

    descriptionArr.push (
        {
            id: id,
            description: description,
        }
    )
    
}

const displayData = (navigation, id) => {

    
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    
    async function getData() {
        await getDataFromStorage(id);   
    }
    
    useEffect(() => {
        getData()
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
    
    
    
    console.log("Array length", descriptionArr.length);
    return (

        <SafeAreaView>
            
            
                
            {isLoading ? <ActivityIndicator /> :(
                <Text>{descriptionArr[0].description}</Text>
            )}
        
            
            
        </SafeAreaView>
    )
}

const getDataFromStorage = async(id) => {
    try {
  
        
        descriptionArr = [];
        let descriptionAsync = await AsyncStorage.getItem(id + "description");
        let description = JSON.parse(descriptionAsync);
        assignTitles(description, id);
        
        
      
    }
    catch(error) {
        alert(error);
    }
}



const DescriptionScreen = ({ route, navigation }) => {

    const { title } = route.params; 
    const { id } = route.params;
    


    
    return (
        <View style={styles.container}>
            <Text>Description of the book</Text>
            <Text>{title}</Text>
            
            {displayData(navigation, id)}
            <Button title="Read book" onPress={() => navigation.navigate("ReaderAsync",
            {   
                id: id
                
            })}>
                
            </Button>
        </View>
    );
}

export default DescriptionScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "2%"
        
    }
})
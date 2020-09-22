import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from "react-native";


const fetchData = (navigation, id) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    
    const uri = `http://192.168.1.103:3000/books/description/${id}`
    useEffect(() => {
        fetch(uri)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);

    return (
        <View>
            {isLoading ? <ActivityIndicator /> :(
                <Text>{data[0]["Description"]}</Text>
            )}
        </View>
    );
}

const DescriptionScreen = ({ route, navigation }) => {

    const { title } = route.params; 
    const { id } = route.params;
    


    
    return (
        <View style={styles.container}>
            <Text>Description of the book</Text>
            <Text>{title}</Text>
            
            {fetchData(navigation, id)}
            <Button title="Read book" onPress={() => navigation.navigate("Reader",
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
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from "react-native";


const fetchData = (navigation, id) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const uri = `http://afrostoryapibooks-env.eba-dm7hpfam.us-east-2.elasticbeanstalk.com/books/description/${id}`;
    
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
    console.log("Are we here?");
    const { title } = route.params; 
    const { id } = route.params;
    // const title = "Sometitle";
    // const id = "5f6bfcc09200d50499d08324";
    console.log("From desc", title, id);

    
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
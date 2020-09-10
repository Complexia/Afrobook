import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, ActivityIndicator, FlatList } from 'react-native';
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';

let checker = 0; // to prevent fetchPostData from completing some functions more than once

const fetchPostData = (navigation) => {
    
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
    
    if(!isLoading && checker == 0) {
        assignData(data);
        checker = 1;
        
        
    }
    return (
        <View>
        {isLoading ? <ActivityIndicator/> : (
            <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
                
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Reader',
                {
                    id: item["id"],
                    title: item["title"],
                    body: item["body"]
                } 
                )}>

                    <Text style={styles.text}>{item.title}</Text>
                </TouchableWithoutFeedback>
            )}
            />
        )}
        </View>
    );
}

let fetchedData = []; //to be saved in async if button to download clicked
function assignData(data) {
    
    for(let i=0;i<data.length;i++){

        fetchedData.push (
            {
                id: data[i]["id"],
                title: data[i]["title"],
                body: data[i]["body"] 
            }
        )
    }
    console.log(fetchedData.length);
    console.log(fetchedData);
    
}





const TitlesScreen = ({ navigation }) => {
    
    
    
    
    return (
        <View style={styles.container}>

            <View style={styles.content}>
                
                {fetchPostData(navigation)}
                
            </View>
            <View style={styles.buttonLayer}>
                <Button style={styles.button} title="Download all"></Button>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: "5%",
        bottom: 25
        

    },
    text: {
        fontWeight: "bold",
        fontSize: 20,
        padding: "2%"

    },

    button: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
        
    },
    content: {
        flex: -1
    }
    
    
})

export default TitlesScreen;
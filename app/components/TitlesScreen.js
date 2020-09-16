import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, ActivityIndicator, FlatList, AsyncStorage } from 'react-native';
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';

let checker = 0; // to prevent fetchPostData from completing some functions more than once
let fetchedData = []; //to be saved in async if button to download clicked
const fetchPostData = (navigation) => {
    
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://192.168.1.103:3000/book')
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
            data={fetchedData}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
                
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Description',
                {
                    id: item.id,
                    title: item.title,
                    content: item.content
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


function assignData(data) { //called when promise is fulfilled
    console.log(data.length);
    for(let i=0;i<data.length;i++){

        fetchedData.push (
            {
                id: data[i]["_id"],
                title: data[i]["Title"],
                content: data[i]["Text"] 
            }
        )
    }

     console.log(fetchedData[0].content);
       
    
}

function downloadAll() {
    while(fetchedData.length == 0){
        console.log("waiting for fetched data");
    }
    console.log("we are here");
    for(let i=0;i<fetchedData.length;i++){
        AsyncStorage.setItem(fetchedData[i]["title"], JSON.stringify(fetchedData[i]));
    }
    console.log("we are done");
}

const displayData = async() => {
    try{
        let someBook = await AsyncStorage.getItem(fetchedData[5].title);
        let parsed = JSON.parse(someBook);
        alert(parsed.title);
    }
    catch(error){
        alert(error);
    }
}




const TitlesScreen = ({ navigation }) => {
    
    
    
    
    return (
        <View style={styles.container}>

            <View style={styles.content}>
                
                {fetchPostData(navigation)}
                
            </View>
            <View style={styles.buttonLayer}>
                <Button 
                    style={styles.button} 
                    title="Download all"
                    onPress={() => downloadAll()}
                >
                    
                </Button>
                
            </View>
            <View style={styles.buttonLayer}>
                
                <Button 
                    style={styles.button} 
                    title="Display Data"
                    onPress={() => displayData()}
                    ></Button>
            </View>
        </View>

    );
}

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

    button: {
        
        
    },
    content: {
        flex: 1
    },
    buttonLayer: {
        flexDirection: "column",
        flex: -1,
        padding: "1%"
        
    }

    
    
})

export default TitlesScreen;
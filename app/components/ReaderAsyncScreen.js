import React, { useEffect, useState }  from 'react';
import { StyleSheet, View, Text, ActivityIndicator, SafeAreaView, AsyncStorage } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { FlipPage, FlipPagePage } from 'react-native-flip-page';
import { render } from 'react-dom';

let contentArr = [];

const renderFlatList = (data) => {
    console.log(data);
    return (
        <SafeAreaView style={styles.content}>
            <FlatList
                data={data}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                    
                    

                    <Text style={styles.text}>{item.content}</Text>
                    
                )}
            />
        </SafeAreaView>
    );
}

const getDataFromStorage = async(id) => {
    try {
  
        
        contentArr = [];
        let contentAsync = await AsyncStorage.getItem(id + "content");
        let content = JSON.parse(contentAsync);
        assignTitles(content, id);
        
        
      
    }
    catch(error) {
        alert(error);
    }
}



function assignTitles(content, id) {
    

    contentArr.push (
        {
            id: id,
            content: content
        }
    )
    
}


const fetchData = (id) => {

    
    const [isLoading, setLoading] = useState(true);
    
    
    async function getData() {
        await getDataFromStorage(id);   
    }
    
    useEffect(() => {
        getData()
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);


    return (
        <SafeAreaView style={styles.content}>
            
            {isLoading ? <ActivityIndicator /> : (
                

                renderFlatList(contentArr)
                    
            )}
        </SafeAreaView>
    )
}

const Item = ({ body }) => (
    <SafeAreaView>
      <Text style={styles.text}>{body}</Text>
    </SafeAreaView>
  );

let content = "sdsdsds";

const ReaderScreen = ({ route, navigation }) => {

    
    
    const { id } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>The book text here</Text>
            
            {fetchData(id)}
            

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: "5%",
        flex: 1
    },

    content: {
        flex: 1
    },

    text: {
        fontSize: 22,
        padding: "5%"
    }

})

export default ReaderScreen;
import React, { useEffect, useState }  from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator, SafeAreaView, AsyncStorage } from 'react-native';



let isFetching = true;
let isDone = false;

function setFetching(value) {
    isFetching = value;
}

const fetchContent = (id, status, title, author, year, contentArr) => {
    
    if(contentArr.length == 0) {
        isDone = false;
    }
    
    let whereFrom = "fetch";
    if(status == "stored") {
        whereFrom = "async";
    }
    
    const [isLoading, setLoading] = useState(true);
    try {
        console.log(whereFrom);
        useEffect(() => {
            getData(whereFrom, id, title, author, year, contentArr)
            .catch(function(error) {
                console.log("caught this");
                
            })
            .finally(() => setLoading(false));
        }, []);
    }
    catch(error) {
        console.log("caught this here");
    }
    console.log(contentArr.length);
    if(!isLoading && !isFetching && contentArr.length > 0) {
        //console.log("Yippi", contentArr);
        isDone = true;

    }
    return (
        
            !isDone ? <ActivityIndicator /> :(
                
                renderFlatList(id, contentArr[0]["content"])
            )
        
    )
}

const getData = async(whereFrom, id, title, author, year, contentArr) => {

    if(whereFrom == "async") {
        let cArr = [];
        try {

            let contentAsync = await AsyncStorage.getItem(id + "content");
            let content = JSON.parse(contentAsync);
            cArr.push(content);
            contentArr.push(
                {
                    id: id,
                    title: title,
                    content: cArr,
                    author: author,
                    year: year
                }
            );
            setFetching(false);
        }
        catch(error) {
            alert(error);
        }
    }
    else {
        
        try {
            const uri = `http://afrostoryapibooks-env.eba-dm7hpfam.us-east-2.elasticbeanstalk.com/books/content/${id}`;
            await fetch(uri)
            .then((response) => response.json())
            
            
            .then((json) => contentArr.push(
                {
                    id: id,
                    title: title,
                    content: [json[0]["Text"]],
                    author: author,
                    year: year
                }))         
            .catch((error) => console.error(error))
            .finally(() => setFetching(false));
        }
        catch(error) {
            console.log("Network request failed.");

        }
  
    }
}

const renderFlatList = (id, data) => {
    return (

        <FlatList
        data = {data}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
            
            <Text style={styles.text}>{item}</Text>
        )}
        />
    )
}


const ReaderScreen = ({ route, navigation }) => {

    const { id } = route.params;
    const { title } = route.params;
    const { author } = route.params;
    const { year } = route.params;
    const { status } = route.params;
    let { contentArr } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>The book text here. Actually?</Text>
            
            {fetchContent(id, status, title, author, year, contentArr)}
            

        </SafeAreaView>
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
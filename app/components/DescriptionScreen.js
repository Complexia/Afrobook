import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, ActivityIndicator, AsyncStorage, TouchableOpacity } from "react-native";


let isFetching = true;
let isDone = false;


function setFetching(value) {
    isFetching = value;
}

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const fetchDesc = (navigation, id, status, title, author, year, descArr, pageNumber) => {
    
    if(descArr.length == 0) {
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
            getData(whereFrom, id, title, author, year, descArr)
            .catch(function(error) {
                console.log("caught this");
                
            })
            .finally(() => setLoading(false));
        }, []);
    }
    catch(error) {
        console.log("caught this here");
    }
    console.log(descArr.length);
    if(!isLoading && !isFetching && descArr.length > 0) {
        //console.log("Yippi", descArr);
        isDone = true;

    }
    return (
        
            !isDone ? <ActivityIndicator /> :(
                
                renderDesc(navigation, id, title, author, year, descArr[0]["description"], status, pageNumber)
            )
        
    )
}

const renderDesc = (navigation, id, title, author, year, description, status, pageNumber) => {
    let contentArr = [];
    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.authorText}>by {author}, {year}</Text>
            <View style={styles.borderLine}></View>
            <Text style={styles.descriptionText}>{description}</Text>

            {status === "stored" ?
                (
                    <AppButton title="Read" onPress={() => navigation.navigate('Reader', {
                        id: id,
                        title: title,
                        author: author,
                        year: year,
                        status: status,
                        pageNumber: pageNumber,
                        contentArr: contentArr
                    })} />
                )
                :
                (
                    <AppButton title="Download" onPress={() => navigation.navigate('Download', {
                        id: id,
                        title: title,
                        author: author,
                        year: year,
                        status: status,
                        contentArr: contentArr
                    })} />
                )
            }

        </SafeAreaView>
    )
}
const getData = async(whereFrom, id, title, author, year, descArr) => {

    if(whereFrom == "async") {
        
        try {

            let descriptionAsync = await AsyncStorage.getItem(id + "description");
            let description = JSON.parse(descriptionAsync);
            descArr.push(
                {
                    id: id,
                    title: title,
                    description: description,
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
            
            const uri = `http://afrostoryapibooks-env.eba-dm7hpfam.us-east-2.elasticbeanstalk.com/books/description/${id}`;
            await fetch(uri)
            .then((response) => response.json())
            .then((json) => descArr.push(
                {
                    id: id,
                    title: title,
                    description: json[0]["Description"],
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

const DescriptionScreen = ({ route, navigation }) => {
   
    const { title } = route.params; 
    const { id } = route.params;
    const { year } = route.params;
    const { author } = route.params;
    const { status } = route.params;
    let { descArr } = route.params;
    const { pageNumber } = route.params;

    console.log("From desc", title, id, year, author, status, pageNumber);
    
    
    return (

            fetchDesc(navigation, id, status, title, author, year, descArr, pageNumber)
        
    );
}

export default DescriptionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "black"
        
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 40,
        color: "#FFFFFF"
        
    },
    authorText: {
        color: "#C0C0C0"
    },
    descriptionText: {
        color: "#C0C0C0"
    },
    borderLine: {
        borderBottomColor: "#FFFFFF",
        borderBottomWidth: 1,
        padding: 10,
        marginBottom: 10
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#ee5535",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 10
   
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
})
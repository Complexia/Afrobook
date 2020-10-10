import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, Image, ImageBackground, View, Alert, TouchableWithoutFeedback, Text, StyleSheet, Button, TouchableOpacity, ActivityIndicator, FlatList, AsyncStorage, Platform } from 'react-native';
import NetInfo from "@react-native-community/netinfo";


let storedBooksArr = [];
let interFetchedBooksArr = [];
let fetchedBooksArr = [];
let booksArr = [];
let isFetching = true;
let checker = 0;
let isDone = false;
let isGetting = true;
let connectivityReturnValue = true;

function setFetching(value) {
    isFetching = value;
}
const fetchBooks = (whereFrom, navigation) => {
   
    const [isLoading, setLoading] = useState(true);
    try {

        useEffect(() => {
            getData(whereFrom)
            .catch(function(error) {
                console.log("caught this");
                
            })
            .finally(() => setLoading(false));
        }, []);
    }
    catch(error) {
        console.log("caught this here");
    }
    if(!isLoading) {
        setLoading(true);
    }

    if(!isFetching && !isGetting &&  checker == 0) {
        if(interFetchedBooksArr[0] != null) {
            
            for(let interBook of interFetchedBooksArr[0]) {
                
                fetchedBooksArr.push(
                    {   
                        id: interBook._id,
                        title: interBook.Title,
                        author: interBook.Auth_Name,
                        year: interBook.Year,
                        status: "fetched"
                    }
                    
                )
                
            }
        }
        
        checker = 1;
        booksArr = storedBooksArr.map((book) => book);
        if(fetchedBooksArr.length > 0) {
            console.log(fetchedBooksArr);
            for(let fetchedBook of fetchedBooksArr) {
                
                let indicator = 0;
                let tempBook = fetchedBook;
                
                
                for(let storedBook of storedBooksArr) {
                    
                    
                    
                    if(fetchedBook.id == storedBook.id) {
                        indicator = 1;
                        break;
                    }
 
                }
                
                if(indicator == 0) {
                    booksArr.push(tempBook)
                }
            }
        }
        

        isDone = true;
    }

    return (
        <SafeAreaView>
            {!isDone ? <ActivityIndicator /> : (
                renderFlatList(booksArr, navigation)
            )}
        </SafeAreaView>
        
    )

}

const Item = ({ item, style, navigation }) => {
    return (
    
    <TouchableOpacity 

        onPress={() => navigation.navigate('Description',
        {
            screen: 'Description',
            params: {
                id: item.id,
                title: item.title,    
            }
        } 
        )} 

        style={[styles.item, style]}>

      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.author} {item.year}</Text>
    </TouchableOpacity>
   )
};


const getData = async(whereFrom) => {

    if(whereFrom == "async") {
        
        try {
            let newKeys = [];
            const keys = await AsyncStorage.getAllKeys();
           
            //every 12th value in the DB is id
            for(let i=0;i < keys.length-4;i++) {
               if (i % 12 == 0) {
                   newKeys.push(keys[i]);
               }
            }
            
            
            for(let i=0;i<newKeys.length;i++) {
                let id = newKeys[i];
                let titleAsync = await AsyncStorage.getItem(id + "title");
                let authorAsync = await AsyncStorage.getItem(id + "authorName");
                let yearAsync = await AsyncStorage.getItem(id + "year");
                let title = JSON.parse(titleAsync);
                let author = JSON.parse(authorAsync);
                let year = JSON.parse(yearAsync);
                storedBooksArr.push(
                    {
                        id: id,
                        title: title,
                        author: author,
                        year: year,
                        status: "stored"
                    }
                )
            }
            
            isGetting = false;
        }
        catch(error) {
            alert(error);
        }
    }
    else {
        //await checkConnectivity()
        
        await checkConnectivity()
        .then(async function(result) { 
            if(connectivityReturnValue) {
                
                try {
                    const uri = "http://afrostoryapibooks-env.eba-dm7hpfam.us-east-2.elasticbeanstalk.com/books/titles";
                    await fetch(uri)
                    .then((response) => response.json())
                    .then((json) => interFetchedBooksArr.push(json))         
                    .catch(function(error) {
                        console.log("You are offline");
                        
                    })
                    .finally(() => setFetching(false));
                }
                catch(error) {
                    console.log("You are offline");
        
                }
                
                
            }
            else {
                console.log("You are ofline");
                setFetching(false);
            }

        })
        .catch(err => {
            console.log("Error")
        })

    
    }
}

const renderFlatList = (data, navigation) => {
    return (
        <SafeAreaView>
            <FlatList
                data={data}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => {
                    const backgroundColor = item.status === "stored" ? "#6e3b6e" : "#f9c2ff";
                    return (
                        <Item
                            item={item}
                            
                            style={{ backgroundColor }}
                            navigation={ navigation }
                        />
                    )
                }}
            />

        </SafeAreaView>
    );
}

const returnScreen = (navigation) => {
    fetchBooks("async", navigation) 
    return (
          
     <SafeAreaView style={styles.background}>
         {fetchBooks("fetched", navigation)}
     </SafeAreaView>
    );
}


    

const checkConnectivity = async() => {
    // For Android devices
    if (Platform.OS === "android") {
        NetInfo.fetch().then(isConnected => {
        if (isConnected) {
            //Alert.alert("You are online!");
            connectivityReturnValue = true;
            return true;
        } else {
            //Alert.alert("You are offline!");
            connectivityReturnValue = false;
            return false;
        }
        });
    } 
    else {
        // For iOS devices
        NetInfo.addEventListener(
        "connectionChange",
        this.handleFirstConnectivityChange
        );
    }
    
};

const handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
        "connectionChange",
        this.handleFirstConnectivityChange
    );

    if (!isConnected) {
        //Alert.alert("You are offline!");
        connectivityReturnValue = false;
        return true;
    } else {
        //Alert.alert("You are online!");
        connectivityReturnValue = true;
        return false;
    }
};

const HomeScreen = ({ navigation }) => {

    return (
         returnScreen(navigation)
        
    );
}

const styles = StyleSheet.create({
    
    background: {
        flex: 1,   
    },
    text: {
        fontWeight: "bold",
        fontSize: 20,
        padding: "2%"
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },

})

export default HomeScreen;
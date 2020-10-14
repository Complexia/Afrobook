import React, { useEffect, useState } from 'react';
import { SafeAreaView, Image, ImageBackground, View, Alert, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, AsyncStorage, Platform } from 'react-native';
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
        booksArr.push (
            {   
                id: "libraryTag",
                title: "Library",
                status: "tag"
            }
        )
        
        for(let storedBook of storedBooksArr) {
            booksArr.push(storedBook);
        }
        if(fetchedBooksArr.length > 0) {
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

const LibraryTag = () => {
    return (
        <View>
            <Text>Library</Text>
            <Text>6 books</Text>
        </View>
    )
}

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const Item = ({ item, style, navigation, downloaded, bookCount }) => {
    let descriptionArr = [];
    console.log(item.pageNumber);
    return (

        <View>
            {downloaded === "" ? (
                
                <View style={styles.libraryTag}>
                    <Text style={styles.libraryTagText}>{item.title}</Text>
                    <Text style={styles.titleProps}>{bookCount} books</Text>
                    
                    <AppButton title="Download All" onPress={() => navigation.navigate('Download', {                       
                        pageNumber: 0
                    })} />
                </View>
            )
            :
            (
                downloaded === "Downloaded" ? (
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Description',
                    {
                        screen: 'Description',
                        params: {
                            id: item.id,
                            title: item.title,
                            author: item.author,
                            year: item.year,
                            status: item.status,
                            pageNumber: item.pageNumber,
                            descArr: descriptionArr,
                            authorOrigin: item.authorOrigin,
                            genre: item.genre    
                        }
                    } 
                    )}
                    style={[styles.item, style]}>

                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.titleProps}>{item.author}</Text>
                        <Text style={styles.recommendedProp}>Recommended</Text>
                        <Text style={styles.downloadedProp}>{downloaded}</Text>
                    </TouchableOpacity> 

                )
                :
                (
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Description',
                    {
                        screen: 'Description',
                        params: {
                            id: item.id,
                            title: item.title,
                            author: item.author,
                            year: item.year,
                            status: item.status,
                            pageNumber: 0,
                            descArr: descriptionArr,
                            authorOrigin: item.authorOrigin,
                            genre: item.genre      
                        }
                    } 
                    )}
                    style={[styles.item, style]}>

                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.titleProps}>{item.author} {item.year}</Text>
                        <Text style={styles.downloadedProp}>{downloaded}</Text>
                    </TouchableOpacity> 
                )

            )
            }
        </View>
    

   )
};


const getData = async(whereFrom) => {

    if(whereFrom == "async") {
        
        try {
            let newKeys = [];
            const keys = await AsyncStorage.getAllKeys();
            
            //every 13th value in the DB is id
            for(let i=0;i < keys.length-4;i++) {
               if (i % 13 == 0) {
                   newKeys.push(keys[i]);
               }
            }
            
            
            for(let i=0;i<newKeys.length;i++) {
                let id = newKeys[i];
                let titleAsync = await AsyncStorage.getItem(id + "title");
                let authorAsync = await AsyncStorage.getItem(id + "authorName");
                let yearAsync = await AsyncStorage.getItem(id + "year");
                let pageNumberAsync = await AsyncStorage.getItem(id + "pageNumber");
                let authorOriginAsync = await AsyncStorage.getItem(id + "authorOrigin");
                let genreAsync = await AsyncStorage.getItem(id + "category");
                let editorsPickAsync = await AsyncStorage.getItem(id + "editorsPick");
                let title = JSON.parse(titleAsync);
                let author = JSON.parse(authorAsync);
                let year = JSON.parse(yearAsync);
                let pageNumber = JSON.parse(pageNumberAsync);
                let authorOrigin = JSON.parse(authorOriginAsync);
                let genre = JSON.parse(genreAsync);
                let editorsPick = JSON.parse(editorsPickAsync);
                
                storedBooksArr.push(
                    {
                        id: id,
                        title: title,
                        author: author,
                        year: year,
                        status: "stored",
                        pageNumber: pageNumber,
                        authorOrigin: authorOrigin,
                        genre: genre,
                        editorsPick: editorsPick
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
                console.log("You are offline");
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

                    let backgroundColor = "black";
                    if(item.status == "stored") {
                        backgroundColor = "#ee5535";
                    }
                    else if(item.status == "fetched") {
                        backgroundColor = "#22236a"
                    }

                    let downloaded = "";
                    if(item.status == "stored") {
                        downloaded = "Downloaded";
                    }
                    else if(item.status == "fetched") {
                        downloaded = "Not downloaded"
                    }
                    
                    return (
                        <Item
                            item={item}
                            
                            style={{ backgroundColor }}
                            navigation={ navigation }
                            downloaded = {downloaded}
                            bookCount = {data.length -1}
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
    // For iOS devices
    else {       
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

const useForceUpdate = () => {
    console.log("called refresh");
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

const HomeScreen = ({ navigation }) => {
    //const forceUpdate = useForceUpdate();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // The screen is focused
          // Call any action
          //const forceUpdate = useForceUpdate();
          console.log("focused")
          
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    return (
        
         returnScreen(navigation)
        
    );
}

// class HomeScreen extends React.Component {
//     static navigationOptions = {
//         title: 'Description',
//     };
//     render() {
//         const { navigation } = this.props.navigation;
//         return (
//             returnScreen(navigation)
//         )
//     }
// }

const styles = StyleSheet.create({
    
    background: {
        flex: 1,   
        backgroundColor: "black"
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
        borderRadius: 10
    },
    title: {
        fontSize: 32,
        color: "#FFFFFF"
    },
    titleProps: {
        color: "#C0C0C0"
    },
    downloadedProp: {
        color: "#C0C0C0",
        alignSelf: "flex-end"

    },
    recommendedProp: {
        color: "#f3f70c",
        alignSelf: "flex-end"
    },
    libraryTag: {
        padding: 20
    },
    libraryTagText: {
        fontSize: 45,
        color: "#FFFFFF",
        
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#22236a",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 10,
        alignSelf: "flex-end"
   
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },


})

export default HomeScreen;
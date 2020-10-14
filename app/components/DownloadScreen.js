import React, { useEffect, useState }  from 'react';
import { TouchableOpacity, StyleSheet, SafeAreaView, Text, View, TouchableWithoutFeedback, AsyncStorage, ActivityIndicator } from 'react-native';

let checker = 0;

const downloadAll = (navigation, pageNumber) => {

    const [isLoading, setLoading] = useState(true);
    const [isGetting, setGetting] = useState(true);
    const [data, setData] = useState([]);
    const uri = "http://afrostoryapibooks-env.eba-dm7hpfam.us-east-2.elasticbeanstalk.com/books";
    useEffect(() => {
        //let isSubscribed = true;
        fetch(uri)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);

    if(!isLoading && checker == 0) {
        checker = 1;
        let initialPageNumber = pageNumber;
        for(let i=0;i<data.length;i++) {
            //console.log(data[i]["_id"] + "title");

            AsyncStorage.setItem(data[i]["_id"], JSON.stringify(data[i]["_id"]));
            AsyncStorage.setItem(data[i]["_id"] + "title", JSON.stringify(data[i]["Title"]));
            AsyncStorage.setItem(data[i]["_id"] + "authorName", JSON.stringify(data[i]["Auth_Name"]));
            AsyncStorage.setItem(data[i]["_id"] + "authorOrigin", JSON.stringify(data[i]["Auth_Origin"]));
            AsyncStorage.setItem(data[i]["_id"] + "category", JSON.stringify(data[i]["Category"]));
            AsyncStorage.setItem(data[i]["_id"] + "averageRating", JSON.stringify(data[i]["Avg_Rating"]));
            AsyncStorage.setItem(data[i]["_id"] + "description", JSON.stringify(data[i]["Description"]));
            AsyncStorage.setItem(data[i]["_id"] + "year", JSON.stringify(data[i]["Year"]));
            AsyncStorage.setItem(data[i]["_id"] + "downloadCount", JSON.stringify(data[i]["Download_Count"]));
            AsyncStorage.setItem(data[i]["_id"] + "editorsPick", JSON.stringify(data[i]["EditorsPicks_bool"]));
            AsyncStorage.setItem(data[i]["_id"] + "ratingCount", JSON.stringify(data[i]["Rating_Count"]));
            AsyncStorage.setItem(data[i]["_id"] + "content", JSON.stringify(data[i]["Text"]));
            
            AsyncStorage.setItem(data[i]["_id"] + "pageNumber", JSON.stringify(initialPageNumber));

        }
        setGetting(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                
                {isLoading || isGetting ? (
                    
                    <View>

                        <ActivityIndicator /> 
                        <Text>Downloading in progress</Text>
                    </View>
                    )
                    : 
                    (
                    <View style={styles.container}>
                        <Text>Done downloading</Text>
                        <AppButton title="View Library" onPress={() => navigation.navigate('Home')} />
                    </View>
                )}
                    
            </View>
        </SafeAreaView>
    )

}

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

const DownloadScreen = ({ route, navigation }) => {
    
    const { pageNumber } = route.params;
    return (
        downloadAll(navigation, pageNumber)
    );
}

const styles = StyleSheet.create({
    
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "goldenrod",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        margin: 20,
        
        
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
        
    }
})

export default DownloadScreen;
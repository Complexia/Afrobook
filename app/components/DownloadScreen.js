import React, { useEffect, useState }  from 'react';
import { SafeAreaView, Text, View, TouchableWithoutFeedback, AsyncStorage } from 'react-native';

let checker = 0;

const downloadAll = () => {

    const [isLoading, setLoading] = useState(true);
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

        }
    }

}

const DownloadScreen = ({ navigation }) => {
    downloadAll();
    return (
        <SafeAreaView>
            <View>
                
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Description'
                     
                    )}>

                        <Text>Hello</Text>
                    </TouchableWithoutFeedback>
                    
            </View>
        </SafeAreaView>
    );
}

export default DownloadScreen;
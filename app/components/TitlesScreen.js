import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, StyleSheet, View, Text, Button, ActivityIndicator, FlatList, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { set } from 'react-native-reanimated';

let checker = 0; // to prevent fetchPostData from completing some functions more than once
let fetchedData = []; //to be saved in async if button to download clicked
let titlesArr = []
const fetchPostData = (navigation) => {
    
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const uri = "http://afrostoryapibooks-env.eba-dm7hpfam.us-east-2.elasticbeanstalk.com/books/titles";
    useEffect(() => {
        fetch(uri)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);

    
    
    

    if(!isLoading && checker == 0) {
        assignData(data);
        checker = 1;
            
    }
    //downloadAll();
    //getDataFromStorage();

    return (
        <View>
        {isLoading ? <ActivityIndicator/> : (
            renderFlatList(fetchedData, navigation)
        )}
        </View>
    );
}

const renderFlatList = (data, navigation) => {
    return (
        <SafeAreaView>
            <FlatList
                data={data}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                    
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Description',
                    {
                        id: item.id,
                        title: item.title,
                        
                    } 
                    )}>

                        <Text style={styles.text}>{item.title}</Text>
                    </TouchableWithoutFeedback>
                )}
            />
        </SafeAreaView>
    );
}

// const returnData = (navigation) => {

//     const [isLoading, setLoading] = useState(true);
//     const [data, setData] = useState([]);
//     const uri = "http://afrostoryapibooks-env.eba-dm7hpfam.us-east-2.elasticbeanstalk.com/books/titles";

//     async function fetchFromStorage(){
//         await getDataFromStorage()
//         .finally(() => setLoading(false));
//     };
//     fetchFromStorage();

    
    
    
//     //Case data downloaded vs when not
 
//     return (
//         <SafeAreaView>

//             {isLoading ? <ActivityIndicator /> :(
    
    
//                 titlesArr.length > 0 ? (
        
                    
                    
//                     <SafeAreaView>
//                             <View>
        
//                                 <Text>Data from storage</Text>
//                             </View>
                        
//                     </SafeAreaView>
//                 )
//                 :
//                 (
//                     <SafeAreaView>
        
//                             <View>
        
//                                 <Text>Data from API</Text>
//                             </View>
                        
//                     </SafeAreaView>
//                 )
//             )}

//         </SafeAreaView>

        
//     );
    
   
// }


function assignData(data) { //called when promise is fulfilled
    
    for(let i=0;i<data.length;i++){
        console.log(data[i]["Title"]);
        fetchedData.push (
            {
                id: data[i]["_id"],
                title: data[i]["Title"],
                
                
            }
        )
        
    }

}

function assignTitles(title, id) {
    titlesArr.push (
        {
            id: id,
            title: title,
        }
    )
}

function downloadAll() {
    
    
    for(let i=0;i<fetchedData.length;i++){
        
        
        AsyncStorage.setItem(fetchedData[i]["id"], JSON.stringify(fetchedData[i]));
    }
    
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

const getDataFromStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      
      await AsyncStorage.multiRemove(keys);
      
      if(result.length > 0) {
        
        
        return result.forEach(function (doc) {
            assignTitles(JSON.parse(doc[1]).title, JSON.parse(doc[1]).id);
        });

        
        
      }
      else{
          return null;
      }
      
    } catch (error) {
      console.error(error)
    }
  }

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);


const TitlesScreen = ({ navigation }) => {
  
    return (
        <View style={styles.container}>

            <View style={styles.content}>
                
                {fetchPostData(navigation)}
                
            </View>
            <View style={styles.buttonLayer}>
                
                <AppButton title="Download all" onPress={() => navigation.navigate('Download')} />
                
            </View>
            
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        flex: 1,
        padding: "3%"
    },
    buttonLayer: {
        flexDirection: "column",
        flex: -1,
        padding: "1%"
        
    },

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

    
    
})

export default TitlesScreen;
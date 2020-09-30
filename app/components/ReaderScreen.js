import React, { useEffect, useState }  from 'react';
import { StyleSheet, View, Text, ActivityIndicator, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { FlipPage, FlipPagePage } from 'react-native-flip-page';

const fetchData = (navigation, id) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const uri = `http://afrostoryapibooks-env.eba-dm7hpfam.us-east-2.elasticbeanstalk.com/books/content/${id}`;
    

    useEffect(() => {
        fetch(uri)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);

    if(!isLoading) {
       
    }
    return (
        <SafeAreaView style={styles.content}>
            
            {isLoading ? <ActivityIndicator /> : (
                

                    <FlatList
                        data = {data}
                        keyExtractor={({ id }) => id}
                        renderItem={({ item }) => (
                            
                            <Text style={styles.text}>{item.Text}</Text>
                        )}
                    />
                    
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
            
            {fetchData(navigation, id)}
            

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
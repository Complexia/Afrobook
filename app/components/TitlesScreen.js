import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TouchableWithoutFeedback, FlatList, ScrollView } from 'react-native-gesture-handler';


const ListTitles = (navigation) => {

    
    let bookArr = [];

    for(let i = 0; i < 100; i++) {
        
        
        bookArr.push (
            {
                "id": i,
                "title": "Book " + i,
                "category": "African",
                "content": "Sometextcontenxthere"
            }
        );

        // let bookArr = [
        //     {
        //         "id": i,
        //         "title": "Book " + i,
        //         "category": "African",
        //         "content": "Sometextcontenxthere"
        //     }
        // ];

        

        
        
        
  
    }

    let bookArrMap = bookArr.map((item) => 
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Reader',
           {
            id: item["id"],
            content: item["content"]
           } 
           )}>

            <Text key={ item["id"] } style={ styles.text }>{ item["title"] }</Text>
        </TouchableWithoutFeedback>
    );
    
    let returnValue = bookArrMap

    
    return returnValue;
    
    
}

const TitlesScreen = ({ navigation }) => {
    let bookTitle = "something";
    let bookArr = ListTitles();
    console.log("hello");
    
    //console.log(bookArr[1]["title"]);
    return (
        <View style={styles.container}>

            <Text style={styles.text}>Book titles here</Text>
            
            <ScrollView>
                {ListTitles(navigation)}
            </ScrollView>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: "5%",
        bottom: 25
        

    },
    text: {
        fontWeight: "bold",
        fontSize: 20,
        padding: "2%"

    }
})

export default TitlesScreen;
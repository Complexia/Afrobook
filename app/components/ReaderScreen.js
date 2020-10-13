import React, { useEffect, useState, createRef }  from 'react';
import { FlatList, Button, StyleSheet, View, Text, ActivityIndicator, SafeAreaView, AsyncStorage, Dimensions } from 'react-native';




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
                
                paginateData(contentArr[0]["content"])
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

const paginateData = (data) => {
    let words = data[0].match(/(.*?\s){200}/g);
    //let words = data[0].split(" ", data[0].length);
    let pages = [];
    
     for(let i = 0; i < words.length; i++) {
        pages.push (
            {
               pageNumber: i,
               pageContent: words[i] 
            }
        )
     }

     return (
        renderFlatList(pages)
     )
}
let flatlist = createRef();
//(data, index) => { return { length: data.length, index, offset: (Dimensions.get('screen').width -5 ) * index } }

// const getItemLayout = (data, index) => {
//     const length = data.length;
//     const offset = data.slice(0,index).reduce((a, c) => a + c, 0)
//     return {length, offset, index}
// }

const renderFlatList = (data) => {
    let widthD = 0;
    let layoutWidth = 0;
    let layoutOffset = 0;

    // const getItemLayout = (data, index) => {
        
    //     const length = layoutWidth;
    //     const offset = layoutOffset;
        
    //     //console.log("i", index, "l", length, "o", offset);
    //     return {length, offset, index}
    // }
    let getItemLayout;
    function onScrollEnd(e) {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        layoutWidth = viewSize.width;
        layoutOffset = contentOffset.x;
        // Divide the horizontal offset by the width of the view to see which page is visible
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        console.log('scrolled to page ', pageNum);
    }
    
    return (
        
        <View onLayout={(e) => {
            console.log(e.nativeEvent);
            //let contentOffset = e.nativeEvent.contentOffset;
            let viewSize = e.nativeEvent.layout;
            layoutWidth = viewSize.width;
            layoutOffset = viewSize.x;

            getItemLayout = (data, index) => {
        
                const length = layoutWidth;
                const offset = layoutOffset;
                
                //console.log("i", index, "l", length, "o", offset);
                return {length, offset, index}
            }
            
            
            //console.log("YOCHHUUU", width);
            // if(flatlist.current) {
            //     //flatlist.current.getItemLayout={ length: data.length, index, offset: (411.4285583496094 - 7.5) * index } 
            //     console.log("Do here");
            //     //flatlist.current.scrollToItem({item: data[45]});
                
            // }
          }} >
            <FlatList
    
                ref = {flatlist}
                data = {data}
                getItemLayout = {getItemLayout}
                //getItemLayout={(data, index) => { return { length: data.length, index, offset: (Dimensions.get('screen').width - 7.5) * index } }}
                keyExtractor={({ id }) => id}
                horizontal = {true}
                pagingEnabled = {true}
                showsHorizontalScrollIndicator = {false}
                initialNumToRender = {380}
                onMomentumScrollEnd={onScrollEnd}
                initialScrollIndex = {40}



                
                
                renderItem={({ item }) => {
                    
                    return (
                        <View>
                        <Item item={item} />
                        
                        </View>
                    )
                }}
            />
        </View>
    )
}

const printPageNumber = (pageNumber) => {
    console.log("hhsh", pageNumber)
    
}
const Item = (item) => {
    //console.log("hey there", item);
    //console.log("number", item.item.pageNumber);
    return (
        <View style={styles.page}>
            
            <Text style={styles.text}>{item.item.pageContent}</Text>
            <Text style={styles.pageNumber}>{item.item.pageNumber}</Text>
        </View>
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



export default ReaderScreen;

const styles = StyleSheet.create({
    container: {
        
        padding: 5
    },

    content: {
        
    },

    text: {
        fontSize: 17,
        
    },
    page: {
        width: Dimensions.get('screen').width - 10,
        //height: Dimensions.get('screen').height - 10,
        padding: 5
        
    },
    pageNumber: {
        //alignSelf: "flex-end",
        alignSelf: "center",
        
        
    }
    

})
import React, { useState, useEffect} from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";



let Data = [];

function setData1(id, title, text) {
    let myObject = {
        id: id,
        title: title,
        text: text
    }
    
    Data.push(myObject);
    
    

}


const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);
let checker = 0;
const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  

  useEffect(() => {
    fetch('http://192.168.1.103:3000/book')
      .then((response) => response.json()) 
      .then(data => setData(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if(!isLoading && checker == 0){
      
      setData1(data["_id"],data["Title"],data["Text"])
      
      checker = 1;
  }
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
    {isLoading ? <ActivityIndicator/> : (
      

          <FlatList
            data={Data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
      
    )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;

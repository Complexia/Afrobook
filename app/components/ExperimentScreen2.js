import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

let Data = [];

function setData1(id, title, text) {
    let myObject = {
        id: id,
        title: title,
        text: text
    }
    
    Data.push(myObject);
    
    

}


const Item = ({ item }) => (
    <Text>{ item.text }</Text>
);

let checker = 0;

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  

  useEffect(() => {
    fetch('http://192.168.1.103:3000/book')
      .then((response) => response.json())
      .then(data => setData(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if(!isLoading && checker == 0) {
      
    setData1(data["_id"],data["Title"],data["Text"])
    
    checker = 1;
  }

  const renderItem = ({ item }) => {
    return (
      <Item item={item}/>
    );
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
            data={Data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            
        />
        
      )}
    </View>
  );
};
import React  from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';



const Item = ({ body }) => (
    <View>
      <Text style={styles.text}>{body}</Text>
    </View>
  );



const ReaderScreen = ({ route, navigation }) => {

    const { id } = route.params;
    const { title } = route.params;
    const { body } = route.params;

    const data = [
        {
            id: id,
            title: title,
            body: body
        }
    ]

    const renderItem = ({ item }) => (
        <Item body={body} />
      );

    return (
        <View style={styles.container}>
            <Text>The book text here</Text>
            <Text>{ id }</Text>
            <Text>{ title }</Text>
            

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => id}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: "5%"
    },

    text: {
        fontSize: 22
    }

})

export default ReaderScreen;
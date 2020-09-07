import React  from 'react';
import { StyleSheet, View, Text } from 'react-native';



console.log

const ReaderScreen = ({ route, navigation }) => {

    const { id } = route.params;
    const { content } = route.params;

    console.log(content);

    return (
        <View style={styles.container}>
            <Text>The book text here</Text>
            <Text>{ id }</Text>
            <Text>{ content }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: "5%"
    }

})

export default ReaderScreen;
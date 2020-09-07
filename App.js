import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    SafeAreaView
} from 'react-native';
import WelcomeScreen from './app/components/WelcomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/components/HomeScreen';
import TitlesScreen from './app/components/TitlesScreen';
import LibraryScreen from './app/components/LibraryScreen';
import ReaderScreen from './app/components/ReaderScreen';

const Stack = createStackNavigator();

const App = () => {

    
        return (
            
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen name="Welcome" component= {WelcomeScreen} />
                    <Stack.Screen name="Home" component= {HomeScreen} />
                    <Stack.Screen name="Titles" component= {TitlesScreen} />
                    <Stack.Screen name="Library" component= {LibraryScreen} />
                    <Stack.Screen name="Reader" component= {ReaderScreen} />
                    

                    
                </Stack.Navigator>
                
    
            </NavigationContainer>
            
    
        );
};

export default App;




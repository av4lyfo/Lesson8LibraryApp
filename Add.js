import React, { useState } from 'react';
import { StatusBar, View, Button, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [image, setImage] = useState('');
    const [copies, setCopies] = useState('');

    const setData = async (value) => {
        await AsyncStorage.setItem('bookdata', value);
        navigation.navigate('Home');
    };

    return (
        <View>
            <StatusBar />
            <View style={{ padding: 10 }}>
                <Text>Title:</Text>
                <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => setTitle(text)} />
            </View>

            <View style={{ padding: 10 }}>
                <Text>ISBN:</Text>
                <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => setIsbn(text)} />
            </View>

            <View style={{ padding: 10 }}>
                <Text>Image URL:</Text>
                <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => setImage(text)} />
            </View>

            <View style={{ padding: 10 }}>
                <Text>Copies Owned:</Text>
                <TextInput style={{ borderWidth: 1 }} onChangeText={(text) => setCopies(text)} />
            </View>

            <Button
                title="ADD"
                onPress={() => {
                    let mydata = JSON.parse(route.params.datastring);
                    let item = { title, isbn, image, copies };
                    mydata[0].data.push(item);
                    let stringdata = JSON.stringify(mydata);
                    setData(stringdata);
                }}
            />
        </View>
    );
};

export default Add;

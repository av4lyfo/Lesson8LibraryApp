import React, { useState } from 'react';
import { Alert, View, Button, Text, TextInput, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({ navigation, route }) => {
    let mydata = JSON.parse(route.params.datastring);
    let myindex = route.params.index;

    const [title, setTitle] = useState(route.params.title);
    const [isbn, setIsbn] = useState(route.params.isbn);
    const [image, setImage] = useState(route.params.image);
    const [copies, setCopies] = useState(route.params.copies);

    const setdata = async (value) => {
        await AsyncStorage.setItem('bookdata', value);
        navigation.navigate('Home');
    };

    return (
        <View>
            <StatusBar />

            <View style={{ padding: 10 }}>
                <Text>Title:</Text>
                <TextInput
                    value={title}
                    style={{ borderWidth: 1 }}
                    onChangeText={(text) => setTitle(text)}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text>ISBN:</Text>
                <TextInput
                    value={isbn}
                    style={{ borderWidth: 1 }}
                    onChangeText={(text) => setIsbn(text)}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text>Image URL:</Text>
                <TextInput
                    value={image}
                    style={{ borderWidth: 1 }}
                    onChangeText={(text) => setImage(text)}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text>Copies Owned:</Text>
                <TextInput
                    value={copies}
                    style={{ borderWidth: 1 }}
                    onChangeText={(text) => setCopies(text)}
                />
            </View>

            <View style={{ flexDirection: "column" }}>
                <View style={{ margin: 10 }}>
                    <Button
                        title="Save"
                        onPress={() => {
                            let item = {
                                title: title,
                                isbn: isbn,
                                image: image,
                                copies: copies
                            };
                            mydata[0].data[myindex] = item;
                            let stringdata = JSON.stringify(mydata);
                            setdata(stringdata);
                        }}
                    />
                </View>

                <View style={{ margin: 10 }}>
                    <Button
                        title="Delete"
                        onPress={() => {
                            Alert.alert(
                                "Are you sure?",
                                '',
                                [
                                    {
                                        text: 'Yes',
                                        onPress: () => {
                                            mydata[0].data.splice(myindex, 1);
                                            let stringdata = JSON.stringify(mydata);
                                            setdata(stringdata);
                                        }
                                    },
                                    { text: 'No' }
                                ]
                            );
                        }}
                    />
                </View>
            </View>
        </View>
    );
};


export default Edit;

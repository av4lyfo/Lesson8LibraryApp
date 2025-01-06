import React, { useState } from 'react';
import { StatusBar, Button, StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 5,
    },
    opacityStyle: {
        flexDirection: 'row',
        flex: 1,
        padding: 10,
        borderWidth: 1,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'impact',
    },
    image: {
        width: 100,
        height: 150,
        marginRight: 15,
    },
    detailContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    detailText: {
        fontSize: 14,
        marginBottom: 5,
    },
});

const Home = ({ navigation }) => {
    const [mydata, setMyData] = useState(datasource);

    const getData = async () => {
        let datastr = await AsyncStorage.getItem('bookdata');
        if (datastr != null) {
            let jsondata = JSON.parse(datastr);
            setMyData(jsondata);
        } else {
            setMyData(datasource);
        }
    };
    getData();
    const renderItem = ({ item, index }) => {
        let datastr = JSON.stringify(mydata);
        return (
            <TouchableOpacity
                style={styles.opacityStyle}
                onPress={() => {
                    navigation.navigate('Edit', {
                        index: index,
                        title: item.title,
                        isbn: item.isbn,
                        copies: item.copies,
                        image: item.image,
                        datastring: datastr,
                    });
                }}
            >
                <View style={styles.detailContainer}>
                    <Text style={styles.textStyle}>{item.title}</Text>
                    <Text style={styles.detailText}>ISBN: {item.isbn}</Text>
                    <Text style={styles.detailText}>Copies: {item.copies}</Text>
                </View>
                <View>
                    <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <StatusBar />
            <Button
                title="Add Book"
                onPress={() => {
                    let datastr = JSON.stringify(mydata);
                    navigation.navigate('Add', { datastring: datastr });
                }}
            />
            <FlatList renderItem={renderItem} data={mydata[0].data} keyExtractor={(item, index) => index.toString()} />
        </View>
    );
};


export default Home;

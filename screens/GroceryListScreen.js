import React, {useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import {Icon, ListItem, Rating} from "react-native-elements";
import ItemCounter from "../components/ItemCounter";

export default function GroceryListScreen({navigation, route}) {
    useEffect(() => {
        navigation.dangerouslyGetParent()?.setOptions({
            headerLeft: () => <Icon
                name="chevron-left"
                type="entypo"
                containerStyle={{marginLeft: 15}}
                onPress={() => {
                    navigation.goBack();
                }}
            />
        });
    }, []);
    let orderedItems = [];
    for (let [key, value] of Object.entries(route.params.items)) {
        let obj = value;
        obj.id = key;
        orderedItems.push(obj);
    }
    navigation.dangerouslyGetParent().setOptions({title: route.params.author});
    return (
        <View style={{flex: 1}}>
            <FlatList
                data={orderedItems}
                renderItem={({item}) => (
                    <View>
                        <ListItem
                            leftAvatar={{source: {uri: item.imageUrl}}}
                            rightElement={item.count}
                            title={item.title}
                            bottomDivider={true}
                        />
                    </View>

                )}
                keyExtractor={item => item.id}
            />
            <SvgQRCode
                value="http://facebook.github.io/react-native"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 50,
        width: 50,
    }
});
import React, {useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import {Icon, ListItem, Rating} from "react-native-elements";
import StackWrapperScreenOptions from "../constants/StackWrapperScreenOptions";

export default function GroceryListTodoScreen({navigation, route}) {
    let orderedItems = [];
    for (let [key, value] of Object.entries(route.params.items)) {
        let obj = value;
        obj._id = key;
        orderedItems.push(obj);
    }
    return (
        <View style={{flex: 1}}>
            <FlatList
                data={orderedItems}
                renderItem={({item}) => (
                    <View>
                        <ListItem
                            leftAvatar={{source: {uri: item.imageUrl}}}
                            rightElement={{primaryText: item.count?.toString()}}
                            title={item.name}
                            bottomDivider={true}
                        />
                    </View>

                )}
                keyExtractor={item => item._id}
            />
            <View
                style={styles.qrStyle}
            >
                <SvgQRCode
                    value={route.params.qrCode}
                />
            </View>
          <Text style={{fontWeight: 'bold', margin: 20, textAlign: 'center'}}>
            Show this to an employee in the current store to start helping
            somebody vulnerable to their groceries!
          </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 50,
        width: 50,
    },
    qrStyle: {
        alignItems: 'center'
    }
});

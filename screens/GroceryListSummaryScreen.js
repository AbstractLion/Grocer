import React, {useContext, useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet, Platform} from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import {Icon, ListItem, Rating} from "react-native-elements";
import UserContext from "../contexts/User";
import GoBackIcon from "../components/GoBackIcon";
import {Notifications} from 'expo';

export default function GroceryListSummaryScreen({navigation, route}) {
  const groceryList = route.params;
  const {user} = useContext(UserContext);

  function handleNotification(notification) {
    console.log("notification: ", notification);
    console.log(user._id);
    if (notification.data?.isActivation && notification.data?.userId === user._id)
      navigation.navigate('GroceryListChecklist', groceryList);
  }

  useEffect(() => {
    const listener = Notifications.addListener(handleNotification);
    return () => {
      console.log("Removed listener.");
      listener.remove();
    }
  }, []);

  useEffect(() => {
    navigation.dangerouslyGetParent()?.setOptions({
      headerLeft: () => <GoBackIcon navigation={navigation}/>,
      title: `${groceryList.user.firstName} ${groceryList.user.lastName}`
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={groceryList.items}
        renderItem={({item: groceryItem}) => {
          return (
            <View>
              <ListItem
                leftAvatar={{source: {uri: groceryItem.item.imageUrl}}}
                rightAvatar={{
                  title: groceryItem.count.toString(),
                  titleStyle: {color: 'black', fontWeight: 'bold'},
                  overlayContainerStyle: {backgroundColor: 'white'}
                }}
                title={groceryItem.item.name}
                bottomDivider={true}
              />
            </View>
          );
        }}
        keyExtractor={item => item._id}
      />
      <View
        style={styles.qrStyle}
      >
        <SvgQRCode
          value={`${user._id}=${route.params.qrCode}`}
        />
      </View>
      <Text style={styles.instructions}>
        Show this to an employee in the current store to start helping somebody
        vulnerable to their groceries!
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
  },
  instructions: {
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center'
  }
});

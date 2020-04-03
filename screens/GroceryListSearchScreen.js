import React, {useState, useEffect, useContext} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import StackWrapper from '../navigation/StackWrapper';
import {ListItem, SearchBar} from "react-native-elements";
import GroceryListSummaryScreen from "./GroceryListSummaryScreen";
import GroceryListChecklistScreen from "./GroceryListChecklistScreen";
import {createStackNavigator} from "@react-navigation/stack";
import dateFormat from 'dateformat';
import UserContext from "../contexts/User";

function GroceryListSearch({navigation}) {
  const [groceryLists, updateGroceryLists] = useState([]);
  const {user} = useContext(UserContext);

  useEffect(() => {
    (async() => {
      await updateData();
    })();
  }, []);

  async function updateData() {
    const listsUrl = 'https://grocerserver.herokuapp.com/lists';
    const response = await fetch(listsUrl);
    const result = await response.json();
    updateGroceryLists(result);
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={groceryLists}
        horizontal={false}
        renderItem={({item: groceryList}) => <ListItem
          chevron={true}
          title={groceryList.author}
          titleStyle={{fontWeight: 'bold'}}
          subtitle={
            dateFormat(groceryList.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")
          }
          onPress={() => {
            if (!user) {
              alert("You need to be a shopper to access this screen.");
              return;
            }
            navigation.navigate("GroceryList", groceryList);
          }}
        />}
        keyExtractor={(groceryList) => groceryList._id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const Stack = createStackNavigator();

function GroceryListSearchScreen({navigation, route}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="GroceryListSearch"
        component={GroceryListSearch}
      />
      <Stack.Screen
        name="GroceryList"
        component={GroceryListSummaryScreen}
      />
      <Stack.Screen
        name="GroceryListChecklist"
        component={GroceryListChecklistScreen}
      />
    </Stack.Navigator>
  )
}

export default StackWrapper(GroceryListSearchScreen);


import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import StackWrapper from '../navigation/StackWrapper';
import {ListItem, SearchBar} from "react-native-elements";
import GroceryListScreen from "./GroceryListScreen";
import {createStackNavigator} from "@react-navigation/stack";
import StackWrapperScreenOptions from "../constants/StackWrapperScreenOptions";
import dateFormat from 'dateformat';
import cuid from "cuid";
import {useFocusEffect} from "@react-navigation/core";

function GroceryListSearch({navigation}) {
  const [searchValue, setSearchValue] = useState('');
  const [groceryLists, updateGroceryLists] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      navigation.dangerouslyGetParent()?.setOptions(StackWrapperScreenOptions);
    });
  }, [navigation]);

  function search() {

  }

  function updateData() {
    fetch('https://grocer-app-flask.herokuapp.com/lists')
        .then((response) => response.json())
        .then((json) => {
          updateGroceryLists(json.data);
        })
        .catch((error) => {
          console.error("Error occured while getting item list");
        });
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search..."
        onChangeText={search}
        value={searchValue}
        platform="ios"
        containerStyle={{backgroundColor: 'white'}}
      />
      <FlatList
        data={groceryLists}
        horizontal={false}
        renderItem={({item}) => <ListItem
          chevron={true}
          title={item.author}
          titleStyle={{fontWeight: 'bold'}}
          subtitle={dateFormat(item.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
          onPress={() => {
            navigation.navigate("GroceryList", item);
          }}
        />}
        keyExtractor={(item) => item.id.toString()}
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
        component={GroceryListScreen}
      />
    </Stack.Navigator>
  )
}

export default StackWrapper(GroceryListSearchScreen);


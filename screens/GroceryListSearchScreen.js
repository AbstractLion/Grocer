import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import StackWrapper from '../navigation/StackWrapper';
import {ListItem, SearchBar} from "react-native-elements";
import GroceryListScreen from "./GroceryListScreen";
import {createStackNavigator} from "@react-navigation/stack";

function GroceryListSearch({navigation}) {
  const [searchValue, setSearchValue] = useState('');

  const groceryLists = [
    {
      id: 0,
      author: 'Dragon',
      createdAt: Date.now(),
      items: [
        {
          id: 36,
          title: "Dragonfruit",
          rating: 1,
          price: 20.04
        }
      ],
    },
    {
      id: 1,
      author: 'Leon',
      createdAt: Date.now(),
      items: [
        {
          id: 37,
          title: "Lion Meat",
          rating: 1,
          price: 20.04
        }
      ],
    }
  ];

  function search() {

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
          subtitle={item.createdAt}
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

function GroceryListSearchScreen() {
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


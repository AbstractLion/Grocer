import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import StackWrapper from '../navigation/StackWrapper';
import {ListItem, SearchBar} from "react-native-elements";
import GroceryListScreen from "./GroceryListScreen";
import {createStackNavigator} from "@react-navigation/stack";
import StackWrapperScreenOptions from "../constants/StackWrapperScreenOptions";

function GroceryListSearch({navigation}) {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    navigation.addListener('focus', () => {
      navigation.dangerouslyGetParent()?.setOptions(StackWrapperScreenOptions);
    });
  }, [navigation]);

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
          imageUrl: "https://qflf.files.wordpress.com/2011/03/dragon-fruit.jpg",
          price: 20.04,
          count: 523
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
          imageUrl: "https://4.bp.blogspot.com/--P2GA1UFT24/Ue4RohErWAI/AAAAAAAAT9k/L2c0KN6l65Y/s1600/2a+lion+stew+meat.JPG",
          price: 20.04,
          count: 523
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
          subtitle={'' + item.createdAt}
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


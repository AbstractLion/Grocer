import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, FlatList, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';
import GroceryItemListing from '../components/GroceryItemListing';
import StackWrapper from "../navigation/StackWrapper";
import Inventory from "../contexts/Inventory";

function GrocerySearchScreen({navigation, ...props}) {
  const [searchValue, setSearchValue] = useState('');
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const {inventory, setInventory} = useContext(Inventory);

  const items = [
    {
      id: 0,
      title: 'Bananas',
      rating: 4,
      price: 0.99,
      imageUrl: 'https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-320-80.jpg'
    },
    {
      id: 1,
      title: 'Apples',
      rating: 4,
      price: 0.99
    },
    {
      id: 2,
      title: 'Toilet Paper',
      rating: 3,
      price: 9.99
    },
    {
      id: 3,
      title: 'Hand Sanitizer',
      rating: 4,
      price: 12.99
    }
  ];

  useEffect(() => {
    const itemsObj = {};
    items.forEach((origItem) => {
      const {id, ...item} = origItem;
      itemsObj[id] = item;
    });
    setInventory(itemsObj);
  }, []);

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
        data={items}
        horizontal={false}
        numColumns={2}
        renderItem={({item}) => <GroceryItemListing
          id={item.id}
          title={item.title}
          rating={item.rating}
          price={item.price}
          imageUrl={item.imageUrl}
          showSnackbar={() => setSnackbarVisibility(true)}
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
  },
  snackbarText: {
    fontSize: 16
  },
});

export default StackWrapper(GrocerySearchScreen);


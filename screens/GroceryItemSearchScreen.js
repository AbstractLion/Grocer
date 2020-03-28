import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, FlatList, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';
import GroceryItemListing from '../components/GroceryItemListing';
import StackWrapper from "../navigation/StackWrapper";

function GroceryItemSearchScreen({navigation, ...props}) {
  const [searchValue, setSearchValue] = useState('');

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
      price: 0.99,
      imageUrl: 'https://knowledge.wharton.upenn.edu/wp-content/uploads/2014/03/apple.jpg',
    },
    {
      id: 2,
      title: 'Toilet Paper',
      rating: 3,
      price: 9.99,
      imageUrl: 'https://www.shtfplan.com/wp-content/uploads/2020/03/toiletpaper-e1584452993392.jpg',
    },
    {
      id: 3,
      title: 'Hand Sanitizer',
      rating: 4,
      price: 12.99,
      imageUrl: 'http://sites.psu.edu/siowfa14/wp-content/uploads/sites/13467/2014/10/Purell.jpg',
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
        data={items}
        horizontal={false}
        numColumns={2}
        renderItem={({item}) => <GroceryItemListing
          id={item.id}
          title={item.title}
          rating={item.rating}
          price={item.price}
          imageUrl={item.imageUrl}
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
});

export default StackWrapper(GroceryItemSearchScreen);


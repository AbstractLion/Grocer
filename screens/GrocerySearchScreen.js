import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {SearchBar} from 'react-native-elements';
import GroceryItemListing from '../components/GroceryItemListing';
import {createStackNavigator} from '@react-navigation/stack';

export default function GrocerySearchScreen(props) {
  const [searchValue, setSearchValue] = useState('');

  const items = [
    {
      title: 'Bananas',
      rating: 4,
      price: 0.99,
      imageUrl: 'https://react-native-elements.github.io/react-native-elements/docs/rating.html'
    },
    {
      title: 'Apples',
      rating: 4,
      price: 0.99
    },
    {
      title: 'Toilet Paper',
      rating: 3,
      price: 9.99
    },
    {
      title: 'Hand Sanitizer',
      rating: 4,
      price: 12.99
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
      <View style={styles.groceryItemsContainer}>
        {
          items.map((item, index) => {
            return <GroceryItemListing
              key={index}
              title={item.title}
              rating={item.rating}
              price={item.price}
            />
          })
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  groceryItemsContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
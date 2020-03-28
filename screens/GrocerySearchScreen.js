import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {SearchBar} from 'react-native-elements';
import GroceryItemListing from '../components/GroceryItemLIsting';

export default function GrocerySearchScreen(props) {
  const [searchValue, setSearchValue] = useState('');

  const items = [
    {
      imageUrl: '',
      title: 'Bananas',
      rating: 4,
      price: 0.99
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
          items.map((item) => {
            return <GroceryItemListing
              title={item.title}
              rating={item.rating}
              price={item.price}
              imageUrl={item.imageUrl}
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
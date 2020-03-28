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
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cavendish_Banana_DS.jpg/1920px-Cavendish_Banana_DS.jpg',
    },
    {
      title: 'Apples',
      rating: 4,
      price: 0.99,
      imageUrl: 'https://knowledge.wharton.upenn.edu/wp-content/uploads/2014/03/apple.jpg',
    },
    {
      title: 'Toilet Paper',
      rating: 3,
      price: 9.99,
      imageUrl: 'https://www.shtfplan.com/wp-content/uploads/2020/03/toiletpaper-e1584452993392.jpg',
    },
    {
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
      <View style={styles.groceryItemsContainer}>
        {
          items.map((item, index) => {
            return <GroceryItemListing
              key={index}
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
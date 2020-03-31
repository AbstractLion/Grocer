import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, FlatList, Text, ActivityIndicator} from 'react-native';
import {SearchBar} from 'react-native-elements';
import GroceryItemListing from '../components/GroceryItemListing';
import StackWrapper from "../navigation/StackWrapper";
import CurrentStoreContext from "../contexts/CurrentStore";
import useDidUpdate from "../hooks/useDidUpdate";

function GroceryItemSearchScreen({navigation, ...props}) {
  const [loading, setLoading] = useState(true);
  const [skipValue, setSkipValue] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [items, updateItems] = useState([]);
  const [endReached, setEndReached] = useState(false);
  const {currentStore} = useContext(CurrentStoreContext);

  async function fetchData(search, skip) {
    const response = await fetch(`https://grocerserver.herokuapp.com/items?storeId=${currentStore.id}&filter=${search}&skip=${skip}&first=16`);
    return await response.json();
  }

  useDidUpdate(() => {
    (async () => {
      if (skipValue === 0) return;
      const result = await fetchData(searchValue, skipValue);
      setEndReached(result.length < 16);
      updateItems([...items, ...result]);
    })();
  }, [skipValue]);

  useDidUpdate(() => {
    setLoading(false);
  }, [items]);

  useEffect(() => {
    (async () => {
      console.log(currentStore);
      setLoading(true);
      const result = await fetchData(searchValue, 0);
      setSkipValue(0);
      updateItems(result);
    })();
  }, [currentStore.id, searchValue]);

  function search(text) {
    const searchVal = text;
    setSearchValue(text);
    setTimeout(async () => {
      if (searchVal === searchValue) {
        console.log('test');
        await fetchData();
      }
    }, 1000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search..."
        onChangeText={(text) => search(text)}
        value={searchValue}
        platform="ios"
        containerStyle={{backgroundColor: 'white'}}
      />
      {loading ? <ActivityIndicator size="large"/> :
        <FlatList
          data={items}
          horizontal={false}
          numColumns={2}
          renderItem={({item}) => <GroceryItemListing
            _id={item._id}
            name={item.name}
            rating={item.rating}
            price={item.price}
            imageUrl={item.imageUrl}
          />}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.listContainer}
          onEndReached={() => {
            setSkipValue(skipValue + 16);
          }}
          ListFooterComponent={endReached ? null :
            <ActivityIndicator size="large" style={styles.loading}/>
          }
        />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    margin: 20
  }
});

export default StackWrapper(GroceryItemSearchScreen);


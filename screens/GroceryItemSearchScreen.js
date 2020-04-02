import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet, View, SafeAreaView, FlatList, Text, ActivityIndicator
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import GroceryItemListing from '../components/GroceryItemListing';
import StackWrapper from "../navigation/StackWrapper";
import CurrentStoreContext from "../contexts/CurrentStore";
import {createStackNavigator} from "@react-navigation/stack";
import GroceryItemOrderScreen from "./GroceryItemOrderScreen";
import useDidUpdate from "../hooks/useDidUpdate";

function GroceryItemSearch({navigation, ...props}) {
  const [loading, setLoading] = useState(true);
  const [skipValue, setSkipValue] = useState(0);
  const [searchBoxValue, setSearchBoxValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [items, updateItems] = useState([]);
  const [endReached, setEndReached] = useState(false);
  const {currentStore} = useContext(CurrentStoreContext);
  const [loadingMore, setLoadingMore] = useState(false);

  async function fetchData(skip) {
    console.log(searchValue);
    const itemsUrl = 'https://grocerserver.herokuapp.com/items?storeId=' +
    `${currentStore.id}&filter=${searchValue}&skip=${skip}&first=16`;
    const response = await fetch(itemsUrl);
    const result = await response.json();
    setEndReached(result.length < 16);
    const newItems = skip === 0 ? result : [...items, ...result];
    updateItems(newItems);
  }

  useDidUpdate(() => {
    (async () => {
      if (skipValue === 0 || endReached) return;
      await fetchData(skipValue);
    })();
  }, [skipValue]);

  useDidUpdate(() => {
    setLoading(false);
    setLoadingMore(false);
  }, [items]);

  useDidUpdate(() => {
    (async () => {
      setLoading(true);
      setSkipValue(0);
      await fetchData(0);
    })();
  }, [currentStore.id]);

  useEffect(() => {
    (async() => {
      setLoading(true);
      setSkipValue(0);
      await fetchData(0);
    })();
  }, [searchValue]);

  useEffect(() => {
    const id = setTimeout(() => {
      setSearchValue(searchBoxValue);
    }, 1000);
    return () => {
      clearTimeout(id);
    }
  }, [searchBoxValue]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search..."
        onChangeText={(text) => {
          setSearchBoxValue(text);
        }}
        value={searchBoxValue}
        platform="ios"
        containerStyle={{backgroundColor: 'white'}}
      />
      {loading ? <ActivityIndicator size="large" style={styles.loading} /> :
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
            if (!endReached) {
              setLoadingMore(true);
              setSkipValue(skipValue + 16);
            }
          }}
          ListFooterComponent={endReached ? null :
            <ActivityIndicator size="large" style={styles.loading} />
          }
          ListEmptyComponent={
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{margin: 20}}>
                Sorry, couldn't find this item in this store.
              </Text>
            </View>
          }
        />
      }
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

function GroceryItemSearchScreen() {
  return (
    <Stack.Navigator type={"modal"} screenOptions={{headerShown:false}}>
      <Stack.Screen
        component={GroceryItemSearch}
        name={"GroceryItemSearch"}
      />
      <Stack.Screen
        component={GroceryItemOrderScreen}
        name={"GroceryItemScreen"}
      />
    </Stack.Navigator>
  )
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


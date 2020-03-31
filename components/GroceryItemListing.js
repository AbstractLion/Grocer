import React, {useContext} from 'react';
import {Text, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Card, Rating} from 'react-native-elements';
import GroceryListContext from "../contexts/GroceryList";
import {useNavigation} from '@react-navigation/native';

export default React.memo(function GroceryItemListing({
	_id, name, imageUrl, rating, price
}) {
  const {groceryList, setGroceryList} = useContext(GroceryListContext);
  const navigation = useNavigation();
	return (
		<Card
			title={name}
			titleStyle={{flexWrap: 'wrap'}}
			containerStyle={styles.cardContainer}
			wrapperStyle={styles.cardWrapper}
			imageProps={{resizeMode: 'contain'}}
			image={{uri: imageUrl}}
		>
			<Rating
				imageSize={20}
				readonly
				startingValue={rating}
				style={{margin: 10}}
			/>
			<Button
				title={`\$${price.toFixed(2)}`}
				titleStyle={styles.price}
				onPress={() => {
					navigation.navigate("GroceryItemScreen", {_id, rating, name, imageUrl, price});
					/*
					groceryList[_id] = groceryList[_id] || {
						name,
						imageUrl,
						price,
						count: 0,
					};
					const count = groceryList[_id].count;
					if (count < 9) {
						const newItem = {
							...groceryList[_id],
							count: count + 1
						};
						setGroceryList({...groceryList, [_id]: newItem});
					}
					*/
				}}
			/>
		</Card>
	)
});

const styles = StyleSheet.create({
  cardContainer: {
  	width: Dimensions.get('window').width / 2 - 30,
		flex: -1,
		flexDirection: 'column'
	},
	cardWrapper: {
		flex: -1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		flexGrow: 1
	},
	price: {
		fontWeight: "bold"
	},
});
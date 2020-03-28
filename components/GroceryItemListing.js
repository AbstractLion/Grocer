import React, {useState, useContext} from 'react';
import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import { Card, Rating } from 'react-native-elements';
import GroceryListContext from "../contexts/GroceryList";
import ItemCounter from './ItemCounter';

export default function GroceryItemListing(props) {
  const {groceryList, setGroceryList} = useContext(GroceryListContext);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				activeOpacity={0.5}
				onPress={() => {
					setGroceryList({
						...groceryList,
						[props.id]: (groceryList[props.id] ?? 0) + 1
					});
					props.showSnackbar();
				}}
			>
				<Card
					title={props.title}
					containerStyle={styles.container}
					imageProps={{
						resizeMode: 'contain'
					}}
					image={{uri: props.imageUrl}}
				>
					<Rating
						imageSize={20}
						readonly
						startingValue={props.rating}
					/>
					<Text style={styles.price}>${props.price}</Text>
				</Card>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
		flexGrow: 1
	},
	price: {
		fontWeight: "bold"
	},
});
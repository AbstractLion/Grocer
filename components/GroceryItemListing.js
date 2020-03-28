import React, {useContext} from 'react';
import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { Card, Rating } from 'react-native-elements';
import GroceryListContext from "../contexts/GroceryList";

export default function GroceryItemListing(props) {
  const {groceryList, setGroceryList} = useContext(GroceryListContext);

	return (
		<TouchableOpacity
			activeOpacity={0.5}
			style={styles.container}
			onPress={() => {
				setGroceryList({
					...groceryList,
					[props.id]: (groceryList[props.id] ?? 0) + 1
				})
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
	)
}

const styles = StyleSheet.create({
  container: {
		flexGrow: 1
	},
	price: {
		fontWeight: "bold"
	}
});
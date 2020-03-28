import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Card, Rating } from 'react-native-elements';
import GroceryListContext from "../contexts/GroceryList";

export default function GroceryItemListing({
	id,
	title,
	imageUrl,
	rating,
	price
}) {
  const {groceryList, setGroceryList} = useContext(GroceryListContext);

	return (
		<TouchableOpacity
      style={styles.container}
			activeOpacity={0.5}
			onPress={() => {
				groceryList[id] = groceryList[id] || {
					title,
					imageUrl,
					price,
					count: 0,
				};
				const count = groceryList[id].count;
				if (count < 9) {
					const newItem = {
						...groceryList[id],
						count: count + 1
			    };
					setGroceryList({...groceryList, [id]: newItem});
				}
			}}
		>
			<Card
				title={title}
        titleStyle={{flexWrap: 'wrap'}}

				containerStyle={styles.container}
				imageProps={{
					resizeMode: 'contain'
				}}
				image={{uri: imageUrl}}
			>
				<Rating
					imageSize={20}
					readonly
					startingValue={rating}
				/>
				<Text style={styles.price}>${price}</Text>
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
	},
});
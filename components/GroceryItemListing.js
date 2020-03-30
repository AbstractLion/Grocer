import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button, Card, Rating} from 'react-native-elements';
import GroceryListContext from "../contexts/GroceryList";

export default function GroceryItemListing({
	id,
	name,
	imageUrl,
	rating,
	price
}) {
  const {groceryList, setGroceryList} = useContext(GroceryListContext);

	return (
			<Card
				title={name}
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
				<Button
					title={`\$${price}`}
          titleStyle={styles.price}
					onPress={() => {
						groceryList[id] = groceryList[id] || {
							name,
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
				/>
			</Card>
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
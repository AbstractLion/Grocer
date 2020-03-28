import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { Card, Rating } from 'react-native-elements';

export default function GroceryItemListing(props) {
	return (
		<Card title={props.title}>
			<Image
				style={styles.itemStyle}
				source={{
					uri: props.imageUrl,
				}}
			/>
			<Rating
				imageSize={20}
				readonly
				startingValue={props.rating}
			/>
			<Text style={styles.textStyle}>${props.price}</Text>
		</Card>
	)
}

const styles = StyleSheet.create({
	itemStyle: {
		width: 100,
		height: 100,
	},
	textStyle: {
		fontWeight: "bold"
	}
});
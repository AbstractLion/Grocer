import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { Card } from 'react-native-elements';

export default function GroceryItemListing(props) {
	return (
		<Card title={props.title}>
			<Image
				style={styles.itemStyle}
				source={{
					uri: props.imageUrl,
				}}
			/>
			<Text>{props.rating}</Text>
			<Text>${props.price}</Text>
		</Card>
	)
}

const styles = StyleSheet.create({
	itemStyle: {
		width: 100,
		height: 100,
	},
});
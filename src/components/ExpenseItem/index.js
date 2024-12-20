import React from "react";
import { StyleSheet } from "react-native";
import { ListItem, Text } from "react-native-ui-lib";

const ExpenseItem = ({ data }) => {
	return (
		<>
			<ListItem.Part left>
				<Text style={styles.text_bold} numberOfLines={2}>
					{data.text}
				</Text>
			</ListItem.Part>
			<ListItem.Part middle containerStyle={styles.secondCol}>
				<Text style={styles.text_small}>{data.created_at}</Text>
			</ListItem.Part>
			<ListItem.Part>
				<Text style={styles.text_bold}>{data.valueEuros}</Text>
			</ListItem.Part>
		</>
	);
};

const styles = StyleSheet.create({
	secondCol: {
		marginLeft: 10,
	},
	text_bold: {
		fontSize: 16,
		fontWeight: "600",
	},
	text_small: {
		fontSize: 14,
		color: "#88888",
		fontWeight: "200",
	},
});

export default ExpenseItem;

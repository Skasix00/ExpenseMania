import React from "react";
import ExpenseItem from "../ExpenseItem";
import { FlatList, StyleSheet } from "react-native";
import { ListItem } from "react-native-ui-lib";

export default function TodoList({ data }) {
	if (!Array.isArray(data)) {
		console.error("Expected data to be an array but received:", data);
		return null;
	}

	return (
		<FlatList
			style={styles.list}
			data={data}
			keyExtractor={(item, index) => index.toString()}
			renderItem={({ item }) => (
				<ListItem style={styles.list_item} onPress={() => alert(item.description)}>
					<ExpenseItem data={item} />
				</ListItem>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	list: {
		padding: 20,
	},
	list_item: {
		borderWidth: 1,
		borderTopColor: "#d2d9d4",
		borderStartWidth: 0,
		borderEndWidth: 0,
		borderBottomWidth: 0,
	},
});

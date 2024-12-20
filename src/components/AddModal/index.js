import React, { useState } from "react";
import { Dimensions, Modal, Pressable, StyleSheet } from "react-native";
import { NumberInput, Text, TextField, View } from "react-native-ui-lib";

const isLandscape = width > height;
const { width, height } = Dimensions.get("window");

export default function AddModal({ setModalVisible, modalVisible, onAddExpense }) {
	const [text, setText] = useState("");
	const [valueEuros, setValueEuros] = useState(0);
	const [created_at, setCreatedAt] = useState("");
	const [description, setDescription] = useState("");

	async function handleDataInsertion() {
		const expense = {
			text,
			valueEuros,
			created_at,
			description,
		};

		if (!expense.text || !expense.valueEuros || !expense.created_at || !expense.description) {
			console.log(expense);
			console.error("All fields are required.");
			return;
		}

		try {
			await onAddExpense(expense);
			console.log("Despesa adicionada:", expense);

			setText("");
			setValueEuros(0);
			setCreatedAt("");
			setDescription("");

			setModalVisible(false);
		} catch (error) {
			console.error("Error saving expense:", error);
		}
	}

	return (
		<Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
			<View style={styles.modalView}>
				<View style={styles.inputView}>
					<TextField
						onChangeText={(value) => setText(value)}
						value={text}
						placeholder='O que aconteceu?'
						enableErrors
						validate={["required", (value) => value.length !== 0]}
						validationMessage={["Preencha a despesa", "Não indicou a despesa"]}
						showCharCounter
						maxLength={50}
						style={styles.inputField}
						showClearButton={true}
					/>

					<NumberInput
						initialNumber={valueEuros}
						trailingText={"€"}
						containerStyle={styles.inputField}
						textFieldProps={styles.number}
						onChangeNumber={(value) => {
							console.log(value);
							setValueEuros(parseFloat(value.formattedNumber) || 0);
						}}
						value={valueEuros.toFixed(2)}
					/>
					{/* <TextField
						style={styles.inputField}
						onChangeText={(value) => setValueEuros(parseFloat(value) || 0)}
						value={valueEuros.toString()}
						placeholder='Valor em €'
						enableErrors
						validate={["required", (value) => parseFloat(value) > 0]}
						validationMessage={["Insira o valor", "Valor deve ser maior que zero"]}
						showCharCounter
						maxLength={5}
						showClearButton={true}
					/> */}
					<TextField
						style={styles.inputField}
						onChangeText={(value) => setCreatedAt(value)}
						value={created_at}
						placeholder='Data da despesa'
						enableErrors
						validate={["required", (value) => value.length !== 0]}
						validationMessage={["Data é obrigatória", "Insira a data"]}
						showCharCounter
						maxLength={10}
						showClearButton={true}
					/>
					<TextField
						style={styles.inputFieldDesc}
						onChangeText={(value) => setDescription(value)}
						value={description}
						placeholder='Descrição'
						enableErrors
						validate={["required", (value) => value.length !== 0]}
						validationMessage={["Descrição é obrigatória", "Insira a descrição"]}
						showCharCounter
						maxLength={200}
						showClearButton={true}
						multiline={true}
						textAlignVertical='top'
					/>
				</View>
				<View style={styles.buttonGroup}>
					<Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
						<Text style={styles.text}>Cancelar</Text>
					</Pressable>
					<Pressable style={[styles.button, styles.buttonSave]} onPress={handleDataInsertion}>
						<Text style={styles.text}>Salvar</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}
const styles = StyleSheet.create({
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		height: isLandscape ? height * 0.6 : height * 0.8,
		width: width * 0.9,
		justifyContent: "space-between",
	},
	inputView: {
		flexDirection: "column",
		marginBottom: 100,
	},
	inputField: {
		marginBottom: 15,
		fontSize: 20,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 10,
		padding: 15,
		width: "100%",
		height: 60,
		maxWidth: "90%",
	},
	inputFieldDesc: {
		marginBottom: 15,
		fontSize: 20,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 10,
		padding: 10,
		flexWrap: "wrap",
		width: "100%",
		height: 200,
		maxWidth: "90%",
	},
	buttonGroup: {
		position: "absolute",
		bottom: 20,
		left: 20,
		right: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: 10,
	},
	button: {
		flex: 1,
		borderRadius: 10,
		padding: 10,
	},
	buttonClose: {
		backgroundColor: "#f44336",
		marginRight: 10,
	},
	buttonSave: {
		backgroundColor: "#4CAF50",
		marginLeft: 10,
	},
	text: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	number: {
		fontSize: 20,
	},
});

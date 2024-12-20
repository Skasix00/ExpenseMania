// Parent Component
import { StatusBar } from "expo-status-bar";
import TodoList from "./src/components/List";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-ui-lib";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { getMonth, getYear } from "./src/utils/utils";
import AddModal from "./src/components/AddModal";

export default function App() {
	const [modalVisible, setModalVisible] = useState(false);
	const [data, setData] = useState([]);
	const [totalMes, setTotalMes] = useState(0);
	const [totalMesPassado, setTotalMesPassado] = useState(0);
	const [totalAno, setTotalAno] = useState(0);

	const totalTimes = data.length;

	let currentYear = getYear();
	let currentMonth = getMonth();

	const loadExpenses = async () => {
		try {
			const storedExpenses = await AsyncStorage.getItem("expenses");
			if (storedExpenses) {
				setData(JSON.parse(storedExpenses));
			}
		} catch (error) {
			console.error("Failed to load expenses:", error);
		}
	};

	function calculateMonthTotal() {
		let total = 0;

		if (data && currentMonth && currentYear) {
			const filteredDate = data.filter((item) => {
				const [day, month, year] = item.created_at.split("-");
				return parseInt(year) === currentYear && parseInt(month) === currentMonth;
			});

			if (filteredDate.length > 0) {
				filteredDate.forEach((item) => {
					return (total += item.valueEuros);
				});
			}

			setTotalMes(parseFloat(total).toFixed(2));
		}
	}

	function calculatePastMonthTotal() {
		let total = 0;

		if (currentMonth === 1) {
			currentMonth = 12;
			currentYear -= 1;
		} else {
			currentMonth -= 1;
		}

		if (data && currentMonth && currentYear) {
			const filteredDate = data.filter((item) => {
				const [day, month, year] = item.created_at.split("-");
				return parseInt(year) === currentYear && parseInt(month) === currentMonth;
			});

			if (filteredDate.length > 0) {
				filteredDate.forEach((item) => {
					total += item.valueEuros;
				});
			}

			setTotalMesPassado(parseFloat(total).toFixed(2));
		}
	}

	function calculateYearTotal() {
		let total = 0;

		if (data && currentMonth && currentYear) {
			const filteredDate = data.filter((item) => {
				const [day, month, year] = item.created_at.split("-");
				return parseInt(year) === currentYear;
			});

			if (filteredDate.length > 0) {
				filteredDate.forEach((item) => {
					return (total += item.valueEuros);
				});
			}

			setTotalAno(parseFloat(total).toFixed(2));
		}
	}

	useEffect(() => {
		loadExpenses();
	}, []);

	useEffect(() => {
		calculateMonthTotal();
		calculateYearTotal();
		calculatePastMonthTotal();
	}, [data]);

	const addExpense = async (newExpense) => {
		try {
			const updatedExpenses = [...data, newExpense];
			setData(updatedExpenses);
			await AsyncStorage.setItem("expenses", JSON.stringify(updatedExpenses));
		} catch (error) {
			console.error("Failed to add expense:", error);
		}
	};

	return (
		<SafeAreaView>
			<View style={styles.headerContainer}>
				<Text style={styles.title}>Monthly Expense Tracker</Text>
				<TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
					<Text style={{ color: "white", fontSize: 18 }}>+</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.totalValuesContainer}>
				<Text style={styles.text}>M/Atual:{totalMes}€</Text>
				<Text style={styles.text}>M/Anterior:{totalMesPassado}€</Text>
				<Text style={styles.text}>Tot. Ano :{totalAno}€</Text>
				<Text style={styles.text}>Quant.:{totalTimes}</Text>
			</View>
			{data.length !== 0 ? (
				<ScrollView style={styles.expenseListContainer}>
					<TodoList data={data} />
				</ScrollView>
			) : (
				<Text style={styles.text}>Sem despesas para mostrar</Text>
			)}
			<AddModal setModalVisible={setModalVisible} modalVisible={modalVisible} onAddExpense={addExpense} />
			<StatusBar style='auto' />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	title: {
		textAlignVertical: "center",
		textAlign: "center",
		color: "#888888",
		fontSize: 28,
		padding: 5,
	},
	expenseListContainer: {
		marginTop: 25,
	},
	totalValuesContainer: {
		marginTop: 5,
		padding: 15,
		flex: 1,
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	text: {
		fontSize: 16,
		color: "#888888",
	},
	headerContainer: {
		position: "relative",
		alignItems: "center",
		marginBottom: 10,
		marginTop: 10,
	},
	floatingButton: {
		position: "absolute",
		right: 15,
		top: "50%",
		transform: [{ translateY: -20 }],
		width: 40,
		height: 40,
		backgroundColor: "red",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
	},
});

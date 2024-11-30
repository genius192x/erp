import {
	defineStore
} from 'pinia'
import {
	ref
} from "vue";
import { useUserStore } from './UserStore';
import { Client, Databases, ID } from "appwrite";

export const useTableStore = defineStore('tableStore', () => {
	const table = ref()
	const stats = ref()
	const hasDocument = ref(false)

	const client = new Client()
		.setEndpoint('https://cloud.appwrite.io/v1')
		.setProject('67346ca300224abdf68b');

	const databases = new Databases(client);
	const createDocument = async function (data) {
		await databases.createDocument(
			'673f8cd6003af5ea79f0', // databaseId
			'6745eb78000421112d12', // collectionId
			useUserStore().userData.$id, // documentId
			{"data" : JSON.stringify(data)}
    ).then(function (response) {
      console.log('response',response);

			getDocument()
		}).catch(function (error) {
      console.log(error);

		})
	}
	async function getDocument(){
		await databases.getDocument(
				'673f8cd6003af5ea79f0', // databaseId
				'6745eb78000421112d12', // collectionId
				useUserStore().userData.$id // documentId
    ).then(function (response) {
      console.log('response', response);

			table.value = normolizeData(JSON.parse(response.data))
			stats.value = processTable(JSON.parse(response.data))
			normolizeData(JSON.parse(response.data))
			hasDocument.value = true
		}).catch(function (error) {
			console.log(error);

		})
	}
	function normolizeData(data) {
		let result = []
		data.forEach((row, index) => {

			const [
				month, // Месяц (название)
				year, // Год
				monthCount, // Число месяца
				date, // Дата
				summ, // Назначение платежа
				name, // Название
				type, // Статья
				wallet, // Кошелек
				contr, //  Контрагент
			] = row;
			if (index !== 0) {
				result.push({
					month,
					year,
					monthCount,
					date,
					summ,
					name,
					type,
					wallet,
					contr,
				});
			}
		})
		result.forEach((row) => {
			row.summ = row.summ
		})
		return result

	}
	function processTable(rows) {
		const result = {}; // Объект для хранения данных по месяцам

		rows.forEach((row) => {

			const [
				month, // Месяц (название)
				year, // Год
				day, // Число
				amount, // Сумма
				purpose, // Назначение платежа
				category, // Статья
				wallet, // Кошелёк
				paymentType, // Платёж/поступление
				direction // Направление
			] = row;

			// Конвертация месяца в число
			const monthMap = {
				"Январь": 1, "Февраль": 2, "Март": 3, "Апрель": 4,
				"Май": 5, "Июнь": 6, "Июль": 7, "Август": 8,
				"Сентябрь": 9, "Октябрь": 10, "Ноябрь": 11, "Декабрь": 12
			};

			const monthNumber = monthMap[month];
			if (!monthNumber) return; // Пропуск некорректных данных

			const key = `${year}-${String(monthNumber).padStart(2, "0")}`; // Ключ, например "2024-01"

			// Инициализация структуры месяца
			if (!result[key]) {
				result[key] = {
					year,
					name: month,
					month: monthNumber,
					operations: [],
					totalExpenses: 0,
					totalIncomes: 0,
				};
			}

			// Добавляем операцию в массив
			result[key].operations.push({
				date: `${year}-${String(monthNumber).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
				amount: parseFloat(amount),
				purpose,
				category,
				wallet,
				paymentType,
				direction,
			});

			// Считаем сумму доходов и расходов
			if (purpose && purpose < 0) {
					result[key].totalExpenses +=Math.abs(purpose);
			} else if(purpose > 0) {
				result[key].totalIncomes += purpose;
			};

		});

		// Преобразуем в массив и сортируем по календарному порядку
		const sortedResult = Object.entries(result)
				.filter(([key]) => key !== "Год-Месяц") // Убираем ненужный ключ
				.sort(([a], [b]) => new Date(a) - new Date(b)) // Сортируем по дате
				.map(([key, value]) => value); // Преобразуем в массив объектов

		return sortedResult;
	}


	return {
		table,
		stats,
		hasDocument,
    createDocument,
    normolizeData,
		processTable,
		getDocument
	}
})
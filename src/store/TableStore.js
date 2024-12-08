import {
	defineStore
} from 'pinia'
import {
	ref
} from "vue";
import { useUserStore } from './UserStore';
import { Client, Databases, ID } from "appwrite";
import { rows } from '@unovis/ts/components/timeline/style';

export const useTableStore = defineStore('tableStore', () => {
	const table = ref()
	const stats = ref()
	const rowsItems = ref([])
	const hasDocument = ref(false)

	const client = new Client()
		.setEndpoint('https://cloud.appwrite.io/v1')
		.setProject('67346ca300224abdf68b');

	const databases = new Databases(client);

	const updateDocument = async function (data) {

		const monthMap = {
				1:"Январь",  2:"Февраль",  3:"Март", 4:"Апрель",
				5:"Май",  6:"Июнь",  7:"Июль", 8: "Август",
				9:"Сентябрь",  10:"Октябрь", 11:"Ноябрь", 12: "Декабрь"
			};
		data.month = monthMap[data.monthCount]
		if (data.paymentType === 'Выбытие') {
			data.summ = -data.summ
		}

		let result = [
			data.month,
			data.year,
			data.monthCount,
			data.date,
			data.summ,
			data.name,
			data.type,
			'Банк',//TODO убери
			null,
			data.contragent,
			data.type,
			data.paymentType,
		]
		rowsItems.value.unshift(result)

		await databases.updateDocument(
			'673f8cd6003af5ea79f0', // databaseId
			'6745eb78000421112d12', // collectionId
			useUserStore().userData.$id, // documentId
			{"data" : JSON.stringify(rowsItems.value)}, // data (optional)
		).then(function (response) {
			getDocument()
		})
	}


	const createDocument = async function (data) {
		await databases.createDocument(
			'673f8cd6003af5ea79f0', // databaseId
			'6745eb78000421112d12', // collectionId
			useUserStore().userData.$id, // documentId
			{"data" : JSON.stringify(data)}
    ).then(function (response) {

			getDocument()
		}).catch(function (error) {
      console.log(error);

		})
	}
  async function getDocument() {

    /*
    локальный вариант хранения
    */
    // table.value = normolizeData(JSON.parse(localStorage.getItem('data')))
    // stats.value = processTable(JSON.parse(localStorage.getItem('data')))
		// hasDocument.value = true

		await databases.getDocument(
				'673f8cd6003af5ea79f0', // databaseId
				'6745eb78000421112d12', // collectionId
				useUserStore().userData.$id // documentId
    ).then(function (response) {
			rowsItems.value = JSON.parse(response.data)
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
        monthCount,// Число месяца
				date, // Число
				summ, // Сумма
				name, // Назначение платежа
				type, // Статья
        wallet, // Кошелёк
        contr, // Контрагент
        paymentCategory, // Тип статьи
        categoryType, // Тип статьи
				paymentType, // Платёж/поступление
				direction // Направление
			] = row || '-';

			if (month !== "Месяц") {
				if (name && summ) {
					result.push({
						month,
						year,
						monthCount,
						date,
						summ,
						categoryType,
						name,
						type,
						paymentType,
						paymentCategory,
						wallet,
						contr,
					});
				}
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
        monthCount,// Число месяца
				day, // Число
				amount, // Сумма
				purpose, // Назначение платежа
				category, // Статья
        wallet, // Кошелёк
        contrAgent, // Контрагент
        paymentCategory, // Тип статьи
        categoryType, // Тип статьи
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
			if (amount && amount < 0) {
					result[key].totalExpenses +=Math.abs(amount);
			} else if(amount > 0) {
				result[key].totalIncomes += amount;
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
		rowsItems,
		hasDocument,
    createDocument,
		normolizeData,
		updateDocument,
		processTable,
		getDocument,
	}
})
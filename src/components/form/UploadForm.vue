<script setup lang="ts">
import readXlsxFile from 'read-excel-file'
import { useTableStore } from '@/store/TableStore.js'
import { gsap } from 'gsap'

const tableStore = useTableStore()

function showFile(e) {
	console.log(e.target);

	readXlsxFile(e.target.files[0], { sheet: 3 }).then((rows) => {
		// `rows` is an array of rows
		tableStore.stats = rows
    console.log(rows);

    tableStore.createDocument(rows)
    // let data = JSON.stringify(rows)
    // tableStore.table = tableStore.normolizeData(JSON.parse(data))
    // tableStore.stats = tableStore.processTable(JSON.parse(data))
    // tableStore.hasDocument = true

		// each row being an array of cells.
	}).finally(() => {
		const nums = document.querySelectorAll(".anim-num");
		gsap.from(nums, {
			textContent: 0,
			duration: 2,
			snap: { textContent: 1 },
		});
	})
}
</script>
<template>
	<div class="flex items-center justify-center w-full">
    <label for="dropzone-file" class="flex relative flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Нажмите чтобы выбрать файл</span> <br>или перетащите его в эту область</p>
            <p class="text-xs text-gray-500 dark:text-gray-400"> Поддерживаемые форматы: XLS, XLSM, XLSX</p>
        </div>
        <input id="dropzone-file" type="file" class="opacity-0 absolute w-full h-full" @change="showFile"/>
    </label>
	</div>
</template>
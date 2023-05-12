const readline = require('readline');
const fs = require('fs');
const fileStream = fs.createReadStream('test.txt');
let rl = readline.createInterface(fileStream || process.stdin, process.stdout);

const MAX = 1,
	MIN = 0;

let numberOfLine = 0,
	result = 0; // номер строки и результат

let numberOfStudents, maxSumScore; // кол-во студентов и максимальный общий балл
let scores = []; // массив данных баллов студентов

// функция возврата среднего арифметического
const average = (min, max) => {
	return (min + max) / 2;
};

// сортировка массива по среднему значению подмассивов
const sortScoresByAverage = () => {
	let swapped;
	while (true) {
		swapped = false;
		for (let i = 0; i < scores.length - 1; i++) {
			if (
				average(scores[i][MIN], scores[i][MAX]) >
				average(scores[i + 1][MIN], scores[i + 1][MAX])
			) {
				[scores[i], scores[i + 1]] = [scores[i + 1], scores[i]];
				swapped = true;
			}
		}
		if (!swapped) return;
	}
};

// функция возврата значения из массива, которое больше чем num
const pickFromArrayMoreThan = (arr, num) => {
	for (let i = arr[MIN]; i <= arr[MAX]; i++) {
		if (i > num) return i;
	}
};

const findMaxMedian = (scores, medianIndex) => {
	let prevValue = null, // сохраненное предыдущее значение
		curValue = 0, // сумма массива баллов
		increasedAll = true; // флаг успешного увеличения всех значений после медианного значения
	let sumArray = []; // копия массива для изменения значений в нём

	// заполнить массив возрастающей последовательностью
	for (let i = 0; i < scores.length; i++) {
		if (prevValue === null) {
			prevValue = scores[i][MIN];
			sumArray.push(prevValue);
		} else {
			prevValue = pickFromArrayMoreThan(scores[i], prevValue);
			sumArray.push(prevValue);
		}
	}

	prevValue = sumArray.slice(); // сохранить полученную последовательность баллов

	// цикл пробного увеличения баллов после медианного значения
	while (increasedAll) {
		increasedAll = true; // флаг успешного увеличения второй половины массива
		curValue = 0; // обнуление текущей суммы новой последовательности

		// цикл по второй половине массива последовательности баллов
		for (let i = medianIndex; i < sumArray.length; i++) {
			// если текущее число больше увеличенного предыдущего - его можно пропустить (порядок последовательности сохраняется)
			// если предыдущее увеличенное стало больше текущего - увеличить текущее
			if (!(i !== medianIndex && sumArray[i] >= sumArray[i - 1])) {
				if (sumArray[i] < scores[i][MAX]) {
					// если диапазон не достиг предела
					sumArray[i]++; // увеличить число
				} else {
					// если диапазон достигнут - последовательность нарушается - цепочку больше нельзя увеличить - поднять флаг
					increasedAll = false;
				}
			}
		}

		// сохранить текущее значение суммы баллов
		curValue = sumArray.reduce((sum, i) => sum + i, 0);

		// если последовательность была увеличена и текущая сумма баллов меньше заданного максимума
		if (increasedAll && curValue <= maxSumScore) {
			// сохранить последовательность
			prevValue = sumArray.slice();
		} else {
			// иначе последовательность увеличить нельзя - вернуть медианное значение последней последовательности
			return prevValue[medianIndex];
		}
	}
};

rl.on('line', string => {
	if (numberOfLine === 0) {
		// считывание кол-ва учеников и максимального балла
		const arr = string.split(' ').map(Number);
		(numberOfStudents = arr[MIN]), (maxSumScore = arr[MAX]);
		numberOfLine++;
	} else {
		// считывание строк с баллами
		scores.push(string.split(' ').map(Number));
		numberOfLine++;

		// алгоритм
		if (numberOfLine === numberOfStudents + 1) {
			sortScoresByAverage(); // отсортировать массив баллов по средним значениям подмассивов
			result = findMaxMedian(scores, Math.floor(scores.length / 2)); // найти максимальную медиану

			rl.close();
			console.log(result);
		}
	}
});

const readline = require('readline');
const fs = require('fs');
const fileStream = fs.createReadStream('test.txt');
let rl = readline.createInterface(fileStream || process.stdin, process.stdout);

const YES = 'YES',
	NO = 'NO';
const ASCENDING = 0,
	DESCENDING = 1;

let arr,
	direction,
	orderErrorOccurred = false;

// функция сравнения двух элементов (в зависимости от направления)
// true = порядок соблюдается, false = порядок нарушается
const checkElements = (first, second, direction) => {
	if (direction === ASCENDING) {
		// ascending
		return first <= second ? true : false;
	} else {
		// descending
		return first >= second ? true : false;
	}
};

rl.on('line', string => {
	arr = string.split(' ');
	rl.close();

	// определить направление для проверки
	for (let i = 0; i < arr.length - 1; i++) {
		if (arr[i] === arr[i + 1]) {
			continue;
		}
		arr[i] < arr[i + 1] ? (direction = ASCENDING) : (direction = DESCENDING);
		break;
	}

	// пошаговое сравнение двух элементов
	for (let i = 0; i < arr.length - 1; i++) {
		if (checkElements(arr[i], arr[i + 1], direction)) {
			continue;
		} else {
			// если порядок был нарушен = закончить выполнение
			orderErrorOccurred = true;
			break;
		}
	}

	orderErrorOccurred ? console.log(NO) : console.log(YES);
});

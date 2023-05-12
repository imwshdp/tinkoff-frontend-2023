const readline = require('readline');
const fs = require('fs');
const fileStream = fs.createReadStream('test.txt');
let rl = readline.createInterface(fileStream || process.stdin, process.stdout);

let firstLine = true;
let len, arr;

// функция, проверяющая вхождение 'нормального' отрезка в срез
const isArrayContainsAnyOfNormals = (sliced, normals) => {
	const strSliced = sliced.toString();

	for (const normal of normals) {
		const strNormal = normal.toString();
		if (strSliced.includes(strNormal)) {
			return true;
		}
	}
	return false;
};

// функция проверки 'нормальности' отрезка
const checkSliceForNormal = (sliced, normals) => {
	// если срез имеет один элемент, то срез будет 'нормальным' при равенстве его нулю
	if (sliced.length === 1) {
		if (sliced[0] === 0) {
			normals.push(sliced);
		}
		// если срез имеет больше одного элемента
		// он будет 'нормальным' при вхождении в него 'нормального' отрезка
		// либо если сумма его элементов будет равна нулю
	} else {
		if (
			isArrayContainsAnyOfNormals(sliced, normals) ||
			sliced.reduce((sum, i) => sum + i, 0) === 0
		) {
			normals.push(sliced);
		}
	}
};

rl.on('line', string => {
	if (firstLine) {
		len = +string;
		firstLine = !firstLine;
	} else {
		arr = string.split(' ').map(Number);

		let currentLen = 1,
			sliced;
		let normals = [];

		// обход всех возможных длин отрезков
		while (currentLen <= len) {
			// обход всех срезов с данной длиной
			for (let i = 0; i <= len - currentLen; i++) {
				sliced = arr.slice(i, i + currentLen);
				// проверка среза на нормальность
				checkSliceForNormal(sliced, normals);
			}

			currentLen++; // увеличение длины отрезка
		}

		rl.close();
		console.log(normals.length);
	}
});

const readline = require('readline');
const fs = require('fs');
const fileStream = fs.createReadStream('test.txt');
let rl = readline.createInterface(fileStream || process.stdin, process.stdout);

let firstLine = true,
	l = 0;

rl.on('line', string => {
	if (firstLine) {
		l = +string; // сохранить длину строки
		firstLine = !firstLine;
	} else {
		let arr = string.split(' ').map(Number);
		let entriesNumber = []; // массив повторений чисел в массиве
		let result = l; // результат (длина)

		cycle: while (l >= 2) {
			// обход всех возможных подстрок
			let copy = arr.slice(); // взять копию массива

			for (let el of copy) {
				// для каждого символа в подстроке
				const quantity = copy
					.filter(i => i === el)
					.reduce((acc, i) => acc + 1, 0); // получить количество повторений символа в массиве
				if (quantity) {
					entriesNumber.push(quantity); // добавить кол-во в массив повторений
					copy = copy.filter(i => i !== el); // отфильтровать копию массива
				}
			}

			const mySet = new Set(entriesNumber); // создать множество из значений вхождений
			const myArr = Array.from(mySet); // создать массив из множества

			if (
				mySet.size === 2 && // если встречаются только два вхождения и одно из них - единица
				(entriesNumber.filter(i => i === 1).reduce((acc, i) => acc + 1, 0) ===
					1 || // ИЛИ
					(Math.abs(myArr[0] - myArr[1]) === 1 && // одно вхождение больше другого на единицу
						myArr[0] !== 1 &&
						myArr[1] !== 1)) // и оба вхождения не являются единицей
			) {
				result = l; // сохранить длину этой подстроки
				break cycle; // выйти из цикла
			}

			l--; // уменьшить длину для следующих подстрок
			arr.pop(); // удалить последний элемент массива
			entriesNumber = []; // очистить массив вхождений
		}

		rl.close();
		console.log(result);
	}
});

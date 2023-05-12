const readline = require('readline');
const fs = require('fs');
const fileStream = fs.createReadStream('test.txt');
let rl = readline.createInterface(fileStream || process.stdin, process.stdout);

let result = -1,
	firstLine = true;
let len, str;

const symbols = ['a', 'b', 'c', 'd']; // символы вхождения для статуса 'хорошей' строки
const lettersNum = symbols.length; // длина массива 'хороших' символов

// функция проверки вхождения 'хороших' символов в строке
// true = все символы входят в строку - строка является 'хорошей'
// false = какой-либо из символов не входит в строку
const checkGoodSubstr = str => {
	for (let symbol of symbols) {
		if (str.indexOf(symbol) === -1) return false;
	}
	return true;
};

rl.on('line', string => {
	if (firstLine) {
		len = +string; // сохранить длину строки
		firstLine = !firstLine;
	} else {
		str = string; // сохранить строку
		let minLen = lettersNum; // выбрать минимальную длину 'хорошей' строки

		cycle: while (minLen <= len) {
			// цикл от минимальной длины подстроки до длины строки
			for (let i = 0; i <= len - minLen; i++) {
				// обход строки
				const candidate = str.slice(i, i + minLen);

				if (new Set(candidate).size >= lettersNum) {
					// если в подстроке подходящее количество символов
					// проверить строку на статус 'хорошей'
					if (checkGoodSubstr(candidate)) {
						// если строка подходит - сохранить длину подстроки
						result = candidate.length;
						break cycle; // выйти из цикла
					}
				}
			}
			minLen++; // увеличить длину следующих подстрок
		}

		rl.close();
		console.log(result);
	}
});

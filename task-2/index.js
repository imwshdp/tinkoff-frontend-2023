const readline = require('readline');
const fs = require('fs');
const fileStream = fs.createReadStream('test.txt');
let rl = readline.createInterface(fileStream || process.stdin, process.stdout);

rl.on('line', string => {
	// n - количество джуниор-разработчиков
	// m - количество сеньор-разработчиков
	// k - необходимое количество проверок работ от сеньоров
	const [n, m, k] = string.split(' ').map(Number);

	const juniorWorks = Array(n).fill(0, 0); // массив состояний работ (с количеством проверок)
	let busySeniors, worksReviewed; // кол-во занятых сеньоров, кол-во проверенных работ
	let timeInMin = 0; // затраченное время на проверки

	while (true) {
		(busySeniors = 0), (worksReviewed = 0);

		for (let i = 0; i < juniorWorks.length; i++) {
			// цикл раздачи работ на проверку
			if (busySeniors >= m) break; // если уже загружены все сеньоры - прервать цикл
			if (juniorWorks[i] === k) {
				// если работа проверена достаточное кол-во раз
				worksReviewed++; // увеличить счетчик проверенных работ
				continue;
			}

			busySeniors++; // увеличить счетчик занятых сеньоров
			juniorWorks[i] = juniorWorks[i] + 1; // отметить проверку работы
		}

		if (worksReviewed === n) break; // если все работы проверены k раз - закончить алгоритм
		timeInMin++; // увеличить счетчик времени
		juniorWorks.sort(); // отсортировать массив работ по возрастанию для оптимизации проверок
	}

	rl.close();
	console.log(timeInMin);
});

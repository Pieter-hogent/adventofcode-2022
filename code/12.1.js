const fs = require('fs');
const { resolve } = require('path');

// S: 83
// E: 69

const possible_steps = ({ x, y }, data) => {
	let current = data[y][x];
	let steps = [];
	if (data[y][x - 1] <= current + 1) steps.push({ x: x - 1, y });
	if (data[y][x + 1] <= current + 1) steps.push({ x: x + 1, y });
	if (data[y - 1][x] <= current + 1) steps.push({ x, y: y - 1 });
	if (data[y + 1][x] <= current + 1) steps.push({ x, y: y + 1 });
	return steps;
}

function solve(filename) {
	let data = fs
		.readFileSync(resolve(process.cwd(), filename), 'utf8')
		.trim()
		.split('\n').map(x => x.split(''));

	data = data.map(x => x.map(y => y.charCodeAt(0)))

	// add walls around the map
	data = data.map(x => [999, ...x, 999]);
	data = [new Array(data[0].length).fill(999), ...data, new Array(data[0].length).fill(999)]

	let start = { x: 0, y: 0 };
	let end = { x: 0, y: 0 };
	data.forEach((y, index) => {
		y.forEach((x, index2) => {
			if (x === 83) start = { x: index2, y: index };
			if (x === 69) end = { x: index2, y: index };
		});
	});
	data[start.y][start.x] = 97;
	data[end.y][end.x] = 122;

	let shortest_route = (new Array(data.length).fill(0)).map(x => new Array(data[0].length).fill(-1));
	shortest_route[start.y][start.x] = 1;

	let solution = [];
	let queue = [[start]];
	while (true) {
		queue = queue.flatMap(x => possible_steps(x.at(-1), data).filter(z => shortest_route[z.y][z.x] < 0).map(y => { shortest_route[y.y][y.x] = x.length + 1; return [...x, y]; }));

		solution = queue.filter(x => x.at(-1).x === end.x && x.at(-1).y === end.y);
		if (solution.length > 0) break;
	}
	return solution.length ? solution[0].length - 1 : 0;

}

console.log(solve('data/input12.1.txt'));

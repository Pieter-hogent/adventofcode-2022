const fs = require('fs');
const { resolve } = require('path');

function solve(filename) {
	let data = fs
		.readFileSync(resolve(process.cwd(), filename), 'utf8')
		.trim().split('')
		;

	data = data.map((_, i, arr) => arr.slice(i, i + 4));
	return data.findIndex(x => new Set(x).size === 4) + 4;
}

console.log(solve('data/input6.1.txt'));

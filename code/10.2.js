const fs = require('fs');
const { resolve } = require('path');

function process_op(op, X) {
	if (op === 'noop') return [X];
	let [_, amount] = op.split(' ');
	amount = Number(amount);
	return [X, X + amount];
}
const LEN = 40;
function solve(filename) {
	let data = fs
		.readFileSync(resolve(process.cwd(), filename), 'utf8')
		.trim()
		.split('\n');

	let pos = 0;
	let X = 1;
	let cycle = 1;
	let result = '#';

	data.forEach(op => {
		let next = process_op(op, X);
		next.forEach(x => {
			++pos;
			if (pos === LEN) {
				pos = 0;
				result = result.concat('\n');
			}
			if (x === (cycle % LEN) || x + 1 === (cycle % LEN) || x - 1 == (cycle % LEN)) result = result.concat('#');
			else result = result.concat('.');
			++cycle;

		});
		X = next.at(-1);
	})

	return result;
}

console.log(solve('data/input10.1.txt'));

const fs = require('fs');
const { resolve } = require('path');

function process_op(op, { X, cycle }) {
	if (op === 'noop') return { X, cycle: cycle + 1 };
	let [_, amount] = op.split(' ');
	amount = Number(amount);
	return { X: X + amount, cycle: cycle + 2 };
}

function solve(filename) {
	let data = fs
		.readFileSync(resolve(process.cwd(), filename), 'utf8')
		.trim()
		.split('\n');

	let next = 18;
	let state = { X: 1, cycle: 0 };
	let result = 0;
	data.forEach(op => {
		state = process_op(op, state);
		if (state.cycle >= next) {
			result += (next + 2) * state.X;
			next += 40;
		}
	})
	return result;
}

console.log(solve('data/input10.1.txt'));

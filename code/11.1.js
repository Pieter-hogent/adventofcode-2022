const fs = require('fs');
const { resolve } = require('path');

const parse_items = (line) => {
	return line.trim().substring("Starting items: ".length).split(',').map(x => x.trim()).map(Number);
}

const parse_operation = (line) => {
	let [_, operation] = line.split(' = ');
	let [lhs, op, rhs] = operation.trim().split(' ');
	return (x) => {
		const left = lhs.trim() === 'old' ? x : Number(lhs);
		const right = rhs.trim() === 'old' ? x : Number(rhs);
		switch (op) {
			case '+': return Math.floor((left + right) / 3);
			case '-': return Math.floor((left - right) / 3);
			case '*': return Math.floor((left * right) / 3);
			case '/': return Math.floor((left / right) / 3);
		}
	}
}

const parse_test = (line) => {
	let div = Number(line.trim().substring("Test: divisible by ".length).trim());
	return (x) => x % div === 0;
}

const parse_pred = (line) => {
	let [_, pred] = line.split('monkey');
	return Number(pred.trim());
}

function solve(filename) {
	let data = fs
		.readFileSync(resolve(process.cwd(), filename), 'utf8')
		.trim()
		.split('\n\n').map(x => x.split('\n'));

	data = data.map(x => {
		[_, start_items, operation, test, truePred, falsePred] = x;
		return { items: parse_items(start_items), op: parse_operation(operation), test: parse_test(test), truePred: parse_pred(truePred), falsePred: parse_pred(falsePred) };
	})

	let inspected = new Array(data.length).fill(0);
	for (let x = 0; x < 20; ++x) {
		data.forEach((x, index, arr) => {
			const { items, op, test, truePred, falsePred } = x;
			inspected[index] += items.length;
			arr[index].items = [];
			items.forEach(x => {
				if (test(op(x))) {
					arr[truePred].items.push(op(x));
				} else {
					arr[falsePred].items.push(op(x));
				}
			})
		})
	}

	return inspected.sort((a, b) => b - a).slice(0, 2).reduce((prod, current) => prod * current, 1);
}

console.log(solve('data/input11.1.txt'));

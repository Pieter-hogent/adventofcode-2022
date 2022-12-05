const fs = require('fs');
const { resolve } = require('path');

const transpose = (arr) => arr[0].map((_, idx) => arr.map((col) => col[idx]));

const moveStack = (stack, n, from, to) => {
	let move = [];
	for (let i = 0; i < n; i++) {
		move.unshift(stack[from].pop());
	}
	stack[to].push(...move);
	return stack
}

function solve(filename) {
	let [stackData, moveData] = fs
		.readFileSync(resolve(process.cwd(), filename), 'utf8')
		.split('\n\n');
	
	stackData = stackData.split('\n').map(x => x.match(/.{1,4}/g)).reverse().slice(1) ;
	stackData = transpose(stackData);

	let stack = new Array(stackData.length).fill(0).map(x => new Array());
	stackData.map((x, i)=> x.map(y=> y.trim().length ? stack[i].push(y.trim()[1]) : null));
	// console.log(stack)	

	moveData = moveData.trim().split('\n').map(x => x.substr(4).trim().split('from'));
	moveData = moveData.map( ([a, b]) => [a, b.split('to')].flat()).map( x => x.map(y => Number(y.trim())));
	// console.log(moveData)

	moveData.forEach( ([n, from, to]) => stack = moveStack(stack, n, from-1, to-1));
	// console.log(stack);

	let result = stack.map(x=> x.pop()).join('');

	return result;
}

console.log(solve('data/input5.1.txt'));

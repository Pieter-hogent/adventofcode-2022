const fs = require('fs');
const { resolve } = require('path');

const move_head = ({ x, y }, dir) => {
	switch (dir) {
		case 'R': return { x: x + 1, y };
		case 'L': return { x: x - 1, y };
		case 'U': return { x, y: y + 1 };
		case 'D': return { x, y: y - 1 };
	}
}

const move_tail = ({ x, y }, { x: headX, y: headY }) => {
	if (Math.abs(x - headX) <= 1 && Math.abs(y - headY) <= 1) return { x, y };
	let tailX = x;
	let tailY = y;
	if (Math.abs(x - headX) !== 0) {
		tailX = x + Math.sign(headX - x)
	}
	if (Math.abs(y - headY) !== 0) {
		tailY = y + Math.sign(headY - y)
	}
	return { x: tailX, y: tailY };
}

function solve(filename) {
	let data = fs
		.readFileSync(resolve(process.cwd(), filename), 'utf8')
		.trim()
		.split('\n').map(x => x.split(" ")).map((([x, y]) => ([x, Number(y)])));


	let all_visited = new Set();
	let posHead = { x: 0, y: 0 };
	let posTail = { x: 0, y: 0 };
	data.forEach(([dir, len]) => {
		for (let i = 0; i < len; i++) {
			posHead = move_head(posHead, dir);
			posTail = move_tail(posTail, posHead);

			all_visited.add(`${posTail.x},${posTail.y}`);
		}
	});


	return all_visited.size;
}

console.log(solve('data/input9.1.txt'));

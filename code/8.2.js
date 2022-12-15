const fs = require('fs');
const { resolve } = require('path');

const transpose = (arr) => arr[0].map((_, idx) => arr.map((col) => col[idx]));
const reverse = (arr) => arr.map(x => x.reverse());

const scenicScore = (arr) => {
	return arr.map(x => x.map((current, i, row) => {
		let previous = row.slice(0, i).reverse();
		let score = 0;
		for (let j of previous) {
			if (j < current) score++
			else if (j >= current) { score++; break; }
		}
		return score;
	}));
}

const merge = (arr1, arr2, arr3, arr4) => {
	return arr1.map((x, i) => x.map((y, j) => arr1[i][j] * arr2[i][j] * arr3[i][j] * arr4[i][j]));
}

function solve(filename) {
	let data = fs
		.readFileSync(resolve(process.cwd(), filename), 'utf8')
		.trim()
		.split('\n').map(x => x.split('').map(Number));

	let right = scenicScore(data);
	let left = reverse(scenicScore(reverse(data)));
	let down = reverse(transpose(scenicScore(transpose(data))));
	let up = reverse(transpose(reverse(scenicScore(reverse(transpose(data))))));

	let replaced = merge(right, left, down, up);
	return replaced.reduce((max, current) => Math.max(max, current.reduce((max, current) => Math.max(max, current), 0)), 0);
}

console.log(solve('data/input8.1.txt'));

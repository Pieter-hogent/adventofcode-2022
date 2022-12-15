const fs = require('fs');
const { resolve } = require('path');
const { memoryUsage } = require('process');

const transpose = (arr) => arr[0].map((_, idx) => arr.map((col) => col[idx]));
const reverse = (arr) => arr.map(x => x.reverse());

const replaceInvis = (arr, char = '_') => {
	return arr.map(x => x.reduce((result, current) => {
		current > result.largest ? result.newline.push(current) : result.newline.push(char);
		result.largest = Math.max(result.largest, current);
		return result;
	}, { largest: -1, newline: [] }).newline);
}

const merge = (arr1, arr2) => {
	return arr1.map((x, i) => x.map((y, j) => arr1[i][j] !== '_' ? arr1[i][j] : arr2[i][j]));
}

function solve(filename) {
	let data = fs
		.readFileSync(resolve(process.cwd(), filename), 'utf8')
		.trim()
		.split('\n').map(x => x.split('').map(Number));

	let replaced = replaceInvis(data);
	replaced = merge(replaced, reverse(replaceInvis(reverse(data))));
	replaced = merge(replaced, reverse(transpose(replaceInvis(transpose(data)))));
	replaced = merge(replaced, reverse(transpose(reverse(replaceInvis(reverse(transpose(data)))))));

	return replaced.flat().filter(x => x !== '_').length;;
}

console.log(solve('data/input8.1.txt'));

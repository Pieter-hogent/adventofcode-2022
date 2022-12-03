const fs = require('fs');
const { resolve } = require('path');

let score = (c) => { 
	// 'a' = 97, 'b' = 98, 'c' = 99... 
	// 'A' = 65, 'B' = 66, 'C' = 67...
	let x = c.charCodeAt(0) - 'a'.charCodeAt(0) + 1; 
	// so if negative it was in range A-Z, add 52 + 6 for the gap between 'z' and 'A'
	x = x < 0 ? x + 52 + 6 : x;
	return x;
}

function solve(filename) {
	let data = fs
		.readFileSync(resolve(process.cwd(), filename), 'utf8')
		.trim()
		.split('\n').map(x => [x.slice(0, x.length/2), x.slice(x.length/2)]);
	
	data = data.map(([a,b]) => b.split('').filter(c => a.includes(c))[0]).flat();
	data = data.map(x=> score(x));

	data = data.reduce((total, current) => total + current, 0);
	
	return data;
}

console.log(solve('data/input3.1.txt'));

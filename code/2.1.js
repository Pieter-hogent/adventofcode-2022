const fs = require('fs');
const { resolve } = require('path');

const encoding = {'A': 'rock', 'B': 'paper', 'C': 'scissors', 'X': 'rock', 'Y': 'paper', 'Z': 'scissors'};
const winners = {'rock': 'scissors', 'paper': 'rock', 'scissors': 'paper'};
const score = {'rock': 1, 'paper': 2, 'scissors': 3};

const score_round = ([a,b]) => {
	let result = score[a];
	if (a === b) result += 3;
	if (winners[a] === b) result += 6;
	return result;
}
function solve(filename) {
	let data = fs
		.readFileSync(resolve(process.cwd(), filename), 'utf8')
		.trim()
		.split('\n').map(x => x.split(' ')).map(([a,b]) =>[encoding[b], encoding[a]]);
	
	data = data.reduce((total, round) => total + score_round(round), 0);
	return data;
}

console.log(solve('data/input2.1.txt'));

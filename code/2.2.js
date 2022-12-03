const fs = require('fs');
const { resolve } = require('path');

const encoding = {'A': 'rock', 'B': 'paper', 'C': 'scissors', 'X': 'lose', 'Y': 'draw', 'Z': 'win'};
const winners = {'scissors':'rock',  'rock':'paper',  'paper': 'scissors'};
const score = {'rock': 1, 'paper': 2, 'scissors': 3};

const needed_play = (opponent, state) => {
	if (state === 'draw') return opponent;
	if (state === 'win') return winners[opponent];
	if (state === 'lose') return Object.entries(winners).filter( ([key, value]) => value === opponent).map(([key, value]) => key)[0];
	
}

const score_round = ([a,b]) => {
	let result = score[b];
	if (a === b) result += 3;
	if (winners[a] === b) result += 6;
	return result;
}
function solve(filename) {
	let data = fs
		.readFileSync(resolve(process.cwd(), filename), 'utf8')
		.trim()
		.split('\n').map(x => x.split(' ')).map(([a,b]) =>[encoding[a], encoding[b]]).map(([a,b]) => [a, needed_play(a,b)]);
	// let debugData = data.map(x => [...x, score_round(x)]);
	// console.log(debugData)
	data = data.reduce((total, round) => total + score_round(round), 0);
	return data;
}

console.log(solve('data/input2.1.txt'));

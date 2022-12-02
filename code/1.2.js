const fs = require('fs');
const { resolve } = require('path');

function solve(filename) {
	let data = fs
		.readFileSync(resolve(process.cwd(), filename), 'utf8')
		.trim()
		.split('\n').map(Number);
	
	const combined = data.reduce((total, current) =>{
		if (current === 0) {
			total.max.push(total.sum);
			total.sum = 0;
		}
		else total.sum += current;
		return total;
	}, {max: [], sum: 0})

	return combined.max.sort((a,b) => b-a ).slice(0, 3).reduce( (sum, current) => sum + current, 0);
}

console.log(solve('data/input1.1.txt'));

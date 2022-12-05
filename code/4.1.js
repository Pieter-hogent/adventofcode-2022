const fs = require('fs');
const { resolve } = require('path');

const contained = ({min: minf, max: maxf}, {min: mins, max: maxs}) => {
	return (minf >= mins && minf <= maxs && maxf >= mins && maxf <= maxs) ||
	(mins >= minf && mins <= maxf && maxs >= minf && maxs <= maxf) ;
}

function solve(filename) {
	let data = fs
		.readFileSync(resolve(process.cwd(), filename), 'utf8')
		.trim()
		.split('\n').map(x => x.split(','));
	
		data = data.map(([first, second]) => {
			const [a, b] = first.split('-');
			const [c, d] = second.split('-');
			return [{min:Number(a), max: Number(b)}, {min:Number(c), max: Number(d)}];
		});

		const pairs = data.reduce( (total, [first, second]) => total += contained(first, second), 0);

	return pairs;
}

console.log(solve('data/input4.1.txt'));

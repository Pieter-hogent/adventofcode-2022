const fs = require('fs');
const { resolve } = require('path');

let currentDir = [];
const filesystem = { '/': 0 };

const processFile = (size) => {
	// console.log(`currentDir: ${currentDir.join('/')}`)
	currentDir.map((_, i, arr) => arr.slice(0, i + 1)).map(x => x.join('/'))
		.forEach(y => filesystem[y] = (filesystem[y] || 0) + Number(size))
}

const processCd = (path) => {
	if (path === '/') { currentDir = ['/']; return; }
	if (path === '..') { currentDir.pop(); return; }
	currentDir.push(path);
}


function solve(filename) {
	let data = fs
		.readFileSync(resolve(process.cwd(), filename), 'utf8')
		.trim()
		.split('\n');

	for (let line of data) {
		// console.log(line);
		if (line.startsWith("$ cd")) { processCd(line.substr(4).trim()); continue; }
		if (line.startsWith("$ ls")) continue;
		let [sizeOrDir, _] = line.split(' ');
		if (sizeOrDir === 'dir') continue;
		processFile(sizeOrDir);

	}
	return Object.values(filesystem).filter(x => x < 100_000).reduce((a, b) => a + b, 0);
}
console.log(solve('data/input7.1.txt'));

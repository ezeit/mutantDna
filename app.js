const mutant = require('./functions/src/mutant')

if (process.argv.length < 3)
    throw new Error('Argumentos inválidos, debe proporcionar una lista de strings.\nEjemplo: node app.js "ATGCGA" "CAGTGC" "TTATGT" "AGAAGG" "CCCCTA" "TCACTG"');

let dna = [];
for (let argIndex = 2; argIndex < process.argv.length; argIndex++) {
    dna.push(process.argv[argIndex]);
}

console.log('DNA: ', dna);
console.log('Is Mutant: ', mutant.isMutant(dna));
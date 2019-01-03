const mutant = require('./functions/src/mutant')

test('Mutant DNA Vertical', () => {
    const dna = ["ATGCGA", "CAGTGA", "TTGTGA", "ATAAGA", "CTTATC", "TTACTG"];
    expect(mutant.isMutant(dna)).toEqual(true);
});

test('Mutant DNA Cross Obliques', () => {
    const dna = ["ATGCATGC", "CGTACGTA", "ATGTATGC", "CGTATGTA", "ATGTATGC", "CGTACGTA", "ATGCATGC", "CGTACGTA"]
    expect(mutant.isMutant(dna)).toEqual(true);
});

test('Mutant DNA Oblique (LtR) + Horizontal', () => {
    const dna = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
    expect(mutant.isMutant(dna)).toEqual(true);
});

test('Human DNA', () => {
    const dna = ["ATGCGA", "CAGTGC", "TTATAT", "AGAAGG", "ACCCTA", "TCACTG"];
    expect(mutant.isMutant(dna)).toEqual(false);
});


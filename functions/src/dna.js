const matrix = require('./matrix');
const DNAMutantMatch = /([ATGC])\1{3,}/g;
const allowedInputCharsMatch = /^[ATCG]+$/;


const findMatches = (dnaRow) => {
    let coincidences = [];
    let match;
    while ((match = DNAMutantMatch.exec(dnaRow)) !== null) {
        coincidences.push(match[0]);
    }
    const size = coincidences.length;
    if (size < 1)
        return 0
    else if (size === 1)
        return coincidences[0].length - 3;
    else
        return coincidences.reduce((previous, current) => { return previous + (current.length - 3) }, 0);
}


const checkHorizontalMatches = (dna) => {
    return dna.reduce((previous, current) => { return previous + findMatches(current) }, 0);
}

const checkVerticalMatches = (dna) => {
    const transposedDNA = matrix.traspose(dna);
    return checkHorizontalMatches(transposedDNA);
}

const checkObliqueMatches = (dna) => {
    const bottomLeftToUpperRightElements = matrix.obliqueElements(dna);
    const bottomRightToUpperLeftElements = matrix.obliqueElements(matrix.mirror(dna));

    return checkHorizontalMatches([...bottomLeftToUpperRightElements, ...bottomRightToUpperLeftElements]);
}

module.exports.checkHorizontalMatches = (dna) => {
    return checkHorizontalMatches(dna);
}
module.exports.checkVerticalMatches = (dna) => {
    return checkVerticalMatches(dna);
}
module.exports.checkObliqueMatches = (dna) => {
    return checkObliqueMatches(dna);
}

module.exports.validateInput = (dna) => {
    if (!Array.isArray(dna))
        return false;
    for (let i = 0; i < dna.length; i++) {
        if (dna[i].length !== dna.length)
            return false;
        else if(!allowedInputCharsMatch.test(dna[i]))
            return false;
    }
    return true;
}
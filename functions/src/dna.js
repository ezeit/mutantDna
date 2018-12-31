const matrix = require('./matrix');
const DNAMutantMatch = /([ATGC])\1{3}/;

const checkHorizontalMatches = (dna) => {
    return dna.filter((row) => {
        return DNAMutantMatch.test(row);
    });
}

const checkVerticalMatches = (dna) => {
    let transposedDNA = matrix.traspose(dna);
    // console.log("TRANSPOSED", transposedDNA);
    return checkHorizontalMatches(transposedDNA);
}

const checkObliqueMatches = (dna) => {
    let leftToRightObliqueElements = matrix.obliqueElements(dna);
    let rightToLeftObliqueElements = matrix.obliqueElements(matrix.mirror(dna));
    // console.log("TOP OBLIQUE", leftToRightObliqueElements);
    // console.log("BOTTOM OBLIQUE", rightToLeftObliqueElements);
    // console.log("JOIN OBLIQUE", [...leftToRightObliqueElements, ...rightToLeftObliqueElements]);
    return checkHorizontalMatches([...leftToRightObliqueElements, ...rightToLeftObliqueElements]);
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

module.exports.validateStructure = (dna) => {
    if (!Array.isArray(dna))
        return false;
    for (let i = 0; i < dna.length; i++) {
        if (dna[i].length !== dna.length)
            return false;
    }
    return true;
}
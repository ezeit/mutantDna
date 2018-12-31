const dnaHelper = require('./dna');

module.exports.isMutant = (dna) => {
    if (!dnaHelper.validateStructure(dna))
        throw new Error("Estructura inválida, solo se aceptan matrices cuadradas");

    if (dna.length < 4) return false;

    let horizontalMatches = dnaHelper.checkHorizontalMatches(dna);
    if (horizontalMatches.length > 1)
        return true;

    let verticalMatches = dnaHelper.checkVerticalMatches(dna);
    if ((horizontalMatches.length + verticalMatches.length) > 1)
        return true;

    let obliqueMatches = dnaHelper.checkObliqueMatches(dna);
    return (horizontalMatches.length + verticalMatches.length + obliqueMatches.length) > 1

}

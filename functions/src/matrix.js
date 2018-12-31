module.exports.traspose = (matrix) => {
    let m= [matrix];
	return m[0].map((col,i) => {
		return matrix.map( (row) => {
			return row[i];
		}).join("");
	});
}

module.exports.mirror = (matrix) => {
    return matrix.map((row) => {
        return row.split("").reverse().join("")
    });
}

module.exports.obliqueElements = (matrix) => {
    let row , col, x , y;
	let obliqueArray = [];
	let obliqueElements = [];
	for(row = 0; row < matrix.length; row ++){		
		obliqueElements = [];
		for(x = row, y = 0 ; x >= 0; x--, y++){
			obliqueElements.push(matrix[x][y]);
		}
		obliqueArray.push(obliqueElements.join(""));
	}
	//Get the rest
	for(col = 1; col < matrix.length; col ++){
		obliqueElements = [];
		for(x = matrix.length -1, y = col; y < matrix.length; x--, y++){
			obliqueElements.push(matrix[x][y]);
		}
		obliqueArray.push(obliqueElements.join(""));
	}
	return obliqueArray;
}
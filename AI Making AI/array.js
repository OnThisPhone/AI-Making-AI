function combineArrays(array1, array2) {
    const result = [];
  
    for (let i = 0; i < array1.length; i++) {
      const row = [];
      for (let j = 0; j < array1[i].length; j++) {
        row.push(array1[i][j] === 0 && array2[i][j] === 0 ? 0 : 1);
      }
      result.push(row);
    }
  
    return result;
  }
  
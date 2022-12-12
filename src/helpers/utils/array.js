const reshapeRows = (array, rows) => {
  const matrix = [];
  const step = Math.ceil(array.length / rows);
  for (let i = 0; i < array.length; i += step) {
    matrix.push(array.slice(i, i + step));
  }
  return matrix;
};

module.exports = {
  reshapeRows,
};

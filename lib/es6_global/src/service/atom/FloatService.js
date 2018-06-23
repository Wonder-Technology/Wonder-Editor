


function truncateFloatValue(value, count) {
  var res = value.toFixed(count);
  return String(Number(res));
}

export {
  truncateFloatValue ,
  
}
/* No side effect */

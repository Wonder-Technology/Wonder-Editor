


function _isBase64Equal(base64_1, base64_2) {
  var match = base64_1.length === base64_2.length;
  if (match) {
    return base64_1 === base64_2;
  } else {
    return false;
  }
}

function isBase64Equal(base64_1, base64_2) {
  if (base64_1 !== undefined) {
    if (base64_2 !== undefined) {
      return _isBase64Equal(base64_1, base64_2);
    } else {
      return false;
    }
  } else {
    return base64_2 === undefined;
  }
}

export {
  _isBase64Equal ,
  isBase64Equal ,
  
}
/* No side effect */

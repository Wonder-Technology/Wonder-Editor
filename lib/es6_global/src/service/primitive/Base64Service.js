


function isBase64Equal(base64_1, base64_2) {
  if (base64_1 !== undefined) {
    if (base64_2 !== undefined) {
      var base64_2$1 = base64_2;
      var base64_1$1 = base64_1;
      var match = base64_1$1.length === base64_2$1.length;
      if (match) {
        return base64_1$1 === base64_2$1;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return base64_2 === undefined;
  }
}

export {
  isBase64Equal ,
  
}
/* No side effect */




function fromNow(unixtime) {
  var delta = (Date.now() / 1000 | 0) - unixtime | 0;
  if (delta < 3600) {
    return String(delta / 60 | 0) + "minutes age";
  } else if (delta < 86400) {
    return String(delta / 3600 | 0) + "hours age";
  } else {
    return String(delta / 86400 | 0) + "days age";
  }
}

export {
  fromNow ,
  
}
/* No side effect */

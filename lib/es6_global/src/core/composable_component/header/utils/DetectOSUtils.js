


function isMac() {
  var platform = navigator.platform;
  if (platform === "Mac68K" || platform === "MacPPC" || platform === "Macintosh") {
    return true;
  } else {
    return platform === "MacIntel";
  }
}

export {
  isMac ,
  
}
/* No side effect */

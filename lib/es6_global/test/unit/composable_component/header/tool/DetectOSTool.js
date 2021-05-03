


var _setOS = function (platform){
    Object.defineProperty(navigator, "platform", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: platform
      });
    };

function setOSToBeMac() {
  return _setOS("Mac68K");
}

function setOSToBeWin() {
  return _setOS("Windows");
}

export {
  _setOS ,
  setOSToBeMac ,
  setOSToBeWin ,
  
}
/* No side effect */

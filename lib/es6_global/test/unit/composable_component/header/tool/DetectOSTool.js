


function _setOS (platform){
    Object.defineProperty(navigator, "platform", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: platform
      });
    };

function setOSToBeMac(param) {
  return _setOS("Mac68K");
}

function setOSToBeWin(param) {
  return _setOS("Windows");
}

export {
  _setOS ,
  setOSToBeMac ,
  setOSToBeWin ,
  
}
/* No side effect */

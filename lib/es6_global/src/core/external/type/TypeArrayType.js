


var newBlobFromArrayBuffer = function (arrayBuffer){
  return new Blob([arrayBuffer])
    };

var arrayBufferToString = function (buf){
    return String.fromCharCode.apply(null, new Uint8Array(buf));
    };

export {
  newBlobFromArrayBuffer ,
  arrayBufferToString ,
  
}
/* No side effect */

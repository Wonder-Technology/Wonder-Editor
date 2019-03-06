


function newBlobFromArrayBuffer (arrayBuffer){
  return new Blob([arrayBuffer])
    };

function arrayBufferToString (buf){
    return String.fromCharCode.apply(null, new Uint8Array(buf));
    };

export {
  newBlobFromArrayBuffer ,
  arrayBufferToString ,
  
}
/* No side effect */

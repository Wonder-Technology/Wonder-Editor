


function buildFakeFetchTextResponse(_, text) {
  return Promise.resolve({
              text: (function () {
                  return Promise.resolve(text);
                })
            });
}

function buildFakeFetchArrayBufferResponse(_, arrayBuffer) {
  return Promise.resolve({
              arrayBuffer: (function () {
                  return Promise.resolve(arrayBuffer);
                })
            });
}

export {
  buildFakeFetchTextResponse ,
  buildFakeFetchArrayBufferResponse ,
  
}
/* No side effect */

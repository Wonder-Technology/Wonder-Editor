


function buildFakeFetchTextResponse(sandbox, text) {
  return Promise.resolve({
              text: (function (param) {
                  return Promise.resolve(text);
                })
            });
}

function buildFakeFetchArrayBufferResponse(sandbox, arrayBuffer) {
  return Promise.resolve({
              arrayBuffer: (function (param) {
                  return Promise.resolve(arrayBuffer);
                })
            });
}

export {
  buildFakeFetchTextResponse ,
  buildFakeFetchArrayBufferResponse ,
  
}
/* No side effect */

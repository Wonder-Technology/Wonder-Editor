


function _getUnsafeVal(param) {
  return -1;
}

function buildNewSelf(newRetainedProps) {
  return /* record */[
          /* oldSelf : record */[
            /* handle */-1,
            /* state */-1,
            /* retainedProps */-1,
            /* send */-1,
            /* onUnmount */-1
          ],
          /* newSelf : record */[
            /* handle */-1,
            /* state */-1,
            /* retainedProps */newRetainedProps,
            /* send */-1,
            /* onUnmount */-1
          ]
        ];
}

export {
  _getUnsafeVal ,
  buildNewSelf ,
  
}
/* No side effect */

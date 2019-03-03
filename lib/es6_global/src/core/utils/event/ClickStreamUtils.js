

import * as Most from "most";

function bindClickStream(isSingleClick, debounceTime, clickStream) {
  var count = /* record */[/* contents */0];
  return Most.tap((function (_event) {
                count[0] = 0;
                return /* () */0;
              }), Most.filter((function (_event) {
                    if (isSingleClick) {
                      return count[0] === 1;
                    } else {
                      return count[0] >= 2;
                    }
                  }), Most.tap((function (_event) {
                        if (isSingleClick) {
                          if (count[0] !== 1) {
                            count[0] = 0;
                            return /* () */0;
                          } else {
                            return 0;
                          }
                        } else if (count[0] < 2) {
                          count[0] = 0;
                          return /* () */0;
                        } else {
                          return 0;
                        }
                      }), Most.debounce(debounceTime, Most.tap((function (_event) {
                                count[0] = count[0] + 1 | 0;
                                return /* () */0;
                              }), clickStream)))));
}

export {
  bindClickStream ,
  
}
/* most Not a pure module */

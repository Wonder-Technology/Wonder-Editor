'use strict';

import * as Most       from "most";
import * as Js_boolean from "../../../../../node_modules/bs-platform/lib/es6/js_boolean.js";

function bindClickStream(isSingleClick, clickStream) {
  var count = [0];
  return Most.tap((function () {
                count[0] = 0;
                return /* () */0;
              }), Most.filter((function () {
                    return Js_boolean.to_js_boolean(isSingleClick !== 0 ? +(count[0] === 1) : +(count[0] >= 2));
                  }), Most.tap((function () {
                        if (isSingleClick !== 0) {
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
                      }), Most.debounce(150, Most.tap((function () {
                                count[0] = count[0] + 1 | 0;
                                return /* () */0;
                              }), clickStream)))));
}

export {
  bindClickStream ,
  
}
/* most Not a pure module */



import * as Most from "most";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as MostUtils$WonderEditor from "../../composable_component/utils/MostUtils.js";

function getBody(param) {
  return document.body;
}

function bindEventInDidMount(handleFunc, setFunc) {
  return Curry._1(setFunc, Most.tap(Curry.__1(handleFunc), Most.fromEvent("click", document.body, false)).subscribe({
                  next: (function (param) {
                      return /* () */0;
                    }),
                  error: (function (e) {
                      return /* () */0;
                    }),
                  complete: (function (param) {
                      return /* () */0;
                    })
                }));
}

function unmountStreamSubscription(streamSubscription) {
  if (streamSubscription !== undefined) {
    return MostUtils$WonderEditor.unsubscribeDomEventStream(Caml_option.valFromOption(streamSubscription));
  } else {
    return /* () */0;
  }
}

export {
  getBody ,
  bindEventInDidMount ,
  unmountStreamSubscription ,
  
}
/* most Not a pure module */

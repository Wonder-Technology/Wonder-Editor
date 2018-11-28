

import * as Most from "most";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as MostUtils$WonderEditor from "../../composable_component/utils/MostUtils.js";

function getBody() {
  return document.body;
}

function bindEventInDidMount(handleFunc, setFunc) {
  return Curry._1(setFunc, Most.tap(Curry.__1(handleFunc), Most.fromEvent("click", document.body, false)).subscribe({
                  next: (function () {
                      return /* () */0;
                    }),
                  error: (function () {
                      return /* () */0;
                    }),
                  complete: (function () {
                      return /* () */0;
                    })
                }));
}

function unmountStreamSubscription(streamSubscription) {
  if (streamSubscription !== undefined) {
    return MostUtils$WonderEditor.unsubscribeDomEventStream(Js_primitive.valFromOption(streamSubscription));
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

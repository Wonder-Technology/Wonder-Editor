

import * as ReactDOMRe from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReactDOMRe.js";

function addStyleProp(name, prop, style) {
  return ReactDOMRe.Style[/* unsafeAddProp */1](style, name, prop);
}

export {
  addStyleProp ,
  
}
/* ReactDOMRe Not a pure module */

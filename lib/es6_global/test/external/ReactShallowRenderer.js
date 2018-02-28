'use strict';

import * as Shallow from "react-test-renderer/shallow";

var partial_arg = Shallow.createRenderer();

function renderWithRenderer(param) {
  return partial_arg.render(param);
}

export {
  renderWithRenderer ,
  
}
/* partial_arg Not a pure module */

'use strict';

import * as ReactTestRenderer$slashshallow from "react-test-renderer/shallow";

var partial_arg = ReactTestRenderer$slashshallow.createRenderer();

function renderWithRenderer(param) {
  return partial_arg.render(param);
}

export {
  renderWithRenderer ,
  
}
/* partial_arg Not a pure module */

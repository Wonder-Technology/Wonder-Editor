'use strict';

var Shallow = require("react-test-renderer/shallow");

var partial_arg = Shallow.createRenderer();

function renderWithRenderer(param) {
  return partial_arg.render(param);
}

exports.renderWithRenderer = renderWithRenderer;
/* partial_arg Not a pure module */

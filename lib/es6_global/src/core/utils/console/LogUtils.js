


function _isEmpty(msg) {
  return msg.length === 0;
}

function _isNotEmpty(msg) {
  return msg.length > 0;
}

function _buildMessage(description, reason, solution, params) {
  var message = "";
  var match = description.length > 0 && reason.length === 0 && solution.length === 0 && params.length === 0;
  if (match) {
    return message + description;
  } else {
    var match$1 = description.length > 0;
    var message$1 = match$1 ? message + ("description\n    " + (String(description) + "")) : message;
    var match$2 = reason.length > 0;
    var message$2 = match$2 ? message$1 + ("\n    reason\n    " + (String(reason) + "")) : message$1;
    var match$3 = solution.length > 0;
    var message$3 = match$3 ? message$2 + ("\n    solution\n    " + (String(solution) + "")) : message$2;
    var match$4 = params.length > 0;
    if (match$4) {
      return message$3 + ("\n    params\n    " + (String(params) + ""));
    } else {
      return message$3;
    }
  }
}

var buildFatalMessage = _buildMessage;

var buildErrorMessage = _buildMessage;

function buildDebugMessage(description, params, param) {
  var message = "";
  var match = description.length > 0 && params.length === 0;
  if (match) {
    return message + description;
  } else {
    var match$1 = description.length > 0;
    var message$1 = match$1 ? message + ("description\n    " + (String(description) + "")) : message;
    var match$2 = params.length > 0;
    if (match$2) {
      return message$1 + ("\n    params\n    " + (String(params) + ""));
    } else {
      return message$1;
    }
  }
}

export {
  _isEmpty ,
  _isNotEmpty ,
  _buildMessage ,
  buildFatalMessage ,
  buildErrorMessage ,
  buildDebugMessage ,
  
}
/* No side effect */

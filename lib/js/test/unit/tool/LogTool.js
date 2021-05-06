'use strict';


function logInfo(msg) {
  console.log(msg);
  console.log(JSON.stringify(msg).split(","));
  console.log("end log");
  return /* () */0;
}

exports.logInfo = logInfo;
/* No side effect */

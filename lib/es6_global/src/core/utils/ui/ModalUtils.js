

import * as React from "react";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";

function iterateModalArrayBuildComponent(modalArray) {
  return modalArray.map((function (param) {
                var content = param[1];
                var title = param[0];
                return React.createElement("div", {
                            key: title,
                            className: "content-field"
                          }, React.createElement("div", {
                                className: "field-title"
                              }, DomHelper$WonderEditor.textEl(title)), React.createElement("div", {
                                className: "field-content"
                              }, param[2] ? React.createElement("a", {
                                      href: param[3],
                                      target: "view_window"
                                    }, DomHelper$WonderEditor.textEl(content)) : DomHelper$WonderEditor.textEl(content)));
              }));
}

export {
  iterateModalArrayBuildComponent ,
  
}
/* react Not a pure module */

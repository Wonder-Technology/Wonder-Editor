

import * as React from "react";

function buildNotDragableUl(treeChildren, isShowChildren, content) {
  return React.createElement("ul", {
              className: "wonder-tree-node"
            }, content, isShowChildren ? treeChildren : null);
}

function getNoBorderCss() {
  return "3px solid rgba(0,0,0,0)";
}

export {
  buildNotDragableUl ,
  getNoBorderCss ,
  
}
/* react Not a pure module */

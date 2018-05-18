'use strict';

import * as Most                          from "most";
import * as React                         from "react";
import * as Pervasives                    from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as ReasonReact                   from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                 from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as DomHelper$WonderEditor        from "../../../../../../../external/DomHelper.js";
import * as EventUtils$WonderEditor       from "../../../../../../../utils/EventUtils.js";
import * as ClickStreamUtils$WonderEditor from "../../../../../../../utils/ClickStreamUtils.js";

function onDoubleClick() {
  Log$WonderLog.print("double");
  return /* () */0;
}

function onClick(_, _$1) {
  Log$WonderLog.print("click");
  return /* () */0;
}

var Method = /* module */[
  /* onDoubleClick */onDoubleClick,
  /* onClick */onClick
];

var component = ReasonReact.statelessComponent("FileBox");

function render(_, _$1, imgSrc, folderId, name, sign, isSelected, _$2) {
  var className = "file-item " + (
    isSelected !== 0 ? "item-active" : ""
  );
  var id = "folder-" + Pervasives.string_of_int(folderId);
  return React.createElement("article", {
              className: className,
              id: id
            }, React.createElement("img", {
                  src: imgSrc,
                  onDragStart: (function (param) {
                      return EventUtils$WonderEditor.dragStart(folderId, sign, param);
                    })
                }), React.createElement("span", {
                  className: "item-text"
                }, DomHelper$WonderEditor.textEl(name)));
}

function make(store, dispatch, imgSrc, folderId, name, sign, isSelected, _) {
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function () {
      var clickStream = Most.fromEvent("click", document.getElementById("folder-" + Pervasives.string_of_int(folderId)), true);
      Most.forEach((function () {
              Log$WonderLog.print("double click11");
              return /* () */0;
            }), ClickStreamUtils$WonderEditor.bindClickStream(/* false */0, clickStream));
      Most.forEach((function () {
              Log$WonderLog.print("single click");
              return /* () */0;
            }), ClickStreamUtils$WonderEditor.bindClickStream(/* true */1, clickStream));
      return /* NoUpdate */0;
    });
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, imgSrc, folderId, name, sign, isSelected, self);
    });
  return newrecord;
}

export {
  Method    ,
  component ,
  render    ,
  make      ,
  
}
/* component Not a pure module */

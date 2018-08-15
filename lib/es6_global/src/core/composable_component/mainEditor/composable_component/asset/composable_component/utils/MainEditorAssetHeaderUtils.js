

import * as Most from "most";
import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_dict from "../../../../../../../../../../node_modules/bs-platform/lib/es6/js_dict.js";
import * as AppStore$WonderEditor from "../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../../../../external/DomHelper.js";
import * as FileReader$WonderEditor from "../../../../../../external/FileReader.js";
import * as AssetTreeNodeUtils$WonderEditor from "../../utils/AssetTreeNodeUtils.js";

function fileLoad(dispatchFunc, $$event) {
  DomHelper$WonderEditor.preventDefault($$event);
  var fileInfoArr = Js_dict.values($$event.target.files).map(AssetTreeNodeUtils$WonderEditor.convertFileJsObjectToFileInfoRecord);
  return Most.drain(Most.flatMap((function (fileResult) {
                      return Most.fromPromise(AssetTreeNodeUtils$WonderEditor.handleFileByType(fileResult));
                    }), Most.flatMap((function (fileInfo) {
                          return Most.fromPromise(new Promise((function (resolve, _) {
                                            var reader = new FileReader();
                                            Curry._2(FileReader$WonderEditor.onload, reader, (function (result) {
                                                    return resolve(/* record */[
                                                                /* name */fileInfo[/* name */0],
                                                                /* type_ */AssetTreeNodeUtils$WonderEditor.getUploadFileType(fileInfo[/* type_ */1]),
                                                                /* result */result
                                                              ]);
                                                  }));
                                            return AssetTreeNodeUtils$WonderEditor.readFileByType(reader, fileInfo);
                                          })));
                        }), Most.from(fileInfoArr)))).then((function () {
                return Promise.resolve(Curry._1(dispatchFunc, [
                                AppStore$WonderEditor.UpdateAction,
                                /* Update */[/* array */[/* Asset */2]]
                              ]));
              }));
}

export {
  fileLoad ,
  
}
/* most Not a pure module */

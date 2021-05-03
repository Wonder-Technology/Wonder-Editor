

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as LogUtils$WonderEditor from "../../../../../../../../../utils/console/LogUtils.js";
import * as Caml_builtin_exceptions from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../../../../utils/ui/ConsoleUtils.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../../../utils/language/LanguageUtils.js";
import * as FileNameService$WonderEditor from "../../../../../../../../../../service/atom/FileNameService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/LanguageEditorService.js";

function getUploadAssetType(name) {
  var extname = FileNameService$WonderEditor.getExtName(name);
  switch (extname) {
    case ".glb" : 
        return /* LoadGLB */1;
    case ".jpeg" : 
    case ".jpg" : 
    case ".png" : 
        return /* LoadTexture */4;
    case ".rab" : 
    case ".sab" : 
    case ".wab" : 
        return /* LoadAssetBundle */5;
    case ".wdb" : 
        return /* LoadWDB */0;
    case ".zip" : 
        return /* LoadZip */2;
    default:
      var partial_arg = LogUtils$WonderEditor.buildErrorMessage(LanguageUtils$WonderEditor.getMessageLanguageDataByType("load-asset-file", StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType)), "", "", "");
      StateLogicService$WonderEditor.getEditorState((function (param) {
              return ConsoleUtils$WonderEditor.error(partial_arg, param);
            }));
      return /* LoadError */7;
  }
}

function getUploadPackageType(name) {
  var extname = FileNameService$WonderEditor.getExtName(name);
  if (extname === ".wpk") {
    return /* LoadWPK */6;
  } else {
    var partial_arg = LogUtils$WonderEditor.buildErrorMessage(LanguageUtils$WonderEditor.getMessageLanguageDataByType("load-asset-package", StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType)), "", "", "");
    StateLogicService$WonderEditor.getEditorState((function (param) {
            return ConsoleUtils$WonderEditor.error(partial_arg, param);
          }));
    return /* LoadError */7;
  }
}

function _handlePackageSpecificFuncByTypeSync(type_, handleWPKFunc) {
  if (type_ !== 6) {
    if (type_ >= 7) {
      return /* () */0;
    } else {
      throw [
            Caml_builtin_exceptions.match_failure,
            /* tuple */[
              "LoadAssetUtils.re",
              64,
              2
            ]
          ];
    }
  } else {
    return Curry._1(handleWPKFunc, /* () */0);
  }
}

function _handleAssetSpecificFuncByTypeSync(type_, param) {
  switch (type_) {
    case 0 : 
        return Curry._1(param[1], /* () */0);
    case 1 : 
        return Curry._1(param[3], /* () */0);
    case 2 : 
        return Curry._1(param[4], /* () */0);
    case 4 : 
        return Curry._1(param[0], /* () */0);
    case 5 : 
        return Curry._1(param[2], /* () */0);
    case 3 : 
    case 6 : 
        throw [
              Caml_builtin_exceptions.match_failure,
              /* tuple */[
                "LoadAssetUtils.re",
                80,
                2
              ]
            ];
    case 7 : 
        return /* () */0;
    
  }
}

function readPakckageByTypeSync(reader, fileInfo) {
  return _handlePackageSpecificFuncByTypeSync(getUploadPackageType(fileInfo[/* name */0]), (function (param) {
                reader.readAsArrayBuffer(fileInfo[/* file */2]);
                return /* () */0;
              }));
}

function readAssetByTypeSync(reader, fileInfo) {
  return _handleAssetSpecificFuncByTypeSync(getUploadAssetType(fileInfo[/* name */0]), /* tuple */[
              (function (param) {
                  reader.readAsDataURL(fileInfo[/* file */2]);
                  return /* () */0;
                }),
              (function (param) {
                  reader.readAsArrayBuffer(fileInfo[/* file */2]);
                  return /* () */0;
                }),
              (function (param) {
                  reader.readAsArrayBuffer(fileInfo[/* file */2]);
                  return /* () */0;
                }),
              (function (param) {
                  reader.readAsArrayBuffer(fileInfo[/* file */2]);
                  return /* () */0;
                }),
              (function (param) {
                  reader.readAsArrayBuffer(fileInfo[/* file */2]);
                  return /* () */0;
                })
            ]);
}

export {
  getUploadAssetType ,
  getUploadPackageType ,
  _handlePackageSpecificFuncByTypeSync ,
  _handleAssetSpecificFuncByTypeSync ,
  readPakckageByTypeSync ,
  readAssetByTypeSync ,
  
}
/* LogUtils-WonderEditor Not a pure module */

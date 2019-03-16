

import * as Curry from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ReactDOMRe from "../../../../node_modules/reason-react/lib/es6_global/src/ReactDOMRe.js";
import * as ReasonReact from "../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as App$WonderEditor from "./ui/App.js";
import * as Window$WonderEditor from "./external/Window.js";
import * as Reductive$WonderEditor from "./redux/Reductive.js";
import * as IndexStore$WonderEditor from "./redux/store/IndexStore.js";
import * as StateLogicService$WonderEditor from "../service/stateTuple/logic/StateLogicService.js";
import * as LanguageEditorService$WonderEditor from "../service/state/editor/LanguageEditorService.js";

var make = Reductive$WonderEditor.Provider[/* createMake */0](undefined, IndexStore$WonderEditor.store);

var IndexStoreProvider = /* module */[/* make */make];

var partial_arg = LanguageEditorService$WonderEditor.convertToType(Window$WonderEditor.getLanguage());

StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
        return LanguageEditorService$WonderEditor.setType(partial_arg, param);
      }));

ReactDOMRe.renderToElementWithId(ReasonReact.element(undefined, undefined, Curry._2(make, App$WonderEditor.make, /* array */[])), "index");

export {
  IndexStoreProvider ,
  
}
/* make Not a pure module */

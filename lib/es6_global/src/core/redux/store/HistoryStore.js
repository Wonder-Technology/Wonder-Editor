

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_exceptions from "../../../../../../node_modules/bs-platform/lib/es6/caml_exceptions.js";
import * as AppStore$WonderEditor from "../../ui/store/AppStore.js";
import * as Reductive$WonderEditor from "../Reductive.js";
import * as Middleware$WonderEditor from "../Middleware.js";
import * as StackService$WonderEditor from "../../../service/atom/StackService.js";

var TravelBackward = Caml_exceptions.create("HistoryStore-WonderEditor.TravelBackward");

var TravelForward = Caml_exceptions.create("HistoryStore-WonderEditor.TravelForward");

var past = [StackService$WonderEditor.empty(/* () */0)];

var future = [StackService$WonderEditor.empty(/* () */0)];

function undo(currentState) {
  var match = StackService$WonderEditor.first(past[0]);
  if (match) {
    future[0] = StackService$WonderEditor.addFirst(currentState, future[0]);
    past[0] = StackService$WonderEditor.removeFirstOrRaise(past[0]);
    return match[0];
  } else {
    return currentState;
  }
}

function redo(currentState) {
  var match = StackService$WonderEditor.first(future[0]);
  if (match) {
    past[0] = StackService$WonderEditor.addFirst(currentState, past[0]);
    future[0] = StackService$WonderEditor.removeFirstOrRaise(future[0]);
    return match[0];
  } else {
    return currentState;
  }
}

function recordHistory(currentState) {
  past[0] = StackService$WonderEditor.addFirst(currentState, past[0]);
  future[0] = StackService$WonderEditor.empty(/* () */0);
  return /* () */0;
}

function isNeedStoreAction(action) {
  if (action[0] === AppStore$WonderEditor.MapAction || action === AppStore$WonderEditor.StartEngineAction) {
    return false;
  } else {
    return action !== AppStore$WonderEditor.IsDidMounted;
  }
}

function timeTravel(store, next, action) {
  var currentState = Reductive$WonderEditor.Store[/* getState */5](store);
  if (action === TravelBackward) {
    return Curry._1(next, [
                AppStore$WonderEditor.ReplaceState,
                undo(currentState)
              ]);
  } else if (action === TravelForward) {
    return Curry._1(next, [
                AppStore$WonderEditor.ReplaceState,
                redo(currentState)
              ]);
  } else {
    Curry._1(next, action);
    var match = isNeedStoreAction(action);
    if (match) {
      var newState = Reductive$WonderEditor.Store[/* getState */5](store);
      if (currentState !== newState) {
        return recordHistory(currentState);
      } else {
        return 0;
      }
    } else {
      return /* () */0;
    }
  }
}

function thunkedLoggedTimeTravelLogger(store, next) {
  return (function (param) {
      return Middleware$WonderEditor.thunk(store, (function (param) {
                    return Middleware$WonderEditor.logger(store, next, param);
                  }), param);
    });
}

export {
  TravelBackward ,
  TravelForward ,
  past ,
  future ,
  undo ,
  redo ,
  recordHistory ,
  isNeedStoreAction ,
  timeTravel ,
  thunkedLoggedTimeTravelLogger ,
  
}
/* past Not a pure module */

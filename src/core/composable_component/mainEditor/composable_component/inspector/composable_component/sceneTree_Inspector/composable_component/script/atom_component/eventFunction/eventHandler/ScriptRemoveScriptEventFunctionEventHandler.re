open MainEditorLightType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (Wonderjs.ScriptType.script, string);
  type return = unit;

  let handleSelfLogic =
      ((uiState, dispatchFunc), (), (script, attributeName)) => {
    ScriptEngineService.removeScriptEventFunctionData(script, attributeName)
    |> StateLogicService.getAndSetEngineState;

    dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
    |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);
module Method = {
  let _addSplitSymbol = str => {j|$str,|j};

  let _buildBodyStr = (eventFunctionName, eventFunction, str) =>
    switch (eventFunction) {
    | None => {j| $str \n  $eventFunctionName: (script, api, engineState) => { \n    return engineState; \n  }|j}
    | Some(func) =>
      let funcStr = SerializeService.serializeFunction(func);

      {j|$str \n $(eventFunctionName): $funcStr|j};
    };

  let convertEventFunctionDataToJsObjStr =
      ({init, update, dispose}: Wonderjs.StateDataMainType.eventFunctionData) => {
    let bodyStr =
      ""
      |> _buildBodyStr("init", init)
      |> _addSplitSymbol
      |> _buildBodyStr("update", update)
      |> _addSplitSymbol
      |> _buildBodyStr("dispose", dispose)
      |> Js.String.sliceToEnd(~from=1);

    {j|{ $bodyStr \n}|j};
  };

  let updateEventFunctionData = UpdateScriptEventFunctionDataEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;
};

let component =
  ReasonReact.statelessComponent("ScriptEventFunctionInspector");

let render =
    (
      (uiState, dispatchFunc),
      (nodeId, name, eventFunctionData),
      renameFunc,
      {state, send}: ReasonReact.self('a, 'b, 'c),
    ) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article
    key="ScriptEventFunctionInspector"
    className="wonder-scriptEventFunction-inspector">
    <h1> {DomHelper.textEl("Script Event Function")} </h1>
    <hr />
    <StringInput
      label="Name"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "scriptEventFunction-name-describe",
          languageType,
        )
      }
      defaultValue=name
      onBlur=renameFunc
      canBeNull=false
    />
    <div className="scriptEventFunction-data">
      <FileInput
        inputValue={
          Method.convertEventFunctionDataToJsObjStr(eventFunctionData)
        }
        onSubmit={
          value =>
            Method.updateEventFunctionData(
              (uiState, dispatchFunc),
              (),
              (nodeId, name, value),
            )
        }
        isShowInput=true
      />
    </div>
  </article>;
};

let make =
    (
      ~uiState,
      ~dispatchFunc,
      ~currentNodeId,
      ~name,
      ~eventFunctionData,
      ~renameFunc,
      _children,
    ) => {
  ...component,
  render: self =>
    render(
      (uiState, dispatchFunc),
      (currentNodeId, name, eventFunctionData),
      renameFunc,
      self,
    ),
};
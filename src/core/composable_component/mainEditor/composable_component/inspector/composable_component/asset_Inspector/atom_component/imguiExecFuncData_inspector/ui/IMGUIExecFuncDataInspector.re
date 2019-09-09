type state = {
  execFunc: Wonderjs.ExecIMGUIType.execFunc,
  execOrder: int,
  originExecFuncDataName: string,
};

type action =
  | ChangeExecFunc(Wonderjs.ExecIMGUIType.execFunc)
  | ChangeExecOrder(int)
  | Submit(string);

module Method = {
  let changeExecFuncDataName = (newName, renameFunc) => renameFunc(newName);

  let convertExecFuncToStr = func =>
    func |> SerializeService.serializeFunction;

  let changeExecFunc = (nodeId, execFuncStr, sendFunc) =>
    sendFunc(
      ChangeExecFunc(execFuncStr |> SerializeService.deserializeFunction),
    );

  let changeExecOrder = (execOrder, sendFunc) =>
    sendFunc(ChangeExecOrder(execOrder));

  let submit =
      (nodeId, {execFunc, execOrder, originExecFuncDataName}, sendFunc) => {
    let editorState = StateEditorService.getState();

    let execFuncDataName =
      IMGUIExecFuncDataNodeAssetEditorService.getNodeName(
        nodeId,
        editorState,
      );

    editorState
    |> IMGUIExecFuncDataNodeAssetEditorService.setNodeData(
         nodeId,
         IMGUIExecFuncDataNodeAssetService.buildNodeData(
           ~name=execFuncDataName,
           ~execFunc,
           ~execOrder,
         ),
       )
    |> StateEditorService.setState
    |> ignore;

    let engineState = StateEngineService.unsafeGetState();
    let engineState =
      ExecIMGUIEngineService.hasExecFuncData(
        originExecFuncDataName,
        engineState,
      ) ?
        ExecIMGUIEngineService.updateExecFuncData(
          originExecFuncDataName,
          execFuncDataName,
          IMGUIExecFuncDataNodeAssetService.buildEmptyCustomData(),
          execOrder,
          execFunc,
          engineState,
        ) :
        engineState;

    StateEngineService.setState(engineState) |> ignore;

    sendFunc(Submit(execFuncDataName));
  };
};

let component = ReasonReact.reducerComponent("IMGUIExecFuncDataInspector");

let reducer = action =>
  switch (action) {
  | ChangeExecFunc(execFunc) => (
      state => ReasonReact.Update({...state, execFunc})
    )
  | ChangeExecOrder(execOrder) => (
      state => ReasonReact.Update({...state, execOrder})
    )
  | Submit(originExecFuncDataName) => (
      state => ReasonReact.Update({...state, originExecFuncDataName})
    )
  };

let render =
    (nodeId, renameFunc, {state, send}: ReasonReact.self('a, 'b, 'c)) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article
    key="IMGUIExecFuncDataInspector"
    className="wonder-imguiExecFuncData-inspector">
    <h1> {DomHelper.textEl("IMGUI Exec Func Data")} </h1>
    <hr />
    <StringInput
      label="Name"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "imguiExecFuncData-name-describe",
          languageType,
        )
      }
      defaultValue={state.originExecFuncDataName}
      onBlur={value => Method.changeExecFuncDataName(value, renameFunc)}
      canBeNull=false
    />
    <IntInput
      key={DomHelper.getRandomKey()}
      label="ExecOrder"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "imguiExecFuncData-execOrder",
          languageType,
        )
      }
      defaultValue={state.execOrder |> string_of_int}
      onChange={value => Method.changeExecOrder(value, send)}
      onBlur={value => Method.changeExecOrder(value, send)}
      onDragDrop={value => Method.changeExecOrder(value, send)}
    />
    <div className="imguiExecFuncData-execFunc">
      <TextAreaInput
        label="Func"
        defaultInputValue={
          Method.convertExecFuncToStr(
            IMGUIExecFuncDataNodeAssetEditorService.getExecFunc(nodeId)
            |> StateLogicService.getEditorState,
          )
        }
        onBlurFunc={value => Method.changeExecFunc(nodeId, value, send)}
      />
    </div>
    <button onClick={_e => Method.submit(nodeId, state, send)}>
      {DomHelper.textEl("submit all")}
    </button>
  </article>;
};

let make =
    (
      ~uiState,
      ~dispatchFunc,
      ~currentNodeId,
      ~name,
      ~execOrder,
      ~execFunc,
      ~renameFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {originExecFuncDataName: name, execFunc, execOrder},
  reducer,
  render: self => render(currentNodeId, renameFunc, self),
};
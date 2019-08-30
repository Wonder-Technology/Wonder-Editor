type state = {
  execFunc: Wonderjs.ExecIMGUIType.execFunc,
  zIndex: int,
  execFuncName: string,
  originExecFuncName: string,
};

type action =
  | ChangeExecFunc(Wonderjs.ExecIMGUIType.execFunc)
  | ChangeZIndex(int)
  | ChangeExecFuncName(string)
  | Submit(string);

module Method = {
  let changeExecFuncName = (name, sendFunc) =>
    sendFunc(ChangeExecFuncName(name));

  let convertExecFuncToStr = func =>
    func |> SerializeService.serializeFunction;

  let changeExecFunc = (nodeId, execFuncStr, sendFunc) =>
    sendFunc(
      ChangeExecFunc(execFuncStr |> SerializeService.deserializeFunction),
    );

  let changeZIndex = (zIndex, sendFunc) => sendFunc(ChangeZIndex(zIndex));

  /* TODO test:
           originExecFuncName,
           execFuncName,
     */
  let submit =
      (
        nodeId,
        {execFunc, zIndex, execFuncName, originExecFuncName},
        sendFunc,
      ) => {
    IMGUIExecFuncDataNodeAssetEditorService.setNodeData(
      nodeId,
      IMGUIExecFuncDataNodeAssetService.buildNodeData(
        ~name=execFuncName,
        ~execFunc,
        ~zIndex,
      ),
    )
    |> StateLogicService.getAndSetEditorState;

    let engineState = StateEngineService.unsafeGetState();
    let engineState =
      ExecIMGUIEngineService.hasExecFuncData(originExecFuncName, engineState) ?
        ExecIMGUIEngineService.updateExecFuncData(
          originExecFuncName,
          execFuncName,
          IMGUIExecFuncDataNodeAssetService.buildEmptyCustomData(),
          zIndex,
          execFunc,
          engineState,
        ) :
        engineState;

    StateEngineService.setState(engineState) |> ignore;

    sendFunc(Submit(execFuncName));
  };
};

let component = ReasonReact.reducerComponent("IMGUIExecFuncDataInspector");

let reducer = action =>
  switch (action) {
  | ChangeExecFunc(execFunc) => (
      state => ReasonReact.Update({...state, execFunc})
    )
  | ChangeZIndex(zIndex) => (state => ReasonReact.Update({...state, zIndex}))
  | ChangeExecFuncName(newExecFuncName) => (
      state => ReasonReact.Update({...state, execFuncName: newExecFuncName})
    )
  | Submit(originExecFuncName) => (
      state => ReasonReact.Update({...state, originExecFuncName})
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
      defaultValue={state.execFuncName}
      onBlur={
        value => {
          renameFunc(value);

          Method.changeExecFuncName(value, send);
        }
      }
      canBeNull=false
    />
    <IntInput
      key={DomHelper.getRandomKey()}
      label="ZIndex"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "imguiExecFuncData-zIndex",
          languageType,
        )
      }
      defaultValue={state.zIndex |> string_of_int}
      onChange={value => Method.changeZIndex(value, send)}
      onBlur={value => Method.changeZIndex(value, send)}
      onDragDrop={value => Method.changeZIndex(value, send)}
    />
    <div className="imguiExecFuncData-execFunc">
      <FileInput
        inputValue={
          Method.convertExecFuncToStr(
            IMGUIExecFuncDataNodeAssetEditorService.getExecFunc(nodeId)
            |> StateLogicService.getEditorState,
          )
        }
        onSubmit={value => Method.changeExecFunc(nodeId, value, send)}
        isShowInput=true
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
      ~zIndex,
      ~execFunc,
      ~renameFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {
    execFuncName: name,
    originExecFuncName: name,
    execFunc,
    zIndex,
  },
  reducer,
  render: self => render(currentNodeId, renameFunc, self),
};
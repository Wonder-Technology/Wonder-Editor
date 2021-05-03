type state = {
  customControlFunc: Wonderjs.ExtendIMGUIType.customControlFunc,
  originCustomControlName: string,
};

type action =
  | ChangeCustomControlFunc(Wonderjs.ExtendIMGUIType.customControlFunc)
  | Submit(string);

module Method = {
  let changeCustomControlName = (newName, renameFunc) => renameFunc(newName);

  let convertCustomControlFuncToStr = func =>
    func |> SerializeService.serializeFunction;

  let changeCustomControlFunc = (nodeId, customControlFuncStr, send) =>
    send(
      ChangeCustomControlFunc(
        customControlFuncStr |> SerializeService.deserializeFunction,
      ),
    );

  let submit = (nodeId, {customControlFunc, originCustomControlName}, send) => {
    let editorState = StateEditorService.getState();

    let customControlName =
      IMGUICustomControlNodeAssetEditorService.getNodeName(
        nodeId,
        editorState,
      );

    editorState
    |> IMGUICustomControlNodeAssetEditorService.setNodeData(
         nodeId,
         IMGUICustomControlNodeAssetService.buildNodeData(
           ~name=customControlName,
           ~customControlFunc,
         ),
       )
    |> StateEditorService.setState
    |> ignore;

    let engineState = StateEngineService.unsafeGetState();
    let engineState =
      ExtendIMGUIEngineService.hasCustomControl(
        originCustomControlName,
        engineState,
      ) ?
        ExtendIMGUIEngineService.updateCustomControl(
          originCustomControlName,
          customControlName,
          customControlFunc,
          engineState,
        ) :
        engineState;

    StateEngineService.setState(engineState) |> ignore;

    send(Submit(customControlName));
  };
};

let component = ReasonReact.reducerComponent("IMGUICustomControlInspector");

let reducer = action =>
  switch (action) {
  | ChangeCustomControlFunc(customControlFunc) => (
      state => ReasonReact.Update({...state, customControlFunc})
    )
  | Submit(originCustomControlName) => (
      state => ReasonReact.Update({...state, originCustomControlName})
    )
  };

let render =
    (nodeId, renameFunc, {state, send}: ReasonReact.self('a, 'b, 'c)) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article
    key="IMGUICustomControlInspector"
    className="wonder-imguiCustomControl-inspector">
    <h1> {DomHelper.textEl("IMGUI Custom Control")} </h1>
    <hr />
    <StringInput
      label="Name"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "imguiCustomControl-name-describe",
          languageType,
        )
      }
      defaultValue={state.originCustomControlName}
      onBlur={value => Method.changeCustomControlName(value, renameFunc)}
      canBeNull=false
    />
    <div className="imguiCustomControl-customControl">
      <TextAreaInput
        label="Func"
        defaultInputValue={
          Method.convertCustomControlFuncToStr(
            IMGUICustomControlNodeAssetEditorService.getCustomControlFunc(
              nodeId,
            )
            |> StateLogicService.getEditorState,
          )
        }
        onBlurFunc={
          value => Method.changeCustomControlFunc(nodeId, value, send)
        }
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
      ~customControlFunc,
      ~renameFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {originCustomControlName: name, customControlFunc},
  reducer,
  render: self => render(currentNodeId, renameFunc, self),
};
type state = {
  customControlFunc: Wonderjs.ExtendIMGUIType.customControlFunc,
  customControlName: string,
  originCustomControlName: string,
};

type action =
  | ChangeCustomControlFunc(Wonderjs.ExtendIMGUIType.customControlFunc)
  | ChangeCustomControlName(string)
  | Submit(string);

module Method = {
  let changeCustomControlName = (name, send) =>
    send(ChangeCustomControlName(name));

  let convertCustomControlFuncToStr = func =>
    func |> SerializeService.serializeFunction;

  let changeCustomControlFunc = (nodeId, customControlFuncStr, send) =>
    send(
      ChangeCustomControlFunc(
        customControlFuncStr |> SerializeService.deserializeFunction,
      ),
    );

  let submit =
      (
        nodeId,
        {customControlFunc, customControlName, originCustomControlName},
        send,
      ) => {
    IMGUICustomControlNodeAssetEditorService.setNodeData(
      nodeId,
      IMGUICustomControlNodeAssetService.buildNodeData(
        ~name=customControlName,
        ~customControlFunc,
      ),
    )
    |> StateLogicService.getAndSetEditorState;

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
  | ChangeCustomControlName(newCustomControlName) => (
      state =>
        ReasonReact.Update({
          ...state,
          customControlName: newCustomControlName,
        })
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
      defaultValue={state.customControlName}
      onBlur={
        value => {
          renameFunc(value);

          Method.changeCustomControlName(value, send);
        }
      }
      canBeNull=false
    />
    <div className="imguiCustomControl-customControl">
      <FileInput
        inputValue={
          Method.convertCustomControlFuncToStr(
            IMGUICustomControlNodeAssetEditorService.getCustomControlFunc(
              nodeId,
            )
            |> StateLogicService.getEditorState,
          )
        }
        onSubmit={
          value => Method.changeCustomControlFunc(nodeId, value, send)
        }
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
      ~customControlFunc,
      ~renameFunc,
      _children,
    ) => {
  ...component,
  initialState: () => {
    customControlName: name,
    originCustomControlName: name,
    customControlFunc,
  },
  reducer,
  render: self => render(currentNodeId, renameFunc, self),
};
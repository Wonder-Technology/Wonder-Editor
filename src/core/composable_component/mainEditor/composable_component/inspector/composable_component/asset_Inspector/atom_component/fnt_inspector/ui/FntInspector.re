type state = {
  fntContent: string,
  fntName: string,
  originFntName: string,
};

type action =
  | ChangeFntName(string)
  | ChangeFntContent(string)
  | Submit(string);

module Method = {
  let changeFntName = (newName, renameFunc) => renameFunc(newName);

  let changeFntContent = (sendFunc, fntContent) =>
    sendFunc(ChangeFntContent(fntContent));

  let submit = (nodeId, {fntContent, fntName, originFntName}, sendFunc) => {
    FntNodeAssetEditorService.setNodeData(
      nodeId,
      FntNodeAssetService.buildNodeData(~name=fntName, ~fntContent),
    )
    |> StateLogicService.getAndSetEditorState;

    let engineState = StateEngineService.unsafeGetState();
    let engineState =
      AssetIMGUIEngineService.hasSettedAssetFntData(
        originFntName,
        engineState,
      ) ?
        AssetIMGUIEngineService.setSettedAssetFntData(
          fntName,
          fntContent,
          engineState,
        ) :
        engineState;

    StateEngineService.setState(engineState) |> ignore;

    sendFunc(Submit(fntName));
  };
};

let component = ReasonReact.reducerComponent("FntInspector");

let reducer = action =>
  switch (action) {
  | ChangeFntContent(fntContent) => (
      state => ReasonReact.Update({...state, fntContent})
    )
  | ChangeFntName(newFntName) => (
      state => ReasonReact.Update({...state, fntName: newFntName})
    )
  | Submit(originFntName) => (
      state => ReasonReact.Update({...state, originFntName})
    )
  };

let render =
    (nodeId, renameFunc, {state, send}: ReasonReact.self('a, 'b, 'c)) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  <article key="FntInspector" className="wonder-fnt-inspector">
    <h1> {DomHelper.textEl("Fnt")} </h1>
    <hr />
    <StringInput
      label="Name"
      title={
        LanguageUtils.getInspectorLanguageDataByType(
          "fnt-name-describe",
          languageType,
        )
      }
      defaultValue={state.fntName}
      onBlur={value => Method.changeFntName(value, renameFunc)}
      canBeNull=false
    />
    <TextAreaInput
      label="Fnt Content"
      defaultInputValue={state.fntContent}
      changeInputValueFunc={Method.changeFntContent(send)}
    />
    <button onClick={_e => Method.submit(nodeId, state, send)}>
      {DomHelper.textEl("submit")}
    </button>
  </article>;
};

let make = (~currentNodeId, ~name, ~fntContent, ~renameFunc, _children) => {
  ...component,
  initialState: () => {fntName: name, originFntName: name, fntContent},
  reducer,
  render: self => render(currentNodeId, renameFunc, self),
};
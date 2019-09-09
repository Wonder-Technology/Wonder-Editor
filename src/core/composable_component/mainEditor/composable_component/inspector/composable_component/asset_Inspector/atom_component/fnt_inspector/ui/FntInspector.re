type state = {
  fntContent: string,
  originFntName: string,
};

type action =
  | ChangeFntContent(string)
  | Submit(string);

module Method = {
  let changeFntName = (newName, renameFunc) => renameFunc(newName);

  let changeFntContent = (sendFunc, fntContent) =>
    sendFunc(ChangeFntContent(fntContent));

  let submit = (nodeId, {fntContent, originFntName}, sendFunc) => {
    let editorState = StateEditorService.getState();

    let fntName = FntNodeAssetEditorService.getNodeName(nodeId, editorState);

    editorState
    |> FntNodeAssetEditorService.setNodeData(
         nodeId,
         FntNodeAssetService.buildNodeData(~name=fntName, ~fntContent),
       )
    |> StateEditorService.setState
    |> ignore;

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
      defaultValue={state.originFntName}
      onBlur={value => Method.changeFntName(value, renameFunc)}
      canBeNull=false
    />
    <TextAreaInput
      label="Fnt Content"
      defaultInputValue={state.fntContent}
      onBlurFunc={Method.changeFntContent(send)}
    />
    <button onClick={_e => Method.submit(nodeId, state, send)}>
      {DomHelper.textEl("submit")}
    </button>
  </article>;
};

let make = (~currentNodeId, ~name, ~fntContent, ~renameFunc, _children) => {
  ...component,
  initialState: () => {originFntName: name, fntContent},
  reducer,
  render: self => render(currentNodeId, renameFunc, self),
};
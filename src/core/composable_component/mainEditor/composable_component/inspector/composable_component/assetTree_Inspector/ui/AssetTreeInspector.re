open AssetTreeNodeType;

open FileType;

open AssetNodeType;

type state = {
  inputValue: string,
  originalName: string,
  postfix: string,
};

type action =
  | Blur
  | Change(string);

module Method = {
  let change = event => {
    let inputVal = ReactDOMRe.domElementToObj(
                     ReactEventRe.Form.target(event),
                   )##value;
    Change(inputVal);
  };

  let buildFolderComponent = (state, send, nodeId) =>
    <div className="">
      <h1> (DomHelper.textEl("Folder")) </h1>
      <hr />
      <span className=""> (DomHelper.textEl("name:")) </span>
      <input
        className="input-component float-input"
        _type="text"
        value=state.inputValue
        disabled=(
          AssetUtils.isIdEqual(
            AssetTreeRootEditorService.getRootTreeNodeId
            |> StateLogicService.getEditorState,
            nodeId,
          )
        )
        onChange=(_e => send(change(_e)))
        onBlur=(_e => send(Blur))
      />
    </div>;

  let buildJsonComponent = (state, send, nodeResult) =>
    <div>
      <h1> (DomHelper.textEl("Json")) </h1>
      <hr />
      <span className=""> (DomHelper.textEl("name:")) </span>
      <input
        className="input-component float-input"
        _type="text"
        value=state.inputValue
        onChange=(_e => send(change(_e)))
        onBlur=(_e => send(Blur))
      />
      <p>
        (DomHelper.textEl(nodeResult.result |> OptionService.unsafeGet))
      </p>
    </div>;

  let showFolderInfo =
      (
        (store, dispatchFunc),
        nodeResult,
        nodeId,
        {state, send}: ReasonReact.self('a, 'b, 'c),
      ) =>
    switch (nodeResult.type_) {
    | Folder => buildFolderComponent(state, send, nodeId)
    | Texture =>
      let textureId =
        nodeResult.result |> OptionService.unsafeGet |> int_of_string;
      <TextureInspector
        store
        dispatchFunc
        name=(
          BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName(
            textureId,
          )
          |> StateLogicService.getEngineStateToGetData
        )
        nodeId
        textureId
      />;
    | Json => buildJsonComponent(state, send, nodeResult)
    | _ =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="showFolderInfo",
          ~description={j|the type:$nodeResult not exist|j},
        ),
      )
    };
};

let component = ReasonReact.reducerComponent("AssetTreeInspector");

let reducer = (dispatchFunc, nodeId, action) =>
  switch (action) {
  | Change(value) => (
      state => ReasonReact.Update({...state, inputValue: value})
    )
  | Blur => (
      state =>
        switch (state.inputValue) {
        | "" => ReasonReact.Update({...state, inputValue: state.originalName})
        | value =>
          ReasonReactUtils.updateWithSideEffects(
            {...state, originalName: value}, _state =>
            AssetTreeInspectorUtils.renameAssetTreeNode(
              dispatchFunc,
              value ++ state.postfix,
              nodeId,
            )
            |> StateLogicService.getEditorState
          )
        }
    )
  };

let render = ((store, dispatchFunc), nodeResult, nodeId, self) =>
  <article key="AssetTreeInspector" className="wonder-inspector-assetTree">
    (Method.showFolderInfo((store, dispatchFunc), nodeResult, nodeId, self))
  </article>;

let make =
    (
      ~store: AppStore.appState,
      ~dispatchFunc,
      ~nodeId,
      ~nodeResult,
      _children,
    ) => {
  ...component,
  initialState: () => {
    let (fileName, postfix) = FileNameUtils.handleFileName(nodeResult.name);
    {inputValue: fileName, originalName: fileName, postfix};
  },
  reducer: reducer(dispatchFunc, nodeId),
  render: self => render((store, dispatchFunc), nodeResult, nodeId, self),
};
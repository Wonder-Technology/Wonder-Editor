open AssetTreeNodeType;
open FileType;
open AssetNodeType;
open CurrentNodeDataType;

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

  let buildFolderComponent = (state, send, currentNodeId, folderNodeMap) =>
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
            AssetTreeRootAssetService.getRootTreeNodeId
            |> StateLogicService.getAssetState,
            currentNodeId,
          )
        )
        onChange=(_e => send(change(_e)))
        onBlur=(_e => send(Blur))
      />
    </div>;

  let buildJsonComponent = (state, send, currentNodeId, jsonNodeMap) => {
    let {name, jsonResult} =
      jsonNodeMap |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId);
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
      <p> (DomHelper.textEl(jsonResult)) </p>
    </div>;
  };
  let buildTextureComponent =
      (
        (store, dispatchFunc),
        (currentNodeId, nodeType),
        state,
        textureNodeMap,
      ) => {
    let {textureId} =
      textureNodeMap
      |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId);

    <TextureInspector
      store
      dispatchFunc
      name=state.inputValue
      textureId
      renameFunc=(
        AssetTreeInspectorUtils.renameAssetTreeNode(
          dispatchFunc,
          textureId,
          nodeType,
        )
      )
    />;
  };

  /* TODO rename to showAssetNodeComponent */
  let showAssetNodeComponent =
      (
        reduxTuple,
        currentNodeId,
        nodeType,
        {state, send}: ReasonReact.self('a, 'b, 'c),
      ) =>
    AssetNodeUtils.handleSpeficFuncByAssetNodeType(
      nodeType,
      (
        buildFolderComponent(state, send, currentNodeId),
        buildJsonComponent(state, send, currentNodeId),
        buildTextureComponent(reduxTuple, (currentNodeId, nodeType), state),
      ),
    );

  let initFolderName = (currentNodeId, folderNodeMap) => {
    let (fileName, postfix) =
      FolderNodeMapAssetService.getFolderBaseNameAndExtName(
        currentNodeId,
        folderNodeMap,
      );

    {inputValue: fileName, originalName: fileName, postfix};
  };
  let initJsonName = (currentNodeId, jsonNodeMap) => {
    let (fileName, postfix) =
      JsonNodeMapAssetService.getJsonBaseNameAndExtName(
        currentNodeId,
        jsonNodeMap,
      );

    {inputValue: fileName, originalName: fileName, postfix};
  };
  let initTextureName = (currentNodeId, textureNodeMap) => {
    let (fileName, postfix) =
      OperateTextureLogicService.getTextureBaseNameAndExtName(
        currentNodeId,
        textureNodeMap,
      );

    {inputValue: fileName, originalName: fileName, postfix};
  };
};

let component = ReasonReact.reducerComponent("AssetTreeInspector");

let reducer = (dispatchFunc, currentNodeId, nodeType, action) =>
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
              currentNodeId,
              nodeType,
              value ++ state.postfix,
            )
          )
        }
    )
  };

let render = ((store, dispatchFunc), currentNodeId, nodeType, self) =>
  <article key="AssetTreeInspector" className="wonder-inspector-assetTree">
    (
      Method.showAssetNodeComponent(
        (store, dispatchFunc),
        currentNodeId,
        nodeType,
        self,
      )
    )
  </article>;

let make =
    (
      ~store: AppStore.appState,
      ~dispatchFunc,
      ~currentNodeId,
      ~nodeType,
      _children,
    ) => {
  ...component,
  initialState: () =>
    AssetNodeUtils.handleSpeficFuncByAssetNodeType(
      nodeType,
      (
        Method.initFolderName(currentNodeId),
        Method.initJsonName(currentNodeId),
        Method.initTextureName(currentNodeId),
      ),
    ),
  reducer: reducer(dispatchFunc, currentNodeId, nodeType),
  render: self =>
    render((store, dispatchFunc), currentNodeId, nodeType, self),
};
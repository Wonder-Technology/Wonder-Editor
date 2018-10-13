open AssetTreeNodeType;
open FileType;
open AssetNodeType;
open CurrentNodeDataType;

type state = {
  inputValue: string,
  originalName: string,
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

  let renameAssetTreeNode = AssetRenameNodeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let buildFolderComponent = (state, send, currentNodeId, folderNodeMap) =>
    <div className="inspector-asset-folder">
      <h1> (DomHelper.textEl("Folder")) </h1>
      <hr />
      <div className="inspector-item">
        <div className="item-header">
          <span> (DomHelper.textEl("name")) </span>
        </div>
        <div className="item-content">
          <input
            className="input-component float-input"
            _type="text"
            value=state.inputValue
            disabled=(
              AssetUtils.isIdEqual(
                AssetTreeRootEditorService.getRootTreeNodeId
                |> StateLogicService.getEditorState,
                currentNodeId,
              )
            )
            onChange=(_e => send(change(_e)))
            onBlur=(_e => send(Blur))
          />
        </div>
      </div>
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
    let {textureIndex} =
      textureNodeMap
      |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId);

    <TextureInspector
      store
      dispatchFunc
      name=state.inputValue
      textureIndex
      renameFunc=(
        renameAssetTreeNode(
          (store, dispatchFunc),
          (currentNodeId, nodeType),
        )
      )
    />;
  };

  let buildMaterialComponent =
      (
        (store, dispatchFunc),
        (currentNodeId, nodeType),
        state,
        materialNodeMap,
      ) => {
    let {type_, materialComponent} =
      materialNodeMap
      |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId);

    <MaterialInspector
      store
      dispatchFunc
      currentNodeId
      name=state.inputValue
      type_
      materialComponent
      renameFunc=(
        renameAssetTreeNode(
          (store, dispatchFunc),
          (currentNodeId, nodeType),
        )
      )
    />;
  };

  let buildWDBComponent = (state, send, currentNodeId, wdbNodeMap) =>
    <div>
      <h1> (DomHelper.textEl("Model")) </h1>
      <hr />
      <span className=""> (DomHelper.textEl("name:")) </span>
      <input
        className="input-component float-input"
        _type="text"
        value=state.inputValue
        onChange=(_e => send(change(_e)))
        onBlur=(_e => send(Blur))
      />
    </div>;

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
        buildMaterialComponent(reduxTuple, (currentNodeId, nodeType), state),
        buildWDBComponent(state, send, currentNodeId),
      ),
    )
    |> StateLogicService.getEditorState;

  let initFolderName = (currentNodeId, folderNodeMap) => {
    let folderName =
      AssetFolderNodeMapEditorService.getFolderName(
        currentNodeId,
        folderNodeMap,
      );

    {inputValue: folderName, originalName: folderName};
  };
  let initJsonName = (currentNodeId, jsonNodeMap) => {
    let baseName =
      AssetJsonNodeMapEditorService.getJsonBaseName(
        currentNodeId,
        jsonNodeMap,
      );

    {inputValue: baseName, originalName: baseName};
  };
  let initTextureName = (currentNodeId, textureNodeMap) => {
    let baseName =
      OperateTextureLogicService.getTextureBaseName(
        currentNodeId,
        textureNodeMap,
      );

    {inputValue: baseName, originalName: baseName};
  };

  let initMaterialName = (currentNodeId, materialNodeMap) => {
    let baseName =
      OperateMaterialLogicService.getMaterialBaseName(
        currentNodeId,
        materialNodeMap,
      );

    {inputValue: baseName, originalName: baseName};
  };
  let initWDBName = (currentNodeId, wdbNodeMap) => {
    let baseName =
      AssetWDBNodeMapEditorService.getWDBBaseName(currentNodeId, wdbNodeMap);

    {inputValue: baseName, originalName: baseName};
  };
};

let component = ReasonReact.reducerComponent("AssetTreeInspector");

let reducer = ((store, dispatchFunc), currentNodeId, nodeType, action) =>
  switch (action) {
  | Change(value) => (
      state => ReasonReact.Update({...state, inputValue: value})
    )
  | Blur => (
      state =>
        switch (state.inputValue) {
        | "" => ReasonReact.Update({...state, inputValue: state.originalName})
        | value =>
          state.inputValue
          |> ValueService.isValueEqual(ValueType.String, state.originalName) ?
            ReasonReact.NoUpdate :
            ReasonReactUtils.updateWithSideEffects(
              {...state, originalName: value}, _state =>
              Method.renameAssetTreeNode(
                (store, dispatchFunc),
                (currentNodeId, nodeType),
                value,
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
        Method.initMaterialName(currentNodeId),
        Method.initWDBName(currentNodeId),
      ),
    )
    |> StateLogicService.getEditorState,
  reducer: reducer((store, dispatchFunc), currentNodeId, nodeType),
  render: self =>
    render((store, dispatchFunc), currentNodeId, nodeType, self),
};
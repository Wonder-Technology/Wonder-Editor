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

  let _isFolderNameDisabled = nodeId =>
    AssetTreeEditorService.isIdEqual(
      AssetTreeRootEditorService.getRootTreeNodeId
      |> StateLogicService.getEditorState,
      nodeId,
    );

  let buildFolderComponent = (state, send, currentNodeId, folderNodeMap) =>
    <div className="inspector-asset-folder">
      <h1> (DomHelper.textEl("Folder")) </h1>
      <hr />
      <div className="inspector-item">
        <div className="item-header">
          <span> (DomHelper.textEl("Name")) </span>
        </div>
        <div className="item-content">
          <input
            className="input-component float-input"
            _type="text"
            value=state.inputValue
            disabled=(
              AssetTreeEditorService.isIdEqual(
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

  let buildTextureComponent =
      (
        (store, dispatchFunc),
        (currentNodeId, nodeType),
        state,
        textureNodeMap,
      ) => {
    let {textureComponent} =
      textureNodeMap
      |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId);

    <TextureInspector
      store
      dispatchFunc
      name=state.inputValue
      textureComponent
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
    <div className="inspector-asset-wdb">
      <h1> (DomHelper.textEl("Model")) </h1>
      <hr />
      <div className="inspector-item">
        <div className="item-header">
          <span className=""> (DomHelper.textEl("Name:")) </span>
        </div>
        <div className="item-content">
          <input
            className="input-component float-input"
            _type="text"
            value=state.inputValue
            onChange=(_e => send(change(_e)))
            onBlur=(_e => send(Blur))
          />
        </div>
      </div>
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

  let initTextureName = (currentNodeId, textureNodeMap) => {
    let baseName =
      OperateTextureLogicService.getTextureBaseName(
        currentNodeId,
        textureNodeMap,
      );

    {inputValue: baseName, originalName: baseName};
  };

  let initMaterialName = (currentNodeId, engineState, materialNodeMap) => {
    let baseName =
      AssetMaterialNodeMapLogicService.getMaterialBaseName(
        currentNodeId,
        engineState,
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
  initialState: () => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    editorState
    |> AssetNodeUtils.handleSpeficFuncByAssetNodeType(
         nodeType,
         (
           Method.initFolderName(currentNodeId),
           Method.initTextureName(currentNodeId),
           Method.initMaterialName(currentNodeId, engineState),
           Method.initWDBName(currentNodeId),
         ),
       );
  },
  reducer: reducer((store, dispatchFunc), currentNodeId, nodeType),
  render: self =>
    render((store, dispatchFunc), currentNodeId, nodeType, self),
};
module Method = {
  let isCurrentNodeIdEqualRootId = editorState =>
    switch (
      editorState |> AssetCurrentNodeDataEditorService.getCurrentNodeData
    ) {
    | None => true
    | Some({currentNodeId}) =>
      AssetUtils.isIdEqual(
        currentNodeId,
        editorState |> AssetTreeRootEditorService.getRootTreeNodeId,
      )
    };
  let addFolder = AssetHeaderAddFolderEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let removeAssetNode = AssetHeaderRemoveNodeEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let fileLoad = AssetHeaderFileLoadEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

  let addMaterial = AssetHeaderAddMaterialEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;
};

let component = ReasonReact.statelessComponent("MainEditorAssetHeader");

let render = ((store, dispatchFunc), _self) =>
  <article key="assetHeader" className="wonder-asset-header">
    <div className="header-item">
      <button
        onClick=(_e => Method.addFolder((store, dispatchFunc), (), ()))>
        (DomHelper.textEl("addFolder"))
      </button>
    </div>
    <div className="header-item">
      <button
        onClick=(_e => Method.removeAssetNode((store, dispatchFunc), (), ()))
        disabled=(
          Method.isCurrentNodeIdEqualRootId |> StateLogicService.getEditorState
        )>
        (DomHelper.textEl("remove"))
      </button>
    </div>
    <div className="header-item">
      <input
        className="file-upload"
        _type="file"
        multiple=true
        onChange=(e => Method.fileLoad((store, dispatchFunc), (), e))
      />
    </div>
    <div className="">
      <button
        onClick=(_e => Method.addMaterial((store, dispatchFunc), (), ()))>
        (DomHelper.textEl("addMaterial"))
      </button>
    </div>
  </article>;

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), self),
};
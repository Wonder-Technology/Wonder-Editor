open FileType;

open AssetNodeType;

open Js.Promise;

open CurrentNodeDataType;

open UpdateStore;

module Method = {
  let isCurrentNodeIdEqualRootId = editorState =>
    switch (editorState |> AssetCurrentNodeDataEditorService.getCurrentNodeData) {
    | None => true
    | Some({currentNodeId}) =>
      AssetUtils.isIdEqual(
        currentNodeId,
        editorState |> AssetTreeRootEditorService.getRootTreeNodeId,
      )
    };
  let addFolder = (dispatchFunc, _event) => {
    (
      editorState => {
        let editorState = editorState |> AssetIndexEditorService.increaseIndex;
        let nextIndex = editorState |> AssetIndexEditorService.getIndex;

        editorState
        |> AssetTreeNodeUtils.addFolderIntoNodeMap(nextIndex)
        |> AssetTreeNodeUtils.createNodeAndAddToTargetNodeChildren(
             editorState |> AssetUtils.getTargetTreeNodeId,
             nextIndex,
             Folder,
           );
      }
    )
    |> StateLogicService.getAndSetEditorState;

    dispatchFunc(AppStore.UpdateAction(Update([|Asset|])))
    |> ignore;
  };

  let _isRemoveAssetTreeNode = (currentNodeId, currentNodeParentId) =>
    AssetUtils.isIdEqual(currentNodeParentId, currentNodeId);

  let removeAssetNode = (dispatchFunc, _event) => {
    (
      editorState => {
        let {currentNodeId} =
          editorState |> AssetCurrentNodeDataEditorService.unsafeGetCurrentNodeData;
        let (newAssetTreeRoot, removedTreeNode) =
          editorState
          |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
          |> AssetUtils.removeSpecificTreeNode(currentNodeId);
        let editorState = removedTreeNode |> AssetUtils.deepRemoveTreeNode;

        _isRemoveAssetTreeNode(
          currentNodeId,
          AssetUtils.getTargetTreeNodeId(editorState),
        ) ?
          editorState
          |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
          |> AssetTreeRootEditorService.setAssetTreeRoot(newAssetTreeRoot)
          |> AssetCurrentNodeDataEditorService.clearCurrentNodeData :
          editorState
          |> AssetTreeRootEditorService.setAssetTreeRoot(newAssetTreeRoot)
          |> AssetCurrentNodeDataEditorService.clearCurrentNodeData;
      }
    )
    |> StateLogicService.getAndSetEditorState;

    dispatchFunc(AppStore.UpdateAction(Update([|Asset, Inspector|])))
    |> ignore;
  };
  let _fileLoad = (dispatchFunc, event) => {
    let e = ReactEventType.convertReactFormEventToJsEvent(event);
    DomHelper.preventDefault(e);

    let fileInfoArr =
      e##target##files
      |> Js.Dict.values
      |> Js.Array.map(AssetTreeNodeUtils.convertFileJsObjectToFileInfoRecord);

    WonderBsMost.Most.from(fileInfoArr)
    |> WonderBsMost.Most.flatMap((fileInfo: fileInfoType) =>
         WonderBsMost.Most.fromPromise(
           Js.Promise.make((~resolve, ~reject) => {
             let reader = FileReader.createFileReader();
             FileReader.onload(reader, result =>
               resolve(. {
                 name: fileInfo.name,
                 type_: AssetTreeNodeUtils.getUploadFileType(fileInfo.type_),
                 result,
               })
             );
             AssetTreeNodeUtils.readFileByType(reader, fileInfo);
           }),
         )
       )
    |> WonderBsMost.Most.flatMap((fileResult: nodeResultType) =>
         WonderBsMost.Most.fromPromise(
           fileResult |> AssetTreeNodeUtils.handleFileByType,
         )
       )
    |> WonderBsMost.Most.drain
    |> then_(_ =>
         dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Asset|])))
         |> resolve
       );
  };
  let fileLoad = (dispatchFunc, event) =>
    _fileLoad(dispatchFunc, event) |> ignore;
};

let component = ReasonReact.statelessComponent("MainEditorAssetHeader");

let render = ((_store, dispatchFunc), _self) =>
  <article key="assetHeader" className="wonder-asset-header">
    <div className="header-item">
      <button onClick=(Method.addFolder(dispatchFunc))>
        (DomHelper.textEl("addFolder"))
      </button>
    </div>
    <div className="header-item">
      <button
        onClick=(Method.removeAssetNode(dispatchFunc))
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
        onChange=(e => Method.fileLoad(dispatchFunc, e))
      />
    </div>
  </article>;

let make = (~store: AppStore.appState, ~dispatchFunc, _children) => {
  ...component,
  render: self => render((store, dispatchFunc), self),
};
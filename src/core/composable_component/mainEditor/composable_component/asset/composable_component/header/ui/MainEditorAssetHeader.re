open FileType;

open AssetNodeType;

open Js.Promise;

module Method = {
  let isCurrentNodeIdEqualRootId = editorState =>
    switch (editorState |> AssetCurrentNodeIdEditorService.getCurrentNodeId) {
    | None => true
    | Some(id) =>
      AssetUtils.isIdEqual(
        id,
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
        |> AssetTreeNodeUtils.createNodeAndAddToCurrentNodeParent(nextIndex);
      }
    )
    |> StateLogicService.getAndSetEditorState;
    dispatchFunc(AppStore.ReLoad) |> ignore;
  };

  let _isRemoveAssetTreeNode = (currentNodeId, currentNodeParentId) =>
    AssetUtils.isIdEqual(currentNodeParentId, currentNodeId);

  let remove = (dispatchFunc, _event) => {
    (
      editorState => {
        let currentNodeId =
          editorState |> AssetCurrentNodeIdEditorService.unsafeGetCurrentNodeId;
        let (newAssetTreeRoot, removedTreeNode) =
          editorState
          |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
          |> AssetUtils.removeSpecificTreeNode(currentNodeId);

        let editorState =
          editorState
          |> AssetNodeMapEditorService.unsafeGetNodeMap
          |> AssetUtils.deepRemoveTreeNode(removedTreeNode)
          |. AssetNodeMapEditorService.setNodeMap(editorState);

        _isRemoveAssetTreeNode(
          currentNodeId,
          AssetUtils.getTargetTreeNodeId(editorState),
        ) ?
          editorState
          |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
          |> AssetTreeRootEditorService.setAssetTreeRoot(newAssetTreeRoot)
          |> AssetCurrentNodeIdEditorService.clearCurrentNodeId :
          editorState
          |> AssetTreeRootEditorService.setAssetTreeRoot(newAssetTreeRoot)
          |> AssetCurrentNodeIdEditorService.clearCurrentNodeId;
      }
    )
    |> StateLogicService.getAndSetEditorState;
    dispatchFunc(AppStore.ReLoad) |> ignore;
  };
  let _fileLoad = (dispatchFunc, event) => {
    let e = ReactEvent.convertReactFormEventToJsEvent(event);
    DomHelper.preventDefault(e);
    let fileInfoArr =
      e##target##files
      |> Js.Dict.values
      |> Js.Array.map(AssetTreeNodeUtils.convertFileJsObjectToFileInfoRecord);
    Most.from(fileInfoArr)
    |> Most.flatMap((fileInfo: fileInfoType) =>
         Most.fromPromise(
           Js.Promise.make((~resolve, ~reject) => {
             let reader = FileReader.createFileReader();
             FileReader.onload(reader, result =>
               resolve(. {
                 name: fileInfo.name,
                 type_:
                   AssetTreeNodeUtils.getAssetTreeAssetNodeTypeByFileType(
                     fileInfo.type_,
                   ),
                 result: Some(result),
               })
             );
             AssetTreeNodeUtils.readFileByType(reader, fileInfo);
           }),
         )
       )
    |> Most.forEach(AssetTreeNodeUtils.handleFileByType)
    |> then_(_ => dispatchFunc(AppStore.ReLoad) |> resolve);
  };
  let fileLoad = (dispatchFunc, event) => {
    _fileLoad(dispatchFunc, event) |> ignore;
    ();
  };
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
        onClick=(Method.remove(dispatchFunc))
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
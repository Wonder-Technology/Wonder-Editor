open FileType;
open AssetNodeType;
open Js.Promise;
open CurrentNodeDataType;

module Method = {
  let isCurrentNodeIdEqualRootId = assetState =>
    switch (assetState |> CurrentNodeDataAssetService.getCurrentNodeData) {
    | None => true
    | Some({currentNodeId, nodeType}) =>
      AssetUtils.isIdEqual(
        currentNodeId,
        assetState |> AssetTreeRootAssetService.getRootTreeNodeId,
      )
    };
  let addFolder = (dispatchFunc, _event) => {
    (
      assetState => {
        let assetState = assetState |> IndexAssetService.increaseIndex;
        let nextIndex = assetState |> IndexAssetService.getIndex;

        assetState
        |> AssetTreeNodeUtils.addFolderIntoNodeMap(nextIndex)
        |> AssetTreeNodeUtils.createNodeAndAddToTargetNodeChildren(
             assetState |> AssetUtils.getTargetTreeNodeId,
             nextIndex,
             Folder,
           );
      }
    )
    |> StateLogicService.getAndSetAssetState;
    dispatchFunc(AppStore.ReLoad) |> ignore;
  };

  let _isRemoveAssetTreeNode = (currentNodeId, currentNodeParentId) =>
    AssetUtils.isIdEqual(currentNodeParentId, currentNodeId);

  let remove = (dispatchFunc, _event) => {
    (
      assetState => {
        let {currentNodeId, nodeType} =
          assetState |> CurrentNodeDataAssetService.unsafeGetCurrentNodeData;
        let (newAssetTreeRoot, removedTreeNode) =
          assetState
          |> AssetTreeRootAssetService.unsafeGetAssetTreeRoot
          |> AssetUtils.removeSpecificTreeNode(currentNodeId);
        let assetState = removedTreeNode |> AssetUtils.deepRemoveTreeNode;

        _isRemoveAssetTreeNode(
          currentNodeId,
          AssetUtils.getTargetTreeNodeId(assetState),
        ) ?
          assetState
          |> CurrentNodeParentIdAssetService.clearCurrentNodeParentId
          |> AssetTreeRootAssetService.setAssetTreeRoot(newAssetTreeRoot)
          |> CurrentNodeDataAssetService.clearCurrentNodeData :
          assetState
          |> AssetTreeRootAssetService.setAssetTreeRoot(newAssetTreeRoot)
          |> CurrentNodeDataAssetService.clearCurrentNodeData;
      }
    )
    |> StateLogicService.getAndSetAssetState;
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
                 type_: AssetTreeNodeUtils.getUploadFileType(fileInfo.type_),
                 result,
               })
             );
             AssetTreeNodeUtils.readFileByType(reader, fileInfo);
           }),
         )
       )
    |> Most.flatMap((fileResult: nodeResultType) =>
         Most.fromPromise(fileResult |> AssetTreeNodeUtils.handleFileByType)
       )
    |> Most.drain
    |> then_(_ => dispatchFunc(AppStore.ReLoad) |> resolve);
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
        onClick=(Method.remove(dispatchFunc))
        disabled=(
          Method.isCurrentNodeIdEqualRootId |> StateLogicService.getAssetState
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
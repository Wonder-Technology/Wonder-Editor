open FileType;

open AssetNodeType;

open Js.Promise;

module Method = {
  let isCurrentNodeIdEqualRootId = (editorState) =>
    switch (editorState |> AssetCurrentNodeIdEditorService.getCurrentNodeId) {
    | None => Js.true_
    | Some(id) =>
      AssetUtils.isIdEqual(id, editorState |> AssetTreeRootEditorService.getRootTreeNodeId) ?
        Js.true_ : Js.false_
    };
  let addFolder = (dispatchFunc, currentNodeParentId, _event) => {
    (
      (editorState) => {
        let editorState = editorState |> AssetIndexEditorService.increaseIndex;
        let nextIndex = editorState |> AssetIndexEditorService.getIndex;
        editorState
        |> AssetTreeNodeUtils.addFolderIntoNodeMap(nextIndex)
        /* TODO duplicate with AssetTreeNodeUtils->handleFileByType */
        |> AssetTreeRootEditorService.setAssetTreeRoot(
             editorState
             |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
             |> AssetUtils.insertNewTreeNodeToTargetTreeNode(
                  AssetUtils.getTargetTreeNodeId(currentNodeParentId, editorState),
                  AssetNodeEditorService.buildAssetTreeNodeByIndex(nextIndex)
                )
           )
      }
    )
    |> StateLogicService.getAndSetEditorState;
    dispatchFunc(AppStore.ReLoad) |> ignore
  };
  let remove = (dispatchFunc, currentNodeParentId, clearNodeParentId, _event) => {
    (
      (editorState) => {
        let currentNodeId = editorState |> AssetCurrentNodeIdEditorService.unsafeGetCurrentNodeId;
        let (newAssetTreeRoot, removedTreeNode) =
          editorState
          |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
          |> AssetUtils.removeSpecificTreeNodeFromAssetTree(currentNodeId);
        /* TODO set nodeMap to editorState(immutable) */
        AssetUtils.deepRemoveTreeNodeChildren(
          removedTreeNode,
          editorState |> AssetNodeMapEditorService.unsafeGetNodeMap
        )
        |> ignore;
        /* TODO refactor to this:
           _isRemoveAssetChildrenNode ? {
           _clearCurrentNode
           } : {
           _isRemoveAssetTreeNode ? {

           _clearCurrentNode
           |> setCurrentNodeParentBeItsParentNode

           }: {
           WonderLog.Log.fatal(WonderLog.Log.buildFatalMessage(~title="", ~description={j||j}, ~reason="", ~solution={j||j}, ~params={j||j}));

           }
           } */
        AssetUtils.isIdEqual(currentNodeParentId |> OptionService.unsafeGet, currentNodeId) ?
          clearNodeParentId() : ();
        editorState
        |> AssetTreeRootEditorService.setAssetTreeRoot(newAssetTreeRoot)
        |> AssetCurrentNodeIdEditorService.clearCurrentNodeId
      }
    )
    |> StateLogicService.getAndSetEditorState;
    dispatchFunc(AppStore.ReLoad) |> ignore
  };
  let _fileLoad = (dispatchFunc, currentNodeParentId, event) => {
    let e = ReactEvent.convertReactFormEventToJsEvent(event);
    DomHelper.preventDefault(e);
    let fileInfoArr =
      e##target##files
      |> Js.Dict.values
      |> Js.Array.map(AssetTreeNodeUtils.convertFileJsObjectToFileInfoRecord);
    Most.from(fileInfoArr)
    |> Most.flatMap(
         (fileInfo: fileInfoType) =>
           Most.fromPromise(
             Js.Promise.make(
               (~resolve, ~reject) => {
                 let reader = FileReader.createFileReader();
                 FileReader.onload(
                   reader,
                   (result) =>
                     [@bs]
                     resolve({
                       name: fileInfo.name,
                       type_:
                         /* TODO rename to xxxByFileType */
                         AssetTreeNodeUtils.getAssetTreeAssetNodeTypeByAssetNodeType(
                           fileInfo.type_
                         ),
                       result: Some(result)
                     })
                 );
                 AssetTreeNodeUtils.readFileByType(reader, fileInfo)
               }
             )
           )
       )
    |> Most.forEach(AssetTreeNodeUtils.handleFileByType(currentNodeParentId))
    |> then_((_) => dispatchFunc(AppStore.ReLoad) |> resolve)
  };
  let fileLoad = (currentNodeParentId, dispatchFunc, event) => {
    _fileLoad(dispatchFunc, currentNodeParentId, event) |> ignore;
    ()
  };
};

let component = ReasonReact.statelessComponent("MainEditorAssetHeader");

let render = (store, currentNodeParentId, (dispatchFunc, clearNodeParentId), _self) =>
  <article key="assetHeader" className="tree-header">
    <div className="header-item">
      <button onClick=(Method.addFolder(dispatchFunc, currentNodeParentId))>
        (DomHelper.textEl("addFolder"))
      </button>
    </div>
    <div className="header-item">
      <button
        onClick=(Method.remove(dispatchFunc, currentNodeParentId, clearNodeParentId))
        disabled=(Method.isCurrentNodeIdEqualRootId |> StateLogicService.getEditorState)>
        (DomHelper.textEl("remove"))
      </button>
    </div>
    <div className="header-item">
      <input
        className="file-upload"
        _type="file"
        multiple=Js.true_
        onChange=((e) => Method.fileLoad(currentNodeParentId, dispatchFunc, e))
      />
    </div>
  </article>;

let make =
    (~store: AppStore.appState, ~dispatchFunc, ~currentNodeParentId, ~clearNodeParentId, _children) => {
  ...component,
  render: (self) => render(store, currentNodeParentId, (dispatchFunc, clearNodeParentId), self)
};
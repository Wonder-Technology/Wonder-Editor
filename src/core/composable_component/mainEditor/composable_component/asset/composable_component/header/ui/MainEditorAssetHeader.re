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
  let addFolder = (dispatch, currentNodeParentId, _event) => {
    (
      (editorState) => {
        let editorState = editorState |> AssetIndexEditorService.increaseIndex;
        let nextIndex = editorState |> AssetIndexEditorService.getIndex;
        editorState
        |> AssetTreeNodeUtils.addFolderIntoNodeMap(nextIndex)
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
    dispatch(AppStore.ReLoad) |> ignore
  };
  let remove = (dispatch, currentNodeParentId, clearNodeParentId, _event) => {
    (
      (editorState) => {
        let currentNodeId = editorState |> AssetCurrentNodeIdEditorService.unsafeGetCurrentNodeId;
        let (newAssetTreeRoot, removedTreeNode) =
          editorState
          |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
          |> AssetUtils.removeSpecificTreeNodeFromAssetTree(currentNodeId);
        AssetUtils.deepRemoveTreeNodeChildren(
          removedTreeNode,
          editorState |> AssetNodeMapEditorService.unsafeGetNodeMap
        );
        AssetUtils.isIdEqual(currentNodeParentId |> OptionService.unsafeGet, currentNodeId) ?
          clearNodeParentId() : ();
        editorState
        |> AssetTreeRootEditorService.setAssetTreeRoot(newAssetTreeRoot)
        |> AssetCurrentNodeIdEditorService.clearCurrentNodeId
      }
    )
    |> StateLogicService.getAndSetEditorState;
    dispatch(AppStore.ReLoad) |> ignore
  };
  let _fileLoad = (dispatch, currentNodeParentId, event) => {
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
    |> then_((_) => dispatch(AppStore.ReLoad) |> resolve)
  };
  let fileLoad = (dispatch, currentNodeParentId, event) => {
    _fileLoad(dispatch, currentNodeParentId, event) |> ignore;
    ()
  };
};

let component = ReasonReact.statelessComponent("MainEditorAssetHeader");

let render = (store, dispatch, currentNodeParentId, clearNodeParentId, _self) =>
  <article key="assetHeader" className="tree-header">
    <div className="header-item">
      <button onClick=(Method.addFolder(dispatch, currentNodeParentId))>
        (DomHelper.textEl("addFolder"))
      </button>
    </div>
    <div className="header-item">
      <button
        onClick=(Method.remove(dispatch, currentNodeParentId, clearNodeParentId))
        disabled=(Method.isCurrentNodeIdEqualRootId |> StateLogicService.getEditorState)>
        (DomHelper.textEl("remove"))
      </button>
    </div>
    <div className="header-item">
      <input
        className="file-upload"
        multiple=Js.true_
        onChange=((e) => Method.fileLoad(dispatch, currentNodeParentId, e))
        _type="file"
      />
    </div>
  </article>;

let make =
    (~store: AppStore.appState, ~dispatch, ~currentNodeParentId, ~clearNodeParentId, _children) => {
  ...component,
  render: (self) => render(store, dispatch, currentNodeParentId, clearNodeParentId, self)
};
open FileType;

open AssetNodeType;

open Js.Promise;

module Method = {
  let isTargetIdEqualRootId = (editorState) =>
    AssetUtils.isIdEqual(
      editorState |> AssetUtils.getTargetTreeNodeId,
      editorState |> AssetTreeRootEditorService.getRootTreeNodeId
    )
    |> Js.Boolean.to_js_boolean;
  /* let removeFolder = (dispatch, _event) =>
     AssetUtils.isTargetIdEqualRootId |> StateLogicService.getEditorState ?
       WonderLog.Log.fatal(
         WonderLog.Log.buildFatalMessage(
           ~title="removeFolder",
           ~description={j|can't remove root folder|j},
           ~reason="",
           ~solution={j||j},
           ~params={j||j}
         )
       ) :
       {
         (
           (editorState) => {
             let targetTreeNodeId = AssetUtils.getTargetTreeNodeId(editorState);
             let (newAssetTree, _) =
               editorState
               |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
               |> AssetUtils.removeSpecificTreeNodeFromAssetTree(targetTreeNodeId);
             editorState
             |> FolderArrayUtils.removeFolderFromFolderArray(targetTreeNodeId)
             |> AssetTreeRootEditorService.setAssetTreeRoot(newAssetTree)
             |> AssetCurrentAssetChildrenNodeParentEditorService.clearCurrentAssetChildrenNodeParent
           }
         )
         |> StateLogicService.getAndSetEditorState;
         dispatch(AppStore.ReLoad) |> ignore
       }; */
  /* let removeFile = (dispatch, _event) => {

     let editorState = StateEditorService.getState();
     let fileId = AssetCurrentAssetTreeNodeEditorService.unsafeGetCurrentAssetTreeNode(editorState);
     editorState
     |> AssetTreeRootEditorService.setAssetTreeRoot(
          AssetUtils.removeFileFromTargetTreeNode(
            AssetCurrentAssetChildrenNodeParentEditorService.unsafeGetCurrentAssetChildrenNodeParent(editorState),
            fileId,
            editorState |> AssetTreeNodeUtils.getFileTypeByFileId(fileId),
            editorState |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
          )
        )
     |> AssetCurrentAssetTreeNodeEditorService.clearCurrentAssetTreeNode
     |> StateEditorService.setState
     |> ignore;
     DomHelper.deleteKeyInDict(fileId, editorState |> AssetNodeMapEditorService.unsafeGetNodeMap) |> ignore;
     dispatch(AppStore.ReLoad) |> ignore
      }; */
  let addFolder = (dispatch, _event) => {
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
                  AssetUtils.getTargetTreeNodeId(editorState),
                  AssetNodeEditorService.buildAssetTreeNodeByIndex(nextIndex)
                )
           )
      }
    )
    |> StateLogicService.getAndSetEditorState;
    dispatch(AppStore.ReLoad) |> ignore
  };
  let remove = (dispatch, _event) => {
    WonderLog.Log.print("removed:") |> ignore;
    WonderLog.Log.print(
      AssetCurrentAssetTreeNodeEditorService.unsafeGetCurrentAssetTreeNode
      |> StateLogicService.getEditorState
    )
    |> ignore;
    (
      (editorState) => {
        let targetTreeNodeId =
          editorState |> AssetCurrentAssetTreeNodeEditorService.unsafeGetCurrentAssetTreeNode;
        let (newAssetTree, _) =
          editorState
          |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
          |> AssetUtils.removeSpecificTreeNodeFromAssetTree(targetTreeNodeId);
        editorState
        |> AssetTreeRootEditorService.setAssetTreeRoot(newAssetTree)
        |> AssetCurrentAssetTreeNodeEditorService.clearCurrentAssetTreeNode
        /* TODO judge currentAssetTreeNode === currentAssetChildrenNodeParent */
        /* |> AssetCurrentAssetChildrenNodeParentEditorService.clearCurrentAssetChildrenNodeParent */
      }
    )
    |> StateLogicService.getAndSetEditorState;
    dispatch(AppStore.ReLoad) |> ignore
  };
  let _fileLoad = (dispatch, event) => {
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
                       type_: AssetTreeNodeUtils.getAssetTreeAssetNodeTypeByAssetNodeType(fileInfo.type_),
                       result: Some(result)
                     })
                 );
                 AssetTreeNodeUtils.readFileByType(reader, fileInfo)
               }
             )
           )
       )
    |> Most.forEach(AssetTreeNodeUtils.handleFileByType)
    |> then_((_) => dispatch(AppStore.ReLoad) |> resolve)
  };
  let fileLoad = (dispatch, event) => {
    _fileLoad(dispatch, event) |> ignore;
    ()
  };
};

let component = ReasonReact.statelessComponent("MainEditorAssetHeader");

let render = (store, dispatch, _self) =>
  <article key="assetHeader" className="tree-header">
    <div className="header-item">
      <button onClick=(Method.addFolder(dispatch))> (DomHelper.textEl("addFolder")) </button>
    </div>
    <div className="header-item">
      <button
        onClick=(Method.remove(dispatch))
        disabled=(Method.isTargetIdEqualRootId |> StateLogicService.getEditorState)>
        (DomHelper.textEl("remove"))
      </button>
    </div>
    <div className="header-item">
      <input
        className="file-upload"
        multiple=Js.true_
        onChange=((e) => Method.fileLoad(dispatch, e))
        _type="file"
      />
    </div>
  </article>;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (self) => render(store, dispatch, self)
};
open FileType;

open Js.Promise;

module Method = {
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
              |> AssetEditorService.unsafeGetAssetTree
              |> AssetUtils.removeSpecificTreeNodeFromAssetTree(targetTreeNodeId);
            editorState
            |> FolderArrayUtils.removeFolderFromFolderArray(targetTreeNodeId)
            |> AssetEditorService.setAsseTree(newAssetTree)
            |> AssetEditorService.clearCurrentAssetChildrenNodeParent
          }
        )
        |> StateLogicService.getAndSetEditorState;
        dispatch(AppStore.ReLoad) |> ignore
      }; */



  /* let removeFile = (dispatch, _event) => {
    
     let editorState = StateEditorService.getState();
     let fileId = AssetEditorService.unsafeGetCurrentAssetTreeNode(editorState);
     editorState
     |> AssetEditorService.setAsseTree(
          AssetUtils.removeFileFromTargetTreeNode(
            AssetEditorService.unsafeGetCurrentAssetChildrenNodeParent(editorState),
            fileId,
            editorState |> AssetTreeNodeUtils.getFileTypeByFileId(fileId),
            editorState |> AssetEditorService.unsafeGetAssetTree
          )
        )
     |> AssetEditorService.clearCurrentAssetTreeNode
     |> StateEditorService.setState
     |> ignore;
     DomHelper.deleteKeyInDict(fileId, editorState |> AssetEditorService.unsafeGetNodeMap) |> ignore;
     dispatch(AppStore.ReLoad) |> ignore
      }; */
  let addFolder = (dispatch, _event) => {
    (
      (editorState) => {
        let (nextIndex, editorState) = editorState |> AssetUtils.increaseIndex;
        editorState
        |> AssetTreeNodeUtils.addFolderIntoNodeMap(nextIndex)
        |> AssetEditorService.setAsseTree(
             editorState
             |> AssetEditorService.unsafeGetAssetTree
             |> AssetUtils.insertNewTreeNodeToTargetTreeNode(
                  AssetUtils.getTargetTreeNodeId(editorState),
                  AssetTreeNodeUtils.buildAssetTreeNodeByIndex(nextIndex)
                )
           )
      }
    )
    |> StateLogicService.getAndSetEditorState;

    WonderLog.Log.print(
      StateEditorService.getState() |> AssetEditorService.unsafeGetNodeMap
    ) |> ignore;
    WonderLog.Log.print(
      StateEditorService.getState() |> AssetEditorService.unsafeGetAssetTree
    ) |> ignore;

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
                       type_: AssetTreeNodeUtils.getAssetTreeFileTypeByFileType(fileInfo.type_),
                       result
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
    /* onClick=(Method.removeFolder(dispatch)) */
      <button 
      > (DomHelper.textEl("remove")) </button>
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
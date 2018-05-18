open FileType;

open Js.Promise;

module Method = {
  let removeFolder = (dispatch, _event) =>
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
            |> AssetEditorService.clearCurrentTreeNode
          }
        )
        |> StateLogicService.getAndSetEditorState;
        dispatch(AppStore.ReLoad) |> ignore
      };
  let removeFile = (dispatch, _event) => {
    let editorState = StateEditorService.getState();
    let fileId = AssetEditorService.unsafeGetCurrentFile(editorState);
    editorState
    |> AssetEditorService.setAsseTree(
         AssetUtils.removeFileFromTargetTreeNode(
           AssetEditorService.unsafeGetCurrentTreeNode(editorState),
           fileId,
           editorState |> FileUtils.getFileTypeByFileId(fileId),
           editorState |> AssetEditorService.unsafeGetAssetTree
         )
       )
    |> AssetEditorService.clearCurrentFile
    |> StateEditorService.setState
    |> ignore;
    DomHelper.deleteKeyInDict(fileId, editorState |> AssetEditorService.unsafeGetFileMap) |> ignore;
    dispatch(AppStore.ReLoad) |> ignore
  };
  let addFolder = (dispatch, _event) => {
    (
      (editorState) => {
        let (nextIndex, editorState) = editorState |> AssetUtils.increaseIndex;
        editorState
        |> FolderArrayUtils.addFolderIntoFolderArray(nextIndex)
        |> AssetEditorService.setAsseTree(
             editorState
             |> AssetEditorService.unsafeGetAssetTree
             |> AssetUtils.insertNewTreeNodeToTargetTreeNode(
                  AssetUtils.getTargetTreeNodeId(editorState),
                  AssetUtils.buildAssetTreeNodeByIndex(nextIndex)
                )
           )
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
      |> Js.Array.map(FileUtils.convertFileJsObjectToFileInfoRecord);
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
                       type_: FileUtils.getAssetTreeFileTypeByFileType(fileInfo.type_),
                       result
                     })
                 );
                 FileUtils.readFileByType(reader, fileInfo)
               }
             )
           )
       )
    |> Most.forEach(FileUtils.handleFileByType)
    |> then_((_) => dispatch(AppStore.ReLoad) |> resolve)
  };
  let fileLoad = (dispatch, event) => {
    _fileLoad(dispatch, event) |> ignore;
    ()
  };
  let handleFile = (successFunc, failFunc) =>
    switch (AssetEditorService.getCurrentFile |> StateLogicService.getEditorState) {
    | None => successFunc()
    | Some(fileId) => failFunc(fileId)
    };
  let isFileNotBeRemove = () =>
    handleFile(
      () => Js.true_,
      (fileId) =>
        StateEditorService.getState() |> FolderArrayUtils.isFileBeFolder(fileId) ?
          Js.true_ : Js.false_
    );
  let isFolderNotBeRemove = () =>
    handleFile(
      () =>
        AssetUtils.isTargetIdEqualRootId |> StateLogicService.getEditorState ?
          Js.true_ : Js.false_,
      (fileId) =>
        StateEditorService.getState() |> FolderArrayUtils.isFileBeFolder(fileId) ?
          Js.false_ :
          AssetUtils.isTargetIdEqualRootId |> StateLogicService.getEditorState ?
            Js.true_ : Js.false_
    );
};

let component = ReasonReact.statelessComponent("MainEditorAssetHeader");

let render = (store, dispatch, _self) =>
  <article key="assetHeader" className="tree-header">
    <div className="header-item">
      <button onClick=(Method.addFolder(dispatch))> (DomHelper.textEl("addFolder")) </button>
    </div>
    <div className="header-item">
      <button onClick=(Method.removeFolder(dispatch)) disabled=(Method.isFolderNotBeRemove())>
        (DomHelper.textEl("removeFolder"))
      </button>
    </div>
    <div className="header-item">
      <button onClick=(Method.removeFile(dispatch)) disabled=(Method.isFileNotBeRemove())>
        (DomHelper.textEl("removeFile"))
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
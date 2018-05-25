open FileType;

open AssetNodeType;

open Js.Promise;

module Method = {
  let isCurrentAssetTreeNodeIdEqualRootId = (editorState) =>
    switch (editorState |> AssetCurrentAssetTreeNodeEditorService.getCurrentAssetTreeNode) {
    | None => Js.true_
    | Some(id) =>
      AssetUtils.isIdEqual(id, editorState |> AssetTreeRootEditorService.getRootTreeNodeId) ?
        Js.true_ : Js.false_
    };
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
    (
      (editorState) => {
        let currentAssetTreeNode =
          editorState |> AssetCurrentAssetTreeNodeEditorService.unsafeGetCurrentAssetTreeNode;
        let (newAssetTreeRoot, _) =
          editorState
          |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
          |> AssetUtils.removeSpecificTreeNodeFromAssetTree(currentAssetTreeNode);
        let editorState =
          editorState |> AssetTreeRootEditorService.setAssetTreeRoot(newAssetTreeRoot);
        AssetUtils.isIdEqual(
          editorState
          |> AssetCurrentAssetChildrenNodeParentEditorService.unsafeGetCurrentAssetChildrenNodeParent,
          currentAssetTreeNode
        ) ?
          editorState
          |> AssetCurrentAssetTreeNodeEditorService.clearCurrentAssetTreeNode
          |> AssetCurrentAssetChildrenNodeParentEditorService.clearCurrentAssetChildrenNodeParent :
          editorState |> AssetCurrentAssetTreeNodeEditorService.clearCurrentAssetTreeNode
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
        disabled=(Method.isCurrentAssetTreeNodeIdEqualRootId |> StateLogicService.getEditorState)>
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
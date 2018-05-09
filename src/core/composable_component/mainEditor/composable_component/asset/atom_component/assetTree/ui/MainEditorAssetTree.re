module Method = {
  let onSelect = (dispatch, id) => {
    (
      (editorState) =>
        editorState
        |> AssetEditorService.setCurrentTreeNode(id)
        |> CurrentSourceEditorService.setCurrentSource(EditorType.AssetTree)
    )
    |> StateLogicService.getAndSetEditorState;
    dispatch(AppStore.ReLoad) |> ignore
  };
  let _getSign = () => "assetTree";
  let handleSign = (startSign) =>
    startSign === _getSign() || startSign === MainEditorAssetFileContent.Method.getSign();
  let handleFileToFolder = (dispatch, targetTreeNodeId, removedFileId) => {
    let editorState = StateEditorService.getState();
    let removedTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;
    AssetUtils.isIdEqual(targetTreeNodeId, removedTreeNodeId) ?
      dispatch(AppStore.ReLoad) :
      {
        AssetEditorService.setAsseTree(
          editorState
          |> AssetEditorService.unsafeGetAssetTree
          |> AssetUtils.removeFileAndInsertFile(
               targetTreeNodeId,
               removedTreeNodeId,
               removedFileId,
               editorState |> FileUtils.getFileTypeByFileId(removedFileId)
             )
        )
        |> StateLogicService.getAndSetEditorState;
        dispatch(AppStore.ReLoad)
      }
  };
  let handleFolderToFolder = (dispatch, targetId, removedId) =>
    AssetUtils.isIdEqual(targetId, removedId) ?
      dispatch(AppStore.ReLoad) :
      {
        let editorState = StateEditorService.getState();
        let (newAssetTree, removedTreeNode) =
          editorState
          |> AssetEditorService.unsafeGetAssetTree
          |> AssetUtils.removeSpecificTreeNodeFromAssetTree(removedId);
        editorState
        |> AssetEditorService.setAsseTree(
             AssetUtils.insertNewTreeNodeToTargetTreeNode(targetId, removedTreeNode, newAssetTree)
           )
        |> StateEditorService.setState;
        dispatch(AppStore.ReLoad)
      };
  let onDrop = (dispatch, (targetId, removedId, currentSign)) =>
    switch currentSign {
    | currentSign when currentSign === _getSign() =>
      handleFolderToFolder(dispatch, targetId, removedId)
    | currentSign when currentSign === MainEditorAssetFileContent.Method.getSign() =>
      handleFileToFolder(dispatch, targetId, removedId)
    | _ => WonderLog.Log.log({j|can't drop to AssetTree|j})
    };
  let _isCurrentTreeNode = (id) =>
    switch (AssetEditorService.getCurrentTreeNode |> StateLogicService.getEditorState) {
    | None => false
    | Some(treeNode) => treeNode === id ? true : false
    };
  let _isNotRoot = (uid) =>
    ((editorState) => editorState |> AssetUtils.getRootTreeNodeId != uid)
    |> StateLogicService.getEditorState;
  let rec buildAssetTreeArray = (onSelect, onDrop, assetTree) =>
    assetTree
    |> Array.map(
         ({id, name, children}: AssetTreeNodeType.assetTreeNodeType) =>
           ArrayService.hasItem(children) ?
             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(id, name, _isCurrentTreeNode(id))
               eventHandleTuple=(onSelect, onDrop, handleSign)
               sign=(_getSign())
               icon="./public/img/12.jpg"
               dragable=(_isNotRoot(id))
               treeChildren=(buildAssetTreeArray(onSelect, onDrop, children))
             /> :
             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(id, name, _isCurrentTreeNode(id))
               eventHandleTuple=(onSelect, onDrop, handleSign)
               sign=(_getSign())
               icon="./public/img/12.jpg"
               dragable=(_isNotRoot(id))
             />
       );
};

let component = ReasonReact.statelessComponent("AssetTree");

let render = (store, dispatch, _self) =>
  <article key="assetTree" className="tree-content">
    (
      ReasonReact.arrayToElement(
        (
          (editorState) =>
            editorState
            |> AssetEditorService.unsafeGetAssetTree
            |> Method.buildAssetTreeArray(Method.onSelect(dispatch), Method.onDrop(dispatch))
        )
        |> StateLogicService.getEditorState
      )
    )
  </article>;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (self) => render(store, dispatch, self)
};
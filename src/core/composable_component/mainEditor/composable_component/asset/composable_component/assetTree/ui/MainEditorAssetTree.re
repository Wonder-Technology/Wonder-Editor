module Method = {
  let handleSign = (startSign) =>
    startSign === AssetTreeUtils.getSign()
    || startSign === MainEditorAssetFileContent.Method.getSign();
  let handleFileToFolder = (dispatch, targetTreeNodeId, fileId) => {
    let editorState = StateEditorService.getState();
    let fileType = editorState |> FileUtils.getFileTypeByFileId(fileId);
    let removedTreeNodeId = editorState |> AssetUtils.getTargetTreeNodeId;
    AssetUtils.isIdEqual(targetTreeNodeId, removedTreeNodeId) ?
      dispatch(AppStore.ReLoad) :
      {
        AssetEditorService.setAsseTree(
          editorState
          |> AssetEditorService.unsafeGetAssetTree
          |> AssetUtils.removeFileFromTargetTreeNode(removedTreeNodeId, fileId, fileType)
          |> AssetUtils.addFileIntoTargetTreeNode(targetTreeNodeId, fileId, fileType)
        )
        |> StateLogicService.getAndSetEditorState;
        dispatch(AppStore.ReLoad)
      }
  };
  let handleFolderToFolder = (dispatch, targetId, removedId) => {
    let editorState = StateEditorService.getState();
    let assetTree = editorState |> AssetEditorService.unsafeGetAssetTree;
    AssetUtils.isIdEqual(targetId, removedId) ?
      dispatch(AppStore.ReLoad) :
      {
        let (newAssetTree, removedTreeNode) =
          assetTree |> AssetUtils.removeSpecificTreeNodeFromAssetTree(removedId);
        editorState
        |> AssetEditorService.setAsseTree(
             AssetUtils.insertNewTreeNodeToTargetTreeNode(targetId, removedTreeNode, newAssetTree)
           )
        |> StateEditorService.setState;
        dispatch(AppStore.ReLoad)
      }
  };
  let onDrop = (dispatch, (targetId, removedId, currentSign)) =>
    switch currentSign {
    | currentSign when currentSign === AssetTreeUtils.getSign() =>
      handleFolderToFolder(dispatch, targetId, removedId)
    | currentSign when currentSign === MainEditorAssetFileContent.Method.getSign() =>
      handleFileToFolder(dispatch, targetId, removedId)
    | _ => WonderLog.Log.log({j|can't drop to AssetTree|j})
    };
  let _isCurrentAssetTreeNode = (id) =>
    switch (AssetEditorService.getCurrentAssetTreeNode |> StateLogicService.getEditorState) {
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
               attributeTuple=(id, name, _isCurrentAssetTreeNode(id))
               eventHandleTuple=(onSelect, onDrop, handleSign, AssetUtils.isTreeNodeRelationError)
               sign=(AssetTreeUtils.getSign())
               icon="./public/img/12.jpg"
               dragable=(_isNotRoot(id))
               treeChildren=(buildAssetTreeArray(onSelect, onDrop, children))
             /> :
             <TreeNode
               key=(DomHelper.getRandomKey())
               attributeTuple=(id, name, _isCurrentAssetTreeNode(id))
               eventHandleTuple=(onSelect, onDrop, handleSign, AssetUtils.isTreeNodeRelationError)
               sign=(AssetTreeUtils.getSign())
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
            |> Method.buildAssetTreeArray(
                 AssetTreeUtils.onSelect(dispatch),
                 Method.onDrop(dispatch)
               )
        )
        |> StateLogicService.getEditorState
      )
    )
  </article>;

let make = (~store: AppStore.appState, ~dispatch, _children) => {
  ...component,
  render: (self) => render(store, dispatch, self)
};
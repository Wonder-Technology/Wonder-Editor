open CurrentNodeDataType;

let onSelect = (dispatchFunc, nodeType, nodeId) => {
  StateEditorService.getState()
  |> AssetCurrentNodeDataEditorService.setCurrentNodeData({
       currentNodeId: nodeId,
       nodeType,
     })
  |> AssetCurrentNodeParentIdEditorService.setCurrentNodeParentId(nodeId)
  |> StateEditorService.setState
  |> ignore;

  StateEditorService.getState()
  |> SceneEditorService.clearCurrentSceneTreeNode
  |> CurrentSelectSourceEditorService.setCurrentSelectSource(
       EditorType.Asset,
     )
  |> StateEditorService.setState
  |> ignore;

  dispatchFunc(AppStore.UpdateAction(Update([|All|]))) |> ignore;
};

let dragNodeToFolderFunc = AssetDragNodeToFolderEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState;

let addFolderIntoNodeMap = (index, name, parentId, editorState) =>
  name
  |> AssetFolderNodeMapEditorService.buildFolderResult(parentId)
  |> AssetFolderNodeMapEditorService.setResult(index, _, editorState);

let rebuildRootAssetTree = (parentId, pathName, editorState) =>
  switch (AssetTreeRootEditorService.getAssetTreeRoot(editorState)) {
  | None =>
    let (editorState, rootIndex) =
      AssetIdUtils.getAssetId |> StateLogicService.getEditorState;
    let editorState =
      rootIndex
      |. AssetTreeEditorService.buildAssetTreeNodeByIndex(Folder)
      |. AssetTreeRootEditorService.setAssetTreeRoot(editorState)
      |> addFolderIntoNodeMap(rootIndex, pathName, parentId);

    (rootIndex, editorState);
  | Some(assetTreeRoot) => (
      editorState |> AssetTreeRootEditorService.getRootTreeNodeId,
      editorState,
    )
  };

let rebuildFolder = (parentId, pathName, editorState) => {
  let resultArr =
    AssetTreeEditorService.getChildrenNameAndIdArr(
      parentId |> OptionService.unsafeGet,
      Folder,
      editorState,
    )
    |> Js.Array.filter(((nodeName, nodeId)) => pathName === nodeName);

  resultArr |> Js.Array.length === 0 ?
    {
      let (editorState, newIndex) = AssetIdUtils.getAssetId(editorState);

      let editorState =
        editorState |> addFolderIntoNodeMap(newIndex, pathName, parentId);

      let editorState =
        editorState
        |> AssetTreeNodeUtils.createNodeAndAddToTargetNodeChildren(
             parentId |> OptionService.unsafeGet,
             newIndex,
             Folder,
           );

      (newIndex, editorState);
    } :
    {
      let (nodeName, nodeId) = resultArr |> ArrayService.unsafeGetFirst;

      (nodeId, editorState);
    };
};
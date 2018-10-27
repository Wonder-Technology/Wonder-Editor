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

let addFolderIntoNodeMap = (index, name, parentFolderNodeId, editorState) =>
  name
  |> AssetFolderNodeMapEditorService.buildFolderNodeResult(
       parentFolderNodeId,
     )
  |> AssetFolderNodeMapEditorService.setResult(index, _, editorState);

let rebuildRootAssetTree = (parentFolderNodeId, pathName, editorState) =>
  switch (AssetTreeRootEditorService.getAssetTreeRoot(editorState)) {
  | None =>
    let (editorState, rootIndex) = AssetIdUtils.generateAssetId(editorState);

    let editorState =
      rootIndex
      |. AssetTreeEditorService.buildAssetTreeNodeByIndex(Folder)
      |. AssetTreeRootEditorService.setAssetTreeRoot(editorState);

    let editorState =
      editorState
      |> addFolderIntoNodeMap(rootIndex, pathName, parentFolderNodeId);

    (rootIndex, editorState);
  | Some(assetTreeRoot) => (
      editorState |> AssetTreeRootEditorService.getRootTreeNodeId,
      editorState,
    )
  };

let rebuildFolder =
    (parentFolderNodeId, pathName, (editorState, engineState)) => {
  let resultArr =
    AssetUtils.getChildrenNameAndIdArr(
      parentFolderNodeId |> OptionService.unsafeGet,
      Folder,
      (editorState, engineState),
    )
    |> Js.Array.filter(((nodeName, nodeId)) => pathName === nodeName);

  resultArr |> Js.Array.length === 0 ?
    {
      let (editorState, newIndex) = AssetIdUtils.generateAssetId(editorState);

      let editorState =
        editorState
        |> addFolderIntoNodeMap(newIndex, pathName, parentFolderNodeId);

      let editorState =
        editorState
        |> AssetTreeNodeUtils.createNodeAndAddToTargetNodeChildren(
             parentFolderNodeId |> OptionService.unsafeGet,
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

let rec setSpecificAssetTreeNodeIsShowChildren =
        (targetId, isShowChildren, assetTreeArray) =>
  assetTreeArray
  |> Js.Array.map(
       ({nodeId, children} as treeNode: AssetTreeNodeType.assetTreeNodeType) =>
       nodeId === targetId ?
         {...treeNode, isShowChildren} :
         {
           ...treeNode,
           children:
             setSpecificAssetTreeNodeIsShowChildren(
               targetId,
               isShowChildren,
               children,
             ),
         }
     );
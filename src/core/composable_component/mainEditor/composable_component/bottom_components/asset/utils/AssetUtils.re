open AssetTreeNodeType;

open AssetNodeType;

let getWidge = () => EditorType.Asset;

let isAssetWdbFile = () => {
  let (widget, startId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  switch (widget, startId) {
  | (Some(widget), Some(id)) =>
    widget === getWidge()
    && StateEditorService.getState()
    |> AssetWdbNodeMapEditorService.getWdbNodeMap
    |> WonderCommonlib.SparseMapService.get(id)
    |> Js.Option.isSome
  | _ => false
  };
};

let isWidge = startWidge =>
  switch (startWidge) {
  | None => false
  | Some(startWidge) => startWidge === getWidge()
  };

let getTargetTreeNodeId = editorState =>
  switch (
    AssetCurrentNodeParentIdEditorService.getCurrentNodeParentId(editorState)
  ) {
  | None => editorState |> AssetTreeRootEditorService.getRootTreeNodeId
  | Some(id) => id
  };

let isIdEqual = (id, targetId) => id === targetId;

let rec getSpecificTreeNodeById = (id, node) =>
  isIdEqual(id, node.id) ?
    Some(node) :
    {
      let (resultNode, _) =
        node.children
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (. (resultNode, id), child) =>
               switch (resultNode) {
               | Some(_) => (resultNode, id)
               | None => (getSpecificTreeNodeById(id, child), id)
               },
             (None, id),
           );
      resultNode;
    };

let rec _isRemovedTreeNodeBeTargetParent = (targetId, removedTreeNode) =>
  isIdEqual(targetId, removedTreeNode.id) ?
    true :
    removedTreeNode.children
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. result, child) =>
           result ? true : _isRemovedTreeNodeBeTargetParent(targetId, child),
         false,
       );

let _isTargetTreeNodeBeRemovedParent = (targetTreeNode, removedId) =>
  targetTreeNode.children
  |> Js.Array.filter(child => isIdEqual(child.id, removedId))
  |> Js.Array.length
  |> (len => len >= 1 ? true : false);

let isTreeNodeRelationError =
    (targetId, removedId, (editorState, _engineState)) =>
  isIdEqual(targetId, removedId) ?
    true :
    _isRemovedTreeNodeBeTargetParent(
      targetId,
      editorState
      |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
      |> getSpecificTreeNodeById(removedId)
      |> OptionService.unsafeGet,
    ) ?
      true :
      _isTargetTreeNodeBeRemovedParent(
        editorState
        |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
        |> getSpecificTreeNodeById(targetId)
        |> OptionService.unsafeGet,
        removedId,
      );
/* TODO should add material */

let _removeClonedGameObjectIfHasIt =
    (gameObjectUid, editorState, (editEngineState, runEngineState)) =>
  switch (
    editorState
    |> AssetClonedGameObjectMapEditorService.getClonedGameObjectMap
    |> WonderCommonlib.SparseMapService.get(gameObjectUid)
  ) {
  | None => (editorState, (editEngineState, runEngineState))
  | Some(runClonedGameObjectArr) =>
    let editEngineState =
      runClonedGameObjectArr
      |> Js.Array.map(gameObject =>
           StateLogicService.getEditEngineComponent(
             DiffType.GameObject,
             gameObject,
           )
         )
      |. GameObjectEngineService.disposeGameObjectArr(editEngineState);

    (
      editorState
      |> AssetClonedGameObjectMapEditorService.getClonedGameObjectMap
      |> SparseMapService.copy
      |> DomHelper.deleteKeyInMap(gameObjectUid)
      |. AssetClonedGameObjectMapEditorService.setClonedGameObjectMap(
           editorState,
         ),
      (
        editEngineState,
        runClonedGameObjectArr
        |. GameObjectEngineService.disposeGameObjectArr(runEngineState),
      ),
    );
  };

let _handleRemoveWdbNode = (nodeId, editorState) => {
  let {wdbGameObject} =
    editorState
    |> AssetWdbNodeMapEditorService.getWdbNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);
  let runCubeGeometry =
    editorState
    |> AssetGeometryDataEditorService.getGeometryData
    |> (({defaultCubeGeometryIndex}) => defaultCubeGeometryIndex);

  WonderLog.Log.print((
    "getClonedGameObjectMap: ",
    editorState |> AssetClonedGameObjectMapEditorService.getClonedGameObjectMap,
  ))
  |> ignore;

  let (editorState, (editEngineState, runEngineState)) =
    (
      StateLogicService.getEditEngineState(),
      StateLogicService.getRunEngineState(),
    )
    |> StateLogicService.handleFuncWithDiff(
         [|
           {arguments: [|wdbGameObject|], type_: GameObject},
           {arguments: [|runCubeGeometry|], type_: Geometry},
         |],
         GeometryEngineService.replaceAllGameObjectGeometryToDefaultGeometry,
       )
    |> _removeClonedGameObjectIfHasIt(wdbGameObject, editorState);

  WonderLog.Log.print((
    "getClonedGameObjectMap after  remove: ",
    editorState |> AssetClonedGameObjectMapEditorService.getClonedGameObjectMap,
  ))
  |> ignore;

  StateLogicService.refreshEditAndRunEngineState(
    editEngineState,
    runEngineState,
  );

  WonderLog.Log.print("remove wdb end") |> ignore;

  StateLogicService.getEditEngineState()
  |> GameObjectEngineService.getAllGameObjects(0)
  |> WonderLog.Log.print;

  StateLogicService.getRunEngineState()
  |> GameObjectEngineService.getAllGameObjects(0)
  |> WonderLog.Log.print;

  editorState
  |> AssetWdbNodeMapEditorService.getWdbNodeMap
  |> SparseMapService.copy
  |> DomHelper.deleteKeyInMap(nodeId)
  |. AssetWdbNodeMapEditorService.setWdbNodeMap(editorState);
};

let deepRemoveTreeNode = (removedTreeNode, editorState) => {
  let rec _iterateRemovedTreeNode = (nodeArr, removedAssetIdArr, editorState) =>
    nodeArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (editorState, removedAssetIdArr),
           {id as nodeId, type_, children},
         ) => {
           let editorState =
             switch (type_) {
             | Folder =>
               editorState
               |> AssetFolderNodeMapEditorService.getFolderNodeMap
               |> SparseMapService.copy
               |> DomHelper.deleteKeyInMap(nodeId)
               |. AssetFolderNodeMapEditorService.setFolderNodeMap(
                    editorState,
                  )

             | Texture =>
               editorState
               |> AssetTextureNodeMapEditorService.getTextureNodeMap
               |> SparseMapService.copy
               |> DomHelper.deleteKeyInMap(nodeId)
               |. AssetTextureNodeMapEditorService.setTextureNodeMap(
                    editorState,
                  )

             | Json =>
               editorState
               |> AssetJsonNodeMapEditorService.getJsonNodeMap
               |> SparseMapService.copy
               |> DomHelper.deleteKeyInMap(nodeId)
               |. AssetJsonNodeMapEditorService.setJsonNodeMap(editorState)

             | WDB => _handleRemoveWdbNode(nodeId, editorState)
             | _ => editorState
             };

           _iterateRemovedTreeNode(
             children,
             removedAssetIdArr |> ArrayService.push(id),
             editorState,
           );
         },
         (editorState, removedAssetIdArr),
       );

  _iterateRemovedTreeNode([|removedTreeNode|], [||], editorState);
};

let _checkRemovedTreeNodeAndGetVal = ((newAssetTreeArr, removedTreeNode)) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          test(
            Log.buildAssertMessage(
              ~expect={j|removedTreeNode should exist|j},
              ~actual={j|not|j},
            ),
            () =>
            removedTreeNode |> Js.Option.isSome |> assertTrue
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  (
    newAssetTreeArr |> ArrayService.getFirst,
    removedTreeNode |> OptionService.unsafeGet,
  );
};

let removeSpecificTreeNode = (targetId, assetTreeRoot) => {
  let rec _iterateAssetTree =
          (targetId, assetTreeArr, newAssetTree, removedTreeNode) =>
    assetTreeArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (newAssetTree, removedTreeNode), {id, children} as treeNode) =>
           isIdEqual(id, targetId) ?
             (newAssetTree, Some(treeNode)) :
             {
               let (newAssetTreeChildrenArray, removedTreeNode) =
                 _iterateAssetTree(targetId, children, [||], removedTreeNode);
               (
                 newAssetTree
                 |> ArrayService.push({
                      ...treeNode,
                      children: newAssetTreeChildrenArray,
                    }),
                 removedTreeNode,
               );
             },
         (newAssetTree, removedTreeNode),
       );

  _iterateAssetTree(targetId, [|assetTreeRoot|], [||], None)
  |> _checkRemovedTreeNodeAndGetVal;
};

let insertSourceTreeNodeToTargetTreeNodeChildren =
    (targetId, newTreeNode, assetTreeRoot) => {
  let rec _iterateInsertAssetTree = (targetId, newTreeNode, assetTreeArr) =>
    assetTreeArr
    |> Js.Array.map(({id, children} as treeNode) =>
         isIdEqual(id, targetId) ?
           {
             ...treeNode,
             children:
               children |> Js.Array.copy |> ArrayService.push(newTreeNode),
           } :
           {
             ...treeNode,
             children:
               _iterateInsertAssetTree(targetId, newTreeNode, children),
           }
       );
  _iterateInsertAssetTree(targetId, newTreeNode, [|assetTreeRoot|])
  |> (assetTreeArr => assetTreeArr |> ArrayService.getFirst);
};
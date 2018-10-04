open AssetTreeNodeType;

open AssetNodeType;

let getWidget = () => EditorType.Asset;

let isAssetWDBFile = () => {
  let (widget, startId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  switch (widget, startId) {
  | (Some(widget), Some(id)) =>
    widget === getWidget()
    && StateEditorService.getState()
    |> AssetWDBNodeMapEditorService.getWDBNodeMap
    |> WonderCommonlib.SparseMapService.get(id)
    |> Js.Option.isSome
  | _ => false
  };
};

let isWidget = startWidget =>
  switch (startWidget) {
  | None => false
  | Some(startWidget) => startWidget === getWidget()
  };

let getTargetTreeNodeId = editorState =>
  switch (
    AssetCurrentNodeParentIdEditorService.getCurrentNodeParentId(editorState)
  ) {
  | None => editorState |> AssetTreeRootEditorService.getRootTreeNodeId
  | Some(id) => id
  };

let isIdEqual = (id, targetId) => id === targetId;

let rec getSpecificTreeNodeById = (id, targetTreeNode) =>
  isIdEqual(id, targetTreeNode.id) ?
    Some(targetTreeNode) :
    {
      let (resultNode, _) =
        targetTreeNode.children
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

let _removeClonedGameObjectIfHasIt = (gameObjectUid, editorState, engineState) =>
  switch (
    editorState
    |> AssetClonedGameObjectMapEditorService.getClonedGameObjectMap
    |> WonderCommonlib.SparseMapService.get(gameObjectUid)
  ) {
  | None => (editorState, engineState)
  | Some(clonedGameObjectArr) => (
      editorState
      |> AssetClonedGameObjectMapEditorService.getClonedGameObjectMap
      |> SparseMapService.copy
      |> DomHelper.deleteKeyInMap(gameObjectUid)
      |. AssetClonedGameObjectMapEditorService.setClonedGameObjectMap(
           editorState,
         ),
      clonedGameObjectArr
      |. GameObjectEngineService.disposeGameObjectArrKeepOrder(engineState),
    )
  };

let _handleRemoveWDBNode = (nodeId, editorState) => {
  let {wdbGameObject} =
    editorState
    |> AssetWDBNodeMapEditorService.getWDBNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);
  let defaultCubeGeometryIndex =
    editorState
    |> AssetGeometryDataEditorService.getGeometryData
    |> (({defaultCubeGeometryIndex}) => defaultCubeGeometryIndex);

  let (editorState, engineState) =
    StateEngineService.unsafeGetState()
    |> GeometryEngineService.replaceAllGameObjectGeometryToDefaultGeometry(
         wdbGameObject,
         defaultCubeGeometryIndex,
       )
    |> _removeClonedGameObjectIfHasIt(wdbGameObject, editorState);

  StateLogicService.refreshEngineState(engineState);

  editorState
  |> AssetWDBNodeMapEditorService.getWDBNodeMap
  |> SparseMapService.copy
  |> DomHelper.deleteKeyInMap(nodeId)
  |. AssetWDBNodeMapEditorService.setWDBNodeMap(editorState);
};

let _removeTextureFromSceneBasicMaterials =
    (textureIndex, editorState, engineState) =>
  /* BasicMaterialEngineService.getAllBasicMaterials(engineState) */
  SceneEngineService.getSceneAllBasicMaterials(engineState)
  |> Js.Array.filter(basicMaterial =>
       BasicMaterialEngineService.isBasicMaterialMap(
         basicMaterial,
         textureIndex,
         engineState,
       )
     )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineState, basicMaterial) =>
         OperateTextureLogicService.handleBasicMaterialComponentFromHasMapToNoMap(
           basicMaterial,
           engineState,
         ),
       engineState,
     );

let _removeTextureFromSceneLightMaterials =
    (textureIndex, editorState, engineState) =>
  SceneEngineService.getSceneAllLightMaterials(engineState)
  |> Js.Array.filter(lightMaterial =>
       LightMaterialEngineService.isLightMaterialMap(
         lightMaterial,
         textureIndex,
         engineState,
       )
     )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineState, lightMaterial) =>
         OperateTextureLogicService.handleLightMaterialComponentFromHasDiffuseMapToNoMap(
           lightMaterial,
           engineState,
         ),
       engineState,
     );

/* TODO remove texture from material assets */
let _removeTextureEngineData = (textureIndex, editorState, engineState) =>
  engineState
  |> _removeTextureFromSceneBasicMaterials(textureIndex, editorState)
  |> _removeTextureFromSceneLightMaterials(textureIndex, editorState);

let _removeTextureEditorData = (nodeId, textureIndex, imageId, editorState) => {
  let {textureArray} as imageResult =
    editorState
    |> AssetImageBase64MapEditorService.getImageBase64Map
    |> WonderCommonlib.SparseMapService.unsafeGet(imageId);
  let newTextureArr =
    textureArray |> Js.Array.filter(texture => texture !== textureIndex);

  let editorState =
    switch (newTextureArr |> Js.Array.length) {
    | 0 =>
      editorState
      |> AssetImageBase64MapEditorService.getImageBase64Map
      |> Js.Array.copy
      |> DomHelper.deleteKeyInMap(imageId)
      |. AssetImageBase64MapEditorService.setImageBase64Map(editorState)
    | _ =>
      editorState
      |> AssetImageBase64MapEditorService.setResult(
           imageId,
           {...imageResult, textureArray: newTextureArr},
         )
    };

  editorState
  |> AssetTextureNodeMapEditorService.getTextureNodeMap
  |> SparseMapService.copy
  |> DomHelper.deleteKeyInMap(nodeId)
  |. AssetTextureNodeMapEditorService.setTextureNodeMap(editorState);
};

let _removeTextureTreeNode = (nodeId, editorState) => {
  let {textureIndex, imageId} =
    editorState
    |> AssetTextureNodeMapEditorService.getTextureNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

  _removeTextureEngineData(textureIndex, editorState)
  |> StateLogicService.getAndSetEngineState;
  _removeTextureEditorData(nodeId, textureIndex, imageId, editorState);
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
             | Texture => _removeTextureTreeNode(nodeId, editorState)
             | Json =>
               editorState
               |> AssetJsonNodeMapEditorService.getJsonNodeMap
               |> SparseMapService.copy
               |> DomHelper.deleteKeyInMap(nodeId)
               |. AssetJsonNodeMapEditorService.setJsonNodeMap(editorState)
             | WDB => _handleRemoveWDBNode(nodeId, editorState)
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
    newAssetTreeArr |> ArrayService.unsafeGetFirst,
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
  /* TODO fix: first is root??? */
  |> (assetTreeArr => assetTreeArr |> ArrayService.unsafeGetFirst);
};
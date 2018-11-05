open AssetTreeNodeType;

open AssetNodeType;

let _disposeClonedGameObjectsGeometry =
    (wdbGameObjects, (editorState, engineState)) =>
  engineState
  |> GameObjectEngineService.getAllGeometrys(wdbGameObjects)
  |> WonderCommonlib.ArrayService.removeDuplicateItems
  |> Js.Array.filter(geometry =>
       !
         RelateGameObjectAndAssetUtils.isDefaultGeometry(
           geometry,
           (editorState, engineState),
         )
     )
  |> Js.Array.map(geometry =>
       engineState
       |> GeometryEngineService.unsafeGetGeometryGameObjects(geometry)
     )
  |> WonderCommonlib.ArrayService.flatten
  |> ArrayService.exclude(wdbGameObjects)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (editorState, engineState), gameObject) =>
         GameObjectLogicService.disposeGeometry(
           gameObject,
           engineState
           |> GameObjectComponentEngineService.unsafeGetGeometryComponent(
                gameObject,
              ),
           (editorState, engineState),
         ),
       (editorState, engineState),
     );

let _disposeWDBGameObjects = (wdbGameObjects, (editorState, engineState)) =>
  wdbGameObjects
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineState, gameObject) =>
         switch (
           GameObjectComponentEngineService.getGeometryComponent(
             gameObject,
             engineState,
           )
         ) {
         | Some(geometry) =>
           RelateGameObjectAndAssetUtils.isDefaultGeometry(
             geometry,
             (editorState, engineState),
           ) ?
             GameObjectEngineService.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(
               gameObject,
               engineState,
             ) :
             GameObjectEngineService.disposeGameObjectDisposeGeometryRemoveMaterial(
               gameObject,
               engineState,
             )
         | None =>
           GameObjectEngineService.disposeGameObjectDisposeGeometryRemoveMaterial(
             gameObject,
             engineState,
           )
         },
       engineState,
     );

let _handleRemoveWDBNode = (nodeId, (editorState, engineState)) => {
  let {wdbGameObject} =
    editorState
    |> AssetWDBNodeMapEditorService.getWDBNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

  let wdbGameObjects =
    GameObjectEngineService.getAllGameObjects(wdbGameObject, engineState);

  let (editorState, engineState) =
    (editorState, engineState)
    |> _disposeClonedGameObjectsGeometry(wdbGameObjects);
  let engineState =
    (editorState, engineState) |> _disposeWDBGameObjects(wdbGameObjects);

  (
    editorState
    |> AssetWDBNodeMapEditorService.getWDBNodeMap
    |> SparseMapService.copy
    |> DomHelper.deleteKeyInMap(nodeId)
    |. AssetWDBNodeMapEditorService.setWDBNodeMap(editorState),
    engineState,
  );
};

let _removeTextureFromAllLightMaterials = (textureComponent, engineState) =>
  LightMaterialEngineService.getAllLightMaterials(engineState)
  |> Js.Array.filter(lightMaterial =>
       LightMaterialEngineService.isDiffuseMap(
         lightMaterial,
         textureComponent,
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

let _removeTextureEngineData = (textureComponent, engineState) =>
  engineState |> _removeTextureFromAllLightMaterials(textureComponent);

let _removeTextureEditorData = (nodeId, textureComponent, image, editorState) => {
  let editorState =
    editorState
    |> AssetTextureNodeMapEditorService.getTextureNodeMap
    |> SparseMapService.copy
    |> DomHelper.deleteKeyInMap(nodeId)
    |. AssetTextureNodeMapEditorService.setTextureNodeMap(editorState);

  AssetTextureNodeMapEditorService.doesAnyTextureUseImage(image, editorState) ?
    editorState :
    editorState
    |> AssetImageNodeMapEditorService.getImageNodeMap
    |> Js.Array.copy
    |> DomHelper.deleteKeyInMap(image)
    |. AssetImageNodeMapEditorService.setImageNodeMap(editorState);
};

let _removeTextureTreeNode = (nodeId, (editorState, engineState)) => {
  let {textureComponent, image} =
    editorState
    |> AssetTextureNodeMapEditorService.getTextureNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

  let engineState = _removeTextureEngineData(textureComponent, engineState);

  (
    _removeTextureEditorData(nodeId, textureComponent, image, editorState),
    engineState,
  );
};

let _removeMaterialTreeNode = (nodeId, (editorState, engineState)) => {
  let {materialComponent, type_} =
    editorState |> AssetMaterialNodeMapEditorService.unsafeGetResult(nodeId);

  let (defaultMaterial, defaultMaterialType) =
    AssetMaterialDataEditorService.unsafeGetMaterialDataByType(
      type_,
      editorState,
    );

  let engineState =
    InspectorRenderGroupUtils.Dispose.replaceGameObjectsMaterialsOfTheMaterial(
      ((materialComponent, defaultMaterial), (type_, defaultMaterialType)),
      engineState,
    );

  (
    AssetMaterialNodeMapEditorService.remove(nodeId, editorState)
    |> AssetMaterialNodeIdMapEditorService.remove(materialComponent),
    engineState,
  );
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

let removeSpecificTreeNode = (targetNodeId, assetTreeRoot) => {
  let rec _iterateAssetTree =
          (targetNodeId, assetTreeArr, newAssetTree, removedTreeNode) =>
    assetTreeArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (newAssetTree, removedTreeNode), {nodeId, children} as treeNode) =>
           AssetTreeEditorService.isIdEqual(nodeId, targetNodeId) ?
             (newAssetTree, Some(treeNode)) :
             {
               let (newAssetTreeChildrenArray, removedTreeNode) =
                 _iterateAssetTree(
                   targetNodeId,
                   children,
                   [||],
                   removedTreeNode,
                 );
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

  _iterateAssetTree(targetNodeId, [|assetTreeRoot|], [||], None)
  |> _checkRemovedTreeNodeAndGetVal;
};

let deepRemoveTreeNode = (removedTreeNode, (editorState, engineState)) => {
  let rec _iterateRemovedTreeNode =
          (nodeArr, removedAssetIdArr, (editorState, engineState)) =>
    nodeArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           ((editorState, engineState), removedAssetIdArr),
           {nodeId, type_, children},
         ) => {
           let (editorState, engineState) =
             switch (type_) {
             | Folder => (
                 editorState
                 |> AssetFolderNodeMapEditorService.getFolderNodeMap
                 |> SparseMapService.copy
                 |> DomHelper.deleteKeyInMap(nodeId)
                 |. AssetFolderNodeMapEditorService.setFolderNodeMap(
                      editorState,
                    ),
                 engineState,
               )
             | Texture =>
               _removeTextureTreeNode(nodeId, (editorState, engineState))
             | Material =>
               _removeMaterialTreeNode(nodeId, (editorState, engineState))
             | WDB =>
               _handleRemoveWDBNode(nodeId, (editorState, engineState))
             | _ => (editorState, engineState)
             };

           _iterateRemovedTreeNode(
             children,
             removedAssetIdArr |> ArrayService.push(nodeId),
             (editorState, engineState),
           );
         },
         ((editorState, engineState), removedAssetIdArr),
       );

  _iterateRemovedTreeNode(
    [|removedTreeNode|],
    [||],
    (editorState, engineState),
  );
};

let deepDisposeAssetTreeRoot = ((editorState, engineState)) => {
  let removedTreeNode =
    editorState
    |> AssetTreeRootEditorService.getAssetTreeRoot
    |> OptionService.unsafeGet;

  let ((editorState, engineState), removedAssetIdArr) =
    (editorState, engineState) |> deepRemoveTreeNode(removedTreeNode);

  (
    editorState
    |> AssetRemovedAssetIdArrayEditorService.getRemovedAssetIdArray
    |> Js.Array.concat(removedAssetIdArr)
    |. AssetRemovedAssetIdArrayEditorService.setRemovedAssetIdArray(
         editorState,
       )
    |> AssetTreeRootEditorService.clearAssetTreeRoot
    |> AssetCurrentNodeParentIdEditorService.clearCurrentNodeParentId
    |> AssetCurrentNodeDataEditorService.clearCurrentNodeData,
    engineState,
  );
};
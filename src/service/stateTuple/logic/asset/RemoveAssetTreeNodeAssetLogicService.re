open AssetTreeNodeType;

open AssetNodeType;

let _disposeWDBGameObjects = (wdbGameObjects, (editorState, engineState)) =>
  wdbGameObjects
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineState, gameObject) =>
         GameObjectEngineService.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(
           gameObject,
           engineState,
         ),
       engineState,
     );

let _getClonedGameObjects = (wdbGameObjects, (editorState, engineState)) =>
  (editorState, engineState)
  |> GeometryAssetLogicService.getGeometryAssetsFromWDBGameObjects(
       wdbGameObjects,
     )
  |> Js.Array.map(geometry =>
       engineState
       |> GeometryEngineService.unsafeGetGeometryGameObjects(geometry)
     )
  |> WonderCommonlib.ArrayService.flatten
  |> ArrayService.exclude(wdbGameObjects);

let _removeClonedGameObjectsComponentType = (clonedGameObjects, editorState) =>
  clonedGameObjects
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. editorState, wdbGameObject) =>
         editorState
         |> InspectorEditorService.removeComponentTypeToMap(
              wdbGameObject,
              InspectorComponentType.Geometry,
            ),
       editorState,
     );

let _disposeGeometryAssets = (wdbGameObjects, (editorState, engineState)) =>
  GeometryAssetLogicService.getGeometryAssetsFromWDBGameObjects(
    wdbGameObjects,
    (editorState, engineState),
  )
  |> GeometryEngineService.batchDisposeGeometry(_, engineState);

let _removeWDBTreeNode = (nodeId, (editorState, engineState)) => {
  let {wdbGameObject} =
    editorState
    |> WDBNodeMapAssetEditorService.getWDBNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

  let wdbGameObjects =
    GameObjectEngineService.getAllGameObjects(wdbGameObject, engineState);

  let editorState =
    editorState
    |> _removeClonedGameObjectsComponentType(
         _getClonedGameObjects(wdbGameObjects, (editorState, engineState)),
       );

  let engineState =
    _disposeGeometryAssets(wdbGameObjects, (editorState, engineState));

  let engineState =
    (editorState, engineState) |> _disposeWDBGameObjects(wdbGameObjects);

  (
    RemoveNodeAssetEditorService.removeWDBNodeEditorData(nodeId, editorState),
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

let _removeTextureTreeNode = (nodeId, (editorState, engineState)) => {
  let {textureComponent} =
    editorState
    |> TextureNodeMapAssetEditorService.getTextureNodeMap
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

  let engineState = _removeTextureEngineData(textureComponent, engineState);

  (
    RemoveNodeAssetEditorService.removeTextureNodeEditorData(
      nodeId,
      editorState,
    ),
    engineState,
  );
};

let _removeMaterialTreeNode = (nodeId, (editorState, engineState)) => {
  let {materialComponent, type_} =
    editorState |> MaterialNodeMapAssetEditorService.unsafeGetResult(nodeId);

  let (defaultMaterial, defaultMaterialType) =
    MaterialDataAssetEditorService.unsafeGetMaterialDataByType(
      type_,
      editorState,
    );

  let engineState =
    InspectorRenderGroupUtils.Dispose.replaceGameObjectsMaterialsOfTheMaterial(
      ((materialComponent, defaultMaterial), (type_, defaultMaterialType)),
      engineState,
    );

  (
    RemoveNodeAssetEditorService.removeMaterialNodeEditorData(
      nodeId,
      editorState,
    ),
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
           TreeAssetEditorService.isIdEqual(nodeId, targetNodeId) ?
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
                 RemoveNodeAssetEditorService.removeFolderNodeEditorData(
                   nodeId,
                   editorState,
                 ),
                 engineState,
               )
             | Texture =>
               _removeTextureTreeNode(nodeId, (editorState, engineState))
             | Material =>
               _removeMaterialTreeNode(nodeId, (editorState, engineState))
             | WDB => _removeWDBTreeNode(nodeId, (editorState, engineState))
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
    |> TreeRootAssetEditorService.getAssetTreeRoot
    |> OptionService.unsafeGet;

  let ((editorState, engineState), removedAssetIdArr) =
    (editorState, engineState) |> deepRemoveTreeNode(removedTreeNode);

  (
    RemoveNodeAssetEditorService.deepDisposeAssetTreeRoot(
      removedAssetIdArr,
      editorState,
    ),
    engineState,
  );
};
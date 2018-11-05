open AssetTreeNodeType;

open AssetNodeType;

let getWidget = () => EditorType.Asset;

let isAssetWDBFile = () => {
  let (wnodeIdget, startNodeId) =
    StateEditorService.getState()
    |> CurrentDragSourceEditorService.getCurrentDragSource;

  switch (wnodeIdget, startNodeId) {
  | (Some(wnodeIdget), Some(nodeId)) =>
    wnodeIdget === getWidget()
    && StateEditorService.getState()
    |> AssetWDBNodeMapEditorService.getWDBNodeMap
    |> WonderCommonlib.SparseMapService.get(nodeId)
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
  | Some(nodeId) => nodeId
  };

let getParentFolderNodeId = (folderNodeId, editorState) =>
  switch (
    folderNodeId
    |> AssetFolderNodeMapEditorService.getFolderParentId(
         _,
         AssetFolderNodeMapEditorService.getFolderNodeMap(editorState),
       )
  ) {
  | Some(parentFolderNodeId) => parentFolderNodeId
  | None => AssetTreeRootEditorService.getRootTreeNodeId(editorState)
  };

let isIdEqual = (nodeId, targetNodeId) => nodeId === targetNodeId;

let rec getSpecificTreeNodeById = (nodeId, targetTreeNode) =>
  isIdEqual(nodeId, targetTreeNode.nodeId) ?
    Some(targetTreeNode) :
    {
      let (resultNode, _) =
        targetTreeNode.children
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (. (resultNode, nodeId), child) =>
               switch (resultNode) {
               | Some(_) => (resultNode, nodeId)
               | None => (getSpecificTreeNodeById(nodeId, child), nodeId)
               },
             (None, nodeId),
           );
      resultNode;
    };

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
           isIdEqual(nodeId, targetNodeId) ?
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

let insertSourceTreeNodeToTargetTreeNodeChildren =
    (targetNodeId, newTreeNode, assetTreeRoot) => {
  let rec _iterateInsertIntoAssetTree =
          (targetNodeId, newTreeNode, assetTreeArr) =>
    assetTreeArr
    |> Js.Array.map(({nodeId, children} as treeNode) =>
         isIdEqual(nodeId, targetNodeId) ?
           {
             ...treeNode,
             children:
               children |> Js.Array.copy |> ArrayService.push(newTreeNode),
           } :
           {
             ...treeNode,
             children:
               _iterateInsertIntoAssetTree(
                 targetNodeId,
                 newTreeNode,
                 children,
               ),
           }
       );

  _iterateInsertIntoAssetTree(targetNodeId, newTreeNode, [|assetTreeRoot|])
  |> (assetTreeArr => assetTreeArr |> ArrayService.unsafeGetFirst);
};

let rec _isRemovedTreeNodeBeTargetParent = (targetNodeId, removedTreeNode) =>
  isIdEqual(targetNodeId, removedTreeNode.nodeId) ?
    true :
    removedTreeNode.children
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. result, child) =>
           result ?
             true : _isRemovedTreeNodeBeTargetParent(targetNodeId, child),
         false,
       );

let _isTargetTreeNodeBeRemovedParent = (targetTreeNode, removedNodeId) =>
  targetTreeNode.children
  |> Js.Array.filter(child => isIdEqual(child.nodeId, removedNodeId))
  |> Js.Array.length >= 1 ?
    true : false;

let getChildrenNameAndIdArr = (nodeId, nodeType, (editorState, engineState)) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          test(
            Log.buildAssertMessage(
              ~expect={j|the parent asset node type should be Folder|j},
              ~actual={j|not|j},
            ),
            () =>
            editorState
            |> AssetTreeRootEditorService.getAssetTreeRoot
            |> OptionService.unsafeGet
            |> getSpecificTreeNodeById(nodeId)
            |> OptionService.unsafeGet
            |> (({type_}) => type_ == Folder |> assertTrue)
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  editorState
  |> AssetTreeRootEditorService.getAssetTreeRoot
  |> OptionService.unsafeGet
  |> getSpecificTreeNodeById(nodeId)
  |> OptionService.unsafeGet
  |> (
    ({children}: assetTreeNodeType) =>
      children
      |> Js.Array.filter(({type_ as childType}: assetTreeNodeType) =>
           childType === nodeType
         )
      |> Js.Array.map(({nodeId as currentNodeId, type_}: assetTreeNodeType) => {
           let name =
             editorState
             |> AssetNodeUtils.handleSpeficFuncByAssetNodeType(
                  type_,
                  (
                    AssetFolderNodeMapEditorService.getFolderName(
                      currentNodeId,
                    ),
                    OperateTextureLogicService.getTextureBaseName(
                      currentNodeId,
                    ),
                    AssetMaterialNodeMapLogicService.getMaterialBaseName(
                      currentNodeId,
                      engineState,
                    ),
                    AssetWDBNodeMapEditorService.getWDBBaseName(
                      currentNodeId,
                    ),
                  ),
                );

           (name, nodeId);
         })
  );
};

let checkAssetNodeName =
    (
      (sourceNodeId, sourceName),
      targetNodeId,
      type_,
      (successFunc, failFunc),
      (editorState, engineState),
    ) =>
  getChildrenNameAndIdArr(targetNodeId, type_, (editorState, engineState))
  |> Js.Array.filter(((name, nodeId)) => nodeId !== sourceNodeId)
  |> Js.Array.map(((name, nodeId)) => name)
  |> Js.Array.includes(sourceName) ?
    successFunc((editorState, engineState)) :
    failFunc((editorState, engineState));

let _isTargetTreeNodeHasSameNameChild =
    (targetNodeId, removedNodeId, (editorState, engineState)) => {
  let {type_}: assetTreeNodeType =
    editorState
    |> AssetTreeRootEditorService.getAssetTreeRoot
    |> OptionService.unsafeGet
    |> getSpecificTreeNodeById(removedNodeId)
    |> OptionService.unsafeGet;

  let removedNodeName =
    editorState
    |> AssetNodeUtils.handleSpeficFuncByAssetNodeType(
         type_,
         (
           AssetFolderNodeMapEditorService.getFolderName(removedNodeId),
           OperateTextureLogicService.getTextureBaseName(removedNodeId),
           AssetMaterialNodeMapLogicService.getMaterialBaseName(
             removedNodeId,
             engineState,
           ),
           AssetWDBNodeMapEditorService.getWDBBaseName(removedNodeId),
         ),
       );

  checkAssetNodeName(
    (removedNodeId, removedNodeName),
    targetNodeId,
    type_,
    (
      ((editorState, engineState)) => true,
      ((editorState, engineState)) => false,
    ),
    (editorState, engineState),
  );
};

let isTreeNodeRelationError =
    (targetNodeId, removedNodeId, (editorState, engineState)) =>
  isIdEqual(targetNodeId, removedNodeId) ?
    true :
    _isRemovedTreeNodeBeTargetParent(
      targetNodeId,
      editorState
      |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
      |> getSpecificTreeNodeById(removedNodeId)
      |> OptionService.unsafeGet,
    ) ?
      true :
      _isTargetTreeNodeBeRemovedParent(
        editorState
        |> AssetTreeRootEditorService.unsafeGetAssetTreeRoot
        |> getSpecificTreeNodeById(targetNodeId)
        |> OptionService.unsafeGet,
        removedNodeId,
      )
      || _isTargetTreeNodeHasSameNameChild(
           targetNodeId,
           removedNodeId,
           (editorState, engineState),
         );

let rec iterateNameArrBuildNewName = (name, childrenNameArr) =>
  childrenNameArr |> Js.Array.includes(name) ?
    childrenNameArr
    |> iterateNameArrBuildNewName(FileNameService.buildNameSucc(name)) :
    name;

let getUniqueTreeNodeName =
    (name, nodeType, nodeId, (editorState, engineState)) =>
  switch (nodeId) {
  | None => name
  | Some(nodeId) =>
    (editorState, engineState)
    |> getChildrenNameAndIdArr(nodeId, nodeType)
    |> Js.Array.map(((name, nodeId)) => name)
    |> iterateNameArrBuildNewName(name)
  };

/* let isNodeWithTheNameExist =
     (name, nodeType, parentFolderNodeId, (editorState, engineState)) =>
   (editorState, engineState)
   |> getChildrenNameAndIdArr(parentFolderNodeId, nodeType)
   |> Js.Array.map(((name, nodeId)) => name)
   |> Js.Array.includes(name); */
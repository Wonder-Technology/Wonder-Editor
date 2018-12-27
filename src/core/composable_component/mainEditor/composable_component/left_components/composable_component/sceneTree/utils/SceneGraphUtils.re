open SceneGraphType;

let getSceneTreeNodeIsShowChildren = () => true;

let buildTreeNode = (gameObject, engineState) => {
  name:
    engineState |> GameObjectEngineService.unsafeGetGameObjectName(gameObject),
  uid: gameObject,
  isShowChildren:
    gameObject === SceneEngineService.getSceneGameObject(engineState) ?
      getSceneTreeNodeIsShowChildren() : false,
  children: [||],
};

let _buildSceneGraphData = (gameObject, engineState) => {
  let rec _buildSceneGraphDataRec = (gameObject, treeNode, engineState) =>
    GameObjectUtils.hasChildren(gameObject, engineState) ?
      engineState
      |> GameObjectUtils.getChildren(gameObject)
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. {children} as treeNode, child) => {
             ...treeNode,
             children:
               children
               |> Js.Array.copy
               |> ArrayService.push(
                    _buildSceneGraphDataRec(
                      child,
                      buildTreeNode(child, engineState),
                      engineState,
                    ),
                  ),
           },
           treeNode,
         ) :
      treeNode;

  _buildSceneGraphDataRec(
    gameObject,
    buildTreeNode(gameObject, engineState),
    engineState,
  );
};

let getSceneGraphDataFromEngine = ((editorState, engineState)) => [|
  _buildSceneGraphData(
    engineState |> SceneEngineService.getSceneGameObject,
    engineState,
  ),
|];

let rec setSpecificSceneTreeNodeIsShowChildren =
        (targetUid, isShowChildren, sceneGraphArray) =>
  sceneGraphArray
  |> Js.Array.map(({uid, children} as treeNode) =>
       uid === targetUid ?
         {...treeNode, isShowChildren} :
         {
           ...treeNode,
           children:
             setSpecificSceneTreeNodeIsShowChildren(
               targetUid,
               isShowChildren,
               children,
             ),
         }
     );

let rec setIsShowChildrenByMap = (isShowChildrenMap, sceneGraphArray) =>
  sceneGraphArray
  |> Js.Array.map(({uid, isShowChildren, children} as treeNode) =>
       {
         ...treeNode,
         isShowChildren:
           switch (
             isShowChildrenMap |> WonderCommonlib.SparseMapService.get(uid)
           ) {
           | Some(true) => true
           | Some(false) => false
           | _ => isShowChildren
           },
         children: setIsShowChildrenByMap(isShowChildrenMap, children),
       }
     );

let rec renameSceneGraphData = (targetUid, newName, sceneGraphArray) =>
  sceneGraphArray
  |> Js.Array.map(({uid, name, children} as treeNode) =>
       uid === targetUid ?
         {...treeNode, name: newName} :
         {
           ...treeNode,
           children: renameSceneGraphData(targetUid, newName, children),
         }
     );

let addTreeNodeSceneGraphData =
    (
      treeNodeSceneGraphData,
      targetUid,
      sceneGraphArray: array(SceneGraphType.sceneTreeNodeType),
      engineState,
    ) =>
  sceneGraphArray
  |> Js.Array.map(({uid, children} as treeNode) =>
       uid === targetUid ?
         {
           ...treeNode,
           children: children |> Js.Array.copy |> ArrayService.push(treeNodeSceneGraphData),
         } :
         treeNode
     );

let buildIsShowChildrenMap = sceneGraphArray => {
  let rec _build = (sceneGraphArray, map) =>
    sceneGraphArray
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. map, {uid, isShowChildren, children} as treeNode) => {
           let map =
             map |> WonderCommonlib.SparseMapService.set(uid, isShowChildren);

           _build(children, map);
         },
         map,
       );

  _build(sceneGraphArray, WonderCommonlib.SparseMapService.createEmpty());
};

let buildIsShowChildrenMapFromStore = store =>
  (
    switch (store |> StoreUtils.getSceneGraphDataFromStore) {
    | None => [||]
    | Some(sceneGraphArray) => sceneGraphArray
    }
  )
  |> buildIsShowChildrenMap;

let _checkDragedTreeNodeShouldExist = ((newSceneGraphArr, draggedTreeNode)) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          test(
            Log.buildAssertMessage(
              ~expect={j|draggedTreeNode should exist|j},
              ~actual={j|not|j},
            ),
            () =>
            draggedTreeNode |> Js.Option.isSome |> assertTrue
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  (newSceneGraphArr, draggedTreeNode |> OptionService.unsafeGet);
};

let removeDragedTreeNode = (draggedUid, sceneGraphArray) => {
  let rec _iterateSceneGraph =
          (draggedUid, sceneGraphArray, newSceneGraphArray, draggedTreeNode) =>
    sceneGraphArray
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (newSceneGraphArray, draggedTreeNode),
           {uid, children} as treeNode,
         ) =>
           uid === draggedUid ?
             (newSceneGraphArray, Some(treeNode)) :
             {
               let (newChildrenSceneGraphArray, draggedTreeNode) =
                 _iterateSceneGraph(
                   draggedUid,
                   children,
                   [||],
                   draggedTreeNode,
                 );
               (
                 newSceneGraphArray
                 |> ArrayService.push({
                      ...treeNode,
                      children: newChildrenSceneGraphArray,
                    }),
                 draggedTreeNode,
               );
             },
         (newSceneGraphArray, draggedTreeNode),
       );
  _iterateSceneGraph(draggedUid, sceneGraphArray, [||], None)
  |> _checkDragedTreeNodeShouldExist;
};

let getAllGameObjects = treeNode => {
  let rec _iterateGet = (treeNodeArr, resultArr) =>
    treeNodeArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. resultArr, {uid, children}) =>
           _iterateGet(children, resultArr |> ArrayService.push(uid)),
         resultArr,
       );

  _iterateGet([|treeNode|], [||]);
};
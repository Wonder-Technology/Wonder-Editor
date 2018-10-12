open SceneGraphType;

let getWidge = () => EditorType.SceneTree;

let isWidge = startWidge =>
  switch (startWidge) {
  | None => false
  | Some(startWidge) => startWidge === getWidge()
  };

let _isDragedGameObjectBeTargetGameObjectParent =
    (targetGameObject, dragedGameObject, engineState) => {
  let rec _judgeAllParents = (targetTransform, dragedTransform, engineState) =>
    switch (
      TransformEngineService.getParent(targetTransform, engineState)
      |> Js.Undefined.to_opt
    ) {
    | None => false
    | Some(transformParent) =>
      transformParent === dragedTransform ?
        true : _judgeAllParents(transformParent, dragedTransform, engineState)
    };
  _judgeAllParents(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      targetGameObject,
      engineState,
    ),
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      dragedGameObject,
      engineState,
    ),
    engineState,
  );
};

let _isTargetGameObjectBeRemovedGameObjectParent =
    (dragedGameObject, targetGameObject, engineState) =>
  switch (
    engineState
    |> TransformEngineService.getParent(
         engineState
         |> GameObjectComponentEngineService.unsafeGetTransformComponent(
              dragedGameObject,
            ),
       )
    |> Js.Undefined.to_opt
  ) {
  | None => false
  | Some(transformParent) =>
    transformParent
    === GameObjectComponentEngineService.unsafeGetTransformComponent(
          targetGameObject,
          engineState,
        ) ?
      true : false
  };

let isGameObjectRelationError =
    (targetGameObject, dragedGameObject, (_editorState, engineState)) =>
  targetGameObject === dragedGameObject ?
    true :
    _isDragedGameObjectBeTargetGameObjectParent(
      targetGameObject,
      dragedGameObject,
      engineState,
    ) ?
      true :
      _isTargetGameObjectBeRemovedGameObjectParent(
        dragedGameObject,
        targetGameObject,
        engineState,
      );

let _buildTreeNode = (gameObject, engineState) => {
  name:
    engineState |> GameObjectEngineService.unsafeGetGameObjectName(gameObject),
  uid: gameObject,
  isShowChildren: true,
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
                      _buildTreeNode(child, engineState),
                      engineState,
                    ),
                  ),
           },
           treeNode,
         ) :
      treeNode;

  _buildSceneGraphDataRec(
    gameObject,
    _buildTreeNode(gameObject, engineState),
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
        (targetId, isShowChildren, sceneGraphArray) =>
  sceneGraphArray
  |> Js.Array.map(({uid, children} as treeNode) =>
       uid === targetId ?
         {...treeNode, isShowChildren} :
         {
           ...treeNode,
           children:
             setSpecificSceneTreeNodeIsShowChildren(
               targetId,
               isShowChildren,
               children,
             ),
         }
     );

let rec renameSceneGraphData = (targetId, newName, sceneGraphArray) =>
  sceneGraphArray
  |> Js.Array.map(({uid, name, children} as treeNode) =>
       uid === targetId ?
         {...treeNode, name: newName} :
         {
           ...treeNode,
           children: renameSceneGraphData(targetId, newName, children),
         }
     );

let buildSceneGraphDataWithNewGameObject =
    (
      newGameObject,
      oldSceneGraphData: array(SceneGraphType.sceneTreeNodeType),
      engineState,
    ) => {
  let scene = oldSceneGraphData |> ArrayService.unsafeGetFirst;
  [|
    {
      ...scene,
      children:
        scene.children
        |> Js.Array.copy
        |> ArrayService.push(engineState |> _buildTreeNode(newGameObject)),
    },
  |]
  /* |> WonderLog.Contract.ensureCheck(
       sceneGraphArray =>
         WonderLog.(
           Contract.(
             test(
               Log.buildAssertMessage(
                 ~expect=
                   {j|the draged scene graph data == scene data from engine|j},
                 ~actual={j|not|j},
               ),
               () =>
               getSceneGraphDataFromEngine
               |> StateLogicService.getStateToGetData == sceneGraphArray
               |> assertTrue
             )
           )
         ),
       StasdteEditorService.getStateIsDebug(),
     ); */
};

let _checkDragedTreeNodeShouldExist = ((newSceneGraphArr, dragedTreeNode)) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          test(
            Log.buildAssertMessage(
              ~expect={j|dragedTreeNode should exist|j},
              ~actual={j|not|j},
            ),
            () =>
            dragedTreeNode |> Js.Option.isSome |> assertTrue
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  (newSceneGraphArr, dragedTreeNode |> OptionService.unsafeGet);
};

let removeDragedTreeNode = (dragedUid, sceneGraphArray) => {
  let rec _iterateSceneGraph =
          (dragedUid, sceneGraphArray, newSceneGraphArray, dragedTreeNode) =>
    sceneGraphArray
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           (newSceneGraphArray, dragedTreeNode),
           {uid, children} as treeNode,
         ) =>
           uid === dragedUid ?
             (newSceneGraphArray, Some(treeNode)) :
             {
               let (newChildrenSceneGraphArray, dragedTreeNode) =
                 _iterateSceneGraph(
                   dragedUid,
                   children,
                   [||],
                   dragedTreeNode,
                 );
               (
                 newSceneGraphArray
                 |> ArrayService.push({
                      ...treeNode,
                      children: newChildrenSceneGraphArray,
                    }),
                 dragedTreeNode,
               );
             },
         (newSceneGraphArray, dragedTreeNode),
       );
  _iterateSceneGraph(dragedUid, sceneGraphArray, [||], None)
  |> _checkDragedTreeNodeShouldExist;
};

let rec dragedTreeNodeToTargetTreeNode =
        (targetId, (sceneGraphArray, dragedTreeNode)) =>
  sceneGraphArray
  |> Js.Array.map(({uid, children} as treeNode) =>
       uid === targetId ?
         {
           ...treeNode,
           children:
             children |> Js.Array.copy |> ArrayService.push(dragedTreeNode),
         } :
         {
           ...treeNode,
           children:
             dragedTreeNodeToTargetTreeNode(
               targetId,
               (children, dragedTreeNode),
             ),
         }
     );

let getDragedSceneGraphData =
    (
      targetId: int,
      dragedUid: int,
      sceneGraphArray: array(sceneTreeNodeType),
    ) =>
  removeDragedTreeNode(dragedUid, sceneGraphArray)
  |> dragedTreeNodeToTargetTreeNode(targetId);
/* |> WonderLog.Contract.ensureCheck(
     dragedSceneGraph =>
       WonderLog.(
         Contract.(
           test(
             Log.buildAssertMessage(
               ~expect=
                 {j|the draged scene graph data == scene data from engine|j},
               ~actual={j|not|j},
             ),
             () => {
               WonderLog.Log.print(
                 getSceneGraphDataFromEngine
                 |> StateLogicService.getStateToGetData,
               )
               |> ignore;
               WonderLog.Log.print(dragedSceneGraph) |> ignore;

               getSceneGraphDataFromEngine
               |> StateLogicService.getStateToGetData == dragedSceneGraph
               |> assertTrue;
             },
           )
         )
       ),
     StateEditorService.getStateIsDebug(),
   ); */
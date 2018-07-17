open SceneGraphType;

let getFlag = () => EditorType.SceneTree;

let isFlag = startFlag =>
  switch (startFlag) {
  | None => false
  | Some(startFlag) => startFlag === getFlag()
  };

let getSceneGraphDataFromStore = (store: AppStore.appState) =>
  store.sceneTreeState.sceneGraphData;

let unsafeGetSceneGraphDataFromStore = (store: AppStore.appState) =>
  store.sceneTreeState.sceneGraphData |> OptionService.unsafeGet;

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
    GameObjectComponentEngineService.getTransformComponent(
      targetGameObject,
      engineState,
    ),
    GameObjectComponentEngineService.getTransformComponent(
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
         |> GameObjectComponentEngineService.getTransformComponent(
              dragedGameObject,
            ),
       )
    |> Js.Undefined.to_opt
  ) {
  | None => false
  | Some(transformParent) =>
    transformParent
    === GameObjectComponentEngineService.getTransformComponent(
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
    editorState |> SceneEditorService.unsafeGetScene,
    engineState,
  ),
|];

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

let buildSceneGraphDataWithNewGameObject =
    (
      newGameObject,
      oldSceneGraphData: array(SceneGraphType.sceneTreeNodeType),
      engineState,
    ) => {
  let scene = oldSceneGraphData |> ArrayService.getFirst;
  [|
    {
      ...scene,
      children:
        scene.children
        |> Js.Array.copy
        |> ArrayService.push(engineState |> _buildTreeNode(newGameObject)),
    },
  |]
  |> WonderLog.Contract.ensureCheck(
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
       StateEditorService.getStateIsDebug(),
     );
};

let _checkDragedTreeNodeAndGetVal = ((newSceneGraphArr, dragedTreeNode)) => {
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

let _removeDragedTreeNode = (dragedUid, sceneGraphArray) => {
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
  |> _checkDragedTreeNodeAndGetVal;
};

let rec dragedTreeNodeToTargetTreeNode =
        (targetUid, (sceneGraphArray, dragedTreeNode)) =>
  sceneGraphArray
  |> Js.Array.map(({uid, children} as treeNode) =>
       uid === targetUid ?
         {
           ...treeNode,
           children:
             children |> Js.Array.copy |> ArrayService.push(dragedTreeNode),
         } :
         {
           ...treeNode,
           children:
             dragedTreeNodeToTargetTreeNode(
               targetUid,
               (children, dragedTreeNode),
             ),
         }
     );

let getDragedSceneGraphData =
    (
      targetUid: int,
      dragedUid: int,
      sceneGraphArray: array(sceneTreeNodeType),
    ) =>
  _removeDragedTreeNode(dragedUid, sceneGraphArray)
  |> dragedTreeNodeToTargetTreeNode(targetUid)
  |> WonderLog.Contract.ensureCheck(
       dragedSceneGraph =>
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
               |> StateLogicService.getStateToGetData == dragedSceneGraph
               |> assertTrue
             )
           )
         ),
       StateEditorService.getStateIsDebug(),
     );
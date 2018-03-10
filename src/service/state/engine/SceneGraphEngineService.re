open SceneGraphType;

let _isDragedGameObjectBeTargetGameObjectParent = (targetGameObject, dragedGameObject, engineState) => {
  let rec _judgeAllParents = (targetTransform, dragedTransform, engineState) =>
    switch (TransformEngineService.getParent(targetTransform, engineState) |> Js.Nullable.to_opt) {
    | None => false
    | Some(transformParent) =>
      transformParent === dragedTransform ?
        true : _judgeAllParents(transformParent, dragedTransform, engineState)
    };
  _judgeAllParents(
    GameObjectComponentEngineService.getTransformComponent(targetGameObject, engineState),
    GameObjectComponentEngineService.getTransformComponent(dragedGameObject, engineState),
    engineState
  )
};

let isGameObjectRelationError = (targetGameObject, dragedGameObject, (_, engineState)) =>
  targetGameObject === dragedGameObject ?
    true :
    _isDragedGameObjectBeTargetGameObjectParent(targetGameObject, dragedGameObject, engineState);

let _getGameObjectName = (gameObject, engineState) =>
  GameObjectComponentEngineService.hasCameraControllerComponent(gameObject, engineState) ?
    "camera" : {j|gameObject$gameObject|j};

let _buildTreeNode = (gameObject, engineState) => {
  name: _getGameObjectName(gameObject, engineState),
  uid: gameObject,
  children: [||]
};

let _buildSceneGraphData = (gameObject, engineState) => {
  let rec _buildSceneGraphDataRec = (gameObject, treeNode, engineState) =>
    GameObjectEngineService.hasChildren(gameObject, engineState) ?
      engineState
      |> GameObjectEngineService.getChildren(gameObject)
      |> Js.Array.reduce(
           ({children} as treeNode, child) => {
             ...treeNode,
             children:
               children
               |> Js.Array.copy
               |> ArrayService.push(
                    _buildSceneGraphDataRec(child, _buildTreeNode(child, engineState), engineState)
                  )
           },
           treeNode
         ) :
      treeNode;
  _buildSceneGraphDataRec(gameObject, _buildTreeNode(gameObject, engineState), engineState)
};

let getSceneGraphDataFromEngine = ((editorState, engineState)) => [|
  _buildSceneGraphData(editorState |> SceneService.unsafeGetScene, engineState)
|];

let buildSceneGraphDataWithNewGameObject =
    (
      newGameObject,
      oldSceneGraphData: array(MainEditorSceneTreeType.treeNode),
      (editorState, engineState)
    ) => {
  let scene = oldSceneGraphData |> ArrayService.getFirst;
  [|
    {
      ...scene,
      children:
        scene.children
        |> Js.Array.copy
        |> ArrayService.push(engineState |> _buildTreeNode(newGameObject))
    }
  |]
};
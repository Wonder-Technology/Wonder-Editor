open SceneGraphType;

let _buildTreeNode = (gameObject, engineState) => {
  name:
    engineState |> GameObjectEngineService.unsafeGetGameObjectName(gameObject),
  uid: gameObject,
  children: [||],
};

let _buildSceneGraphData = (gameObject, engineState) => {
  let rec _buildSceneGraphDataRec = (gameObject, treeNode, engineState) =>
    HierarchyGameObjectEngineService.hasChildren(gameObject, engineState) ?
      engineState
      |> HierarchyGameObjectEngineService.getChildren(gameObject)
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
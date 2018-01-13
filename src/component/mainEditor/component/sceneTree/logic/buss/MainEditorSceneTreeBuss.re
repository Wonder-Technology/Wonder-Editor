open Contract;

open MainEditorSceneTreeType;

let _isDragedGameObjectEqualTargetGameObject = (targetGameObject, dragedGameObject) =>
  targetGameObject === dragedGameObject;

let _isDragedGameObjectBeTargetGameObjectParent =
        (targetGameObject, dragedGameObject, engineState) => {
  let rec _judgeAllParents = (targetTransform, dragedTransform, engineState) =>
    switch (MainEditorTransformOper.getParent(targetTransform, engineState) |> Js.Nullable.to_opt) {
    | None => false
    | Some(transformParent) =>
      transformParent === dragedTransform ?
        true : _judgeAllParents(transformParent, dragedTransform, engineState)
    };
  _judgeAllParents(
    MainEditorGameObjectOper.getTransformComponent(targetGameObject, engineState),
    MainEditorGameObjectOper.getTransformComponent(dragedGameObject, engineState),
    engineState
  )
};

let isGameObjectRelationError = (targetGameObject, dragedGameObject, (_, engineState)) =>
  _isDragedGameObjectEqualTargetGameObject(targetGameObject, dragedGameObject) ?
    true :
    _isDragedGameObjectBeTargetGameObjectParent(targetGameObject, dragedGameObject, engineState);

let setParent = (parentGameObject, childGameObject, (editorState, engineState)) => (
  editorState,
  MainEditorTransformOper.setParent(
    MainEditorGameObjectOper.getTransformComponent(parentGameObject, engineState),
    MainEditorGameObjectOper.getTransformComponent(childGameObject, engineState),
    engineState
  )
);

let _getGameObjectName = (gameObject, engineState) =>
  MainEditorCameraOper.isCamera(gameObject, engineState) ? "camera" : {j|gameObject$gameObject|j};

let _buildTreeNode = (gameObject, engineState) => {
  name: _getGameObjectName(gameObject, engineState),
  uid: gameObject,
  children: [||]
};

let _buildSceneGraphData = (gameObject, engineState) => {
  let rec _buildSceneGraphDataRec = (gameObject, treeNode, engineState) =>
    MainEditorGameObjectOper.hasChildren(gameObject, engineState) ?
      engineState
      |> MainEditorGameObjectOper.getChildren(gameObject)
      |> Js.Array.reduce(
           ({children} as treeNode, child) => {
             ...treeNode,
             children:
               children
               |> Js.Array.copy
               |> OperateArrayUtils.push(
                    _buildSceneGraphDataRec(child, _buildTreeNode(child, engineState), engineState)
                  )
           },
           treeNode
         ) :
      treeNode;
  _buildSceneGraphDataRec(gameObject, _buildTreeNode(gameObject, engineState), engineState)
};

let getSceneGraphDataFromEngine = ((editorState, engineState)) => [|
  _buildSceneGraphData(editorState |> MainEditorSceneEdit.unsafeGetScene, engineState)
|];

let _removeDragedTreeNodeFromSceneGrahph = (dragedId, sceneGraphArrayData) => {
  let rec _iterateSceneGraph = (dragedId, sceneGraphArray, newSceneGraphArray, dragedTreeNode) =>
    sceneGraphArray
    |> Js.Array.reduce(
         ((newSceneGraphArray, dragedTreeNode), {uid, children} as treeNode) =>
           uid === dragedId ?
             (newSceneGraphArray, Some(treeNode)) :
             {
               let (newChildrenSceneGraphArray, dragedTreeNode) =
                 _iterateSceneGraph(dragedId, children, [||], dragedTreeNode);
               (
                 newSceneGraphArray
                 |> OperateArrayUtils.push({...treeNode, children: newChildrenSceneGraphArray}),
                 dragedTreeNode
               )
             },
         (newSceneGraphArray, dragedTreeNode)
       );
  switch (_iterateSceneGraph(dragedId, sceneGraphArrayData, [||], None)) {
  | (_, None) => ExcepetionHandleSystem.throwMessage("the draged treeNode should exist")
  | (newSceneGraphArray, Some(dragedTreeNode)) => (newSceneGraphArray, dragedTreeNode)
  }
};

let rec _insertRemovedTreeNodeToTargetTreeNode = (targetId, (sceneGraphArrayData, dragedTreeNode)) =>
  sceneGraphArrayData
  |> Js.Array.map(
       ({uid, children} as treeNode) =>
         uid === targetId ?
           {...treeNode, children: children |> OperateArrayUtils.push(dragedTreeNode)} :
           {
             ...treeNode,
             children: _insertRemovedTreeNodeToTargetTreeNode(targetId, (children, dragedTreeNode))
           }
     );

let getDragedSceneGraphData = (targetId: int, dragedId: int, sceneGraphArrayData: array(treeNode)) =>
  _removeDragedTreeNodeFromSceneGrahph(dragedId, sceneGraphArrayData)
  |> _insertRemovedTreeNodeToTargetTreeNode(targetId)
  |> ensureCheck(
       (result) =>
         test(
           "the draged scene graph data should == scene graph data from engine",
           () => {
             let sceneGraphFromEngine =
               MainEditorStateView.prepareState() |> getSceneGraphDataFromEngine;
             sceneGraphFromEngine == result |> assertTrue
           }
         )
     );
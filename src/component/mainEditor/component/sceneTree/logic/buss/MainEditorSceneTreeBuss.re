open Contract;

open MainEditorSceneTreeType;

let rec _iterateDragedChildrenFindTarget =
        (targetGameObject, chidlrenArray, currentGameObjectChildren, engineState) =>
  chidlrenArray
  |> Js.Array.filter(
       (child) =>
         child === targetGameObject ?
           true :
           {
             engineState
             |> MainEditorGameObjectOper.getChildren(child)
             |> Js.Array.forEach(
                  (child) => currentGameObjectChildren |> Js.Array.push(child) |> ignore
                );
             false
           }
     )
  |> (
    (specificGameObjectArr) =>
      OperateArrayUtils.hasItem(specificGameObjectArr) ?
        true :
        OperateArrayUtils.hasItem(currentGameObjectChildren) ?
          _iterateDragedChildrenFindTarget(
            targetGameObject,
            currentGameObjectChildren,
            [||],
            engineState
          ) :
          false
  );

let isGameObjectRelationError = (targetGameObject, dragedGameObject, (_, engineState)) => {
  let dragedChidlren = engineState |> MainEditorGameObjectOper.getChildren(dragedGameObject);
  targetGameObject === dragedGameObject ?
    true :
    OperateArrayUtils.hasItem(dragedChidlren) ?
      _iterateDragedChildrenFindTarget(targetGameObject, dragedChidlren, [||], engineState) : false
};

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
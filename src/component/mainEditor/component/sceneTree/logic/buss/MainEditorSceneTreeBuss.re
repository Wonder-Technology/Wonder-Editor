open Contract;

open MainEditorSceneTreeType;

let rec _iterateDragedObject = (targetGameObject, dragedGameObject, engineState) =>
  engineState |> MainEditorGameObjectOper.hasChildren(dragedGameObject) ?
    engineState
    |> MainEditorGameObjectOper.getChildren(dragedGameObject)
    |> Js.Array.filter(
         (child) =>
           child == targetGameObject ?
             true : _iterateDragedObject(targetGameObject, child, engineState)
       )
    |> Js.Array.length > 0 ?
      true : false :
    false;

let isObjectAssociateError = (targetGameObject, dragedGameObject, (editorState, engineState)) =>
  targetGameObject == dragedGameObject ?
    true : _iterateDragedObject(targetGameObject, dragedGameObject, engineState);

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
  _buildSceneGraphData(editorState |> MainEditorSceneEdit.getScene, engineState)
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
  let (a, b) = _iterateSceneGraph(dragedId, sceneGraphArrayData, [||], None);
  switch (a, b) {
  | (_, None) => ExcepetionHandleSystem.throwMessage("the draged treeNode should exist")
  | (newSceneGraphArray, Some(dragedTreeNode)) => (newSceneGraphArray, dragedTreeNode)
  }
};

let _insertRemovedTreeNodeToTargetTreeNode = (targetId, (sceneGraphArrayData, dragedTreeNode)) => {
  let rec _iterateSceneGraph = (targetId, dragedTreeNode, sceneGraphArray) =>
    sceneGraphArray
    |> Js.Array.map(
         ({uid, children} as treeNode) =>
           uid == targetId ?
             {
               children |> Js.Array.push(dragedTreeNode) |> ignore;
               treeNode
             } :
             {
               _iterateSceneGraph(targetId, dragedTreeNode, children) |> ignore;
               treeNode
             }
       );
  let newArrayData = sceneGraphArrayData |> Js.Array.copy;
  _iterateSceneGraph(targetId, dragedTreeNode, newArrayData)
};

let getDragedSceneGraphData = (targetId: int, dragedId: int, sceneGraphArrayData: array(treeNode)) =>
  _removeDragedTreeNodeFromSceneGrahph(dragedId, sceneGraphArrayData)
  |> _insertRemovedTreeNodeToTargetTreeNode(targetId);
/* |> ensureCheck(
     (result) =>
       test(
         "the draged scene graph data should == scene graph data from engine",
         () => {
           let sceneGraphFromEngine = MainEditorStateView.prepareState() |> getSceneGraphDataFromEngine;
           sceneGraphFromEngine == result |> Js.Boolean.to_js_boolean |> assertJsTrue
         }
       )
   ) */
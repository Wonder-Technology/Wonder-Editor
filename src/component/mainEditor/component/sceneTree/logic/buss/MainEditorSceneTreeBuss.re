open Contract;

open MainEditorSceneTreeType;

let setParent = (parentGameObject, childGameObject, stateTuple) => {
  let (editorState, engineState) = stateTuple;
  let parentGameObjectTransform =
    MainEditorGameObjectOper.getTransformComponent(parentGameObject, engineState);
  let childGameObjectTransform =
    MainEditorGameObjectOper.getTransformComponent(childGameObject, engineState);
  let engineState =
    MainEditorTransformOper.setParent(
      parentGameObjectTransform,
      childGameObjectTransform,
      engineState
    );
  (editorState, engineState)
};

let getScene = (stateTuple) => {
  let (editorState, _) = stateTuple;
  editorState |> MainEditorSceneEdit.getScene
};

let rec _buildSceneGraphData = (gameObject, engineState) => {
  let gameObjectName =
    MainEditorCameraOper.isCamera(gameObject, engineState) ?
      "camera" : {j|gameObject$gameObject|j};
  let treeNode: treeNode = {name: gameObjectName, uid: gameObject, children: [||]};
  let children = engineState |> MainEditorGameObjectOper.getChildren(gameObject);
  switch (children |> Js.Array.length) {
  | 0 => treeNode
  | _ =>
    children
    |> Js.Array.forEach(
         (child) =>
           Js.Array.push(_buildSceneGraphData(child, engineState), treeNode.children) |> ignore
       );
    treeNode
  }
};

let getSceneGraphData = (stateTuple) => {
  let (editorState, engineState) = stateTuple;
  let scene = editorState |> MainEditorSceneEdit.getScene;
  [|_buildSceneGraphData(scene, engineState)|]
};

let _removeDragedTreeNodeFromSceneGrahph = (dragedId, sceneGraphArrayData) => {
  let dragedNode: ref(treeNode) = ref({name: "fake", uid: (-1), children: [||]});
  let rec _iterateSceneGraph = (sceneGraphArray) => {
    let removeDragedSceneGraphData =
      sceneGraphArray
      |> Js.Array.map(
           (treeNode: treeNode) =>
             switch treeNode.uid {
             | uid when uid == dragedId =>
               dragedNode := treeNode;
               let index = Js.Array.indexOf(treeNode, sceneGraphArray);
               sceneGraphArray |> Js.Array.spliceInPlace(~pos=index, ~remove=1, ~add=[||])
             | _ =>
               _iterateSceneGraph(treeNode.children);
               sceneGraphArray
             }
         )
      |> WonderCommonlib.ArraySystem.flatten;
    (removeDragedSceneGraphData, dragedNode)
  };
  _iterateSceneGraph(sceneGraphArrayData)
  |> ensureCheck(
       ((_, dragedNode)) =>
         Contract.Operators.(
           test(
             "the draged node should exist",
             () => {
               let dragedTreeNode: treeNode = dragedNode^;
               dragedTreeNode.uid <>= (-1)
             }
           )
         )
     )
};

let _insertRemovedTreeNodeToTargetTreeNode =
    (targetId, dragedTreeNode: treeNode, sceneGraphArrayData: array(treeNode)) => {
  let rec _iterateSceneGraph = (sceneGraphArray) =>
    sceneGraphArray
    |> Js.Array.map(
         (treeNode: treeNode) =>
           switch treeNode.uid {
           | uid when uid == targetId =>
             Js.Array.push(dragedTreeNode, treeNode.children) |> ignore;
             treeNode
           | _ =>
             _iterateSceneGraph(treeNode.children);
             treeNode
           }
       );
  _iterateSceneGraph(sceneGraphArrayData)
};

let getDragedSceneGraphData = (targetId: int, dragedId: int, sceneGraphArrayData: array(treeNode)) => {
  let (removeDragedSceneGrahphData, dragedNode) =
    _removeDragedTreeNodeFromSceneGrahph(dragedId, sceneGraphArrayData);
  _insertRemovedTreeNodeToTargetTreeNode(targetId, dragedNode^, removeDragedSceneGrahphData)
};
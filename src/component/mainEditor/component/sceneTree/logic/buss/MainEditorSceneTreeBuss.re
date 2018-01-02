open Contract;

open MainEditorSceneTreeType;

let rec _iterateDragedObject = (targetGameObject, dragedGameObject, engineState) => {
  let dragedChildren = engineState |> MainEditorGameObjectOper.getChildren(dragedGameObject);
  switch (dragedChildren |> Js.Array.length) {
  | 0 => false
  | _ =>
    dragedChildren
    |> Js.Array.filter(
         (child) =>
           child == targetGameObject ?
             true : _iterateDragedObject(targetGameObject, child, engineState)
       )
    |> Js.Array.length
    |> (
      (len) =>
        switch len {
        | 0 => false
        | _ => true
        }
    )
  }
};

let isObjectAssociateError = (targetGameObject, dragedGameObject, (editorState, engineState)) =>
  targetGameObject == dragedGameObject ?
    true : _iterateDragedObject(targetGameObject, dragedGameObject, engineState);

let setParent = (parentGameObject, childGameObject, (editorState, engineState)) => {
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

let getSceneGraphData = ((editorState, engineState)) => {
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
               _iterateSceneGraph(treeNode.children) |> ignore;
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
             _iterateSceneGraph(treeNode.children) |> ignore;
             treeNode
           }
       );
  _iterateSceneGraph(sceneGraphArrayData)
};

let getDragedSceneGraphData = (targetId: int, dragedId: int, sceneGraphArrayData: array(treeNode)) => {
  /* todo add contract check scenetree data should == engine */
  let (removeDragedSceneGrahphData, dragedNode) =
    _removeDragedTreeNodeFromSceneGrahph(dragedId, sceneGraphArrayData);
  _insertRemovedTreeNodeToTargetTreeNode(targetId, dragedNode^, removeDragedSceneGrahphData)
};